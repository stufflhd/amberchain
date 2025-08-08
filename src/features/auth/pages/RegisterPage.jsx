import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { handleApiRequest } from '@/lib/handleApiRequest';
import Stepper, { Step } from '@/components/magicui/Stepper';
import SuccessSignup from '../components/SuccessSignup';
import UserInfoStep from '../components/signUpSteps/UserInfoStep';
import CompanyInfoStep from '../components/signUpSteps/CompanyInfoStep';
import BusinessAndTermsStep from '../components/signUpSteps/BusinessAndTermsStep';
import { useCountriesQuery } from "@/queries/useCountriesQuery";
import { toast } from 'sonner';

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  emailConfirmation: "",
  password: "",
  phoneNumber: "",
  companyLocation: "",
  companyName: "",
  address: "",
  zipCode: "",
  businessProfile: "",
  customBusinessType: "",
  hasAgreedToTerms: false,
  hasAgreedToPrivacy: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
const nameRegex = /^(?=.*[A-Za-z])[\sA-Za-z'.-]{2,}$/;
const generalTextRegex = /^(?=.*[A-Za-z0-9])[\sA-Za-z0-9&@#',.\/()-]{2,}$/;
const zipCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

/**
 * Main registration page component, orchestrating the multi-step signup form.
 */
export default function RegisterPage() {
  useCountriesQuery();

  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    },
  });

  const handleUpdate = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    const {
      firstName, lastName, email, emailConfirmation, password, phoneNumber,
      companyLocation, companyName, address, zipCode,
      businessProfile, customBusinessType, hasAgreedToTerms, hasAgreedToPrivacy
    } = formData;

    switch (step) {
      case 1:
        if (!firstName.trim() || !nameRegex.test(firstName)) newErrors.firstName = "Please enter a valid first name.";
        if (!lastName.trim() || !nameRegex.test(lastName)) newErrors.lastName = "Please enter a valid last name.";
        if (!email.trim() || !emailRegex.test(email)) newErrors.email = "Please enter a valid email.";
        if (email !== emailConfirmation) newErrors.emailConfirmation = "Emails do not match.";
        if (!password.trim() || !passwordRegex.test(password)) newErrors.password = "Password must be 8+ chars with uppercase, lowercase, and a number.";
        if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) newErrors.phoneNumber = "Please enter a valid phone number.";
        break;
      case 2:
        if (!companyLocation.trim()) newErrors.companyLocation = "Please enter a valid location.";
        if (!companyName.trim() || !generalTextRegex.test(companyName)) newErrors.companyName = "Please enter a valid company name.";
        if (!address.trim() || !generalTextRegex.test(address)) newErrors.address = "Please enter a valid address.";
        if (!zipCode.trim() || !zipCodeRegex.test(zipCode)) newErrors.zipCode = "Please enter a valid zip code.";
        break;
      case 3:
        if (!businessProfile) newErrors.businessProfile = "Please select a business profile.";
        if (businessProfile === "others" && (!customBusinessType.trim() || !generalTextRegex.test(customBusinessType))) {
          newErrors.customBusinessType = "Please specify a valid business type.";
        }
        if (!hasAgreedToTerms) newErrors.hasAgreedToTerms = "You must agree to the terms.";
        if (!hasAgreedToPrivacy) newErrors.hasAgreedToPrivacy = "You must agree to the privacy policy.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBeforeStepChange = async (currentStep) => {
    return validateStep(currentStep);
  };

  const finishSignUp = async () => {
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);

    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      toast.error("Please correct the errors on all steps before completing.");
      return;
    }

    try {
      await handleApiRequest(
        () => mutation.mutateAsync(formData),
        {
          loading: 'Creating your account...',
          success: 'Account created successfully!',
          error: (err) => err?.message || 'Registration failed. Please try again.',
        }
      );
      setIsSignUpComplete(true);
    } catch (err) {
    }
  };

  return (
    <article className='min-h-screen flex items-center justify-center'>
      {isSignUpComplete ? (
        <SuccessSignup />
      ) : (
        <Stepper
          initialStep={1}
          onFinalStepCompleted={finishSignUp}
          onBeforeStepChange={handleBeforeStepChange}
          isFinalStepLoading={mutation.isPending}
        >
          <Step>
            <UserInfoStep data={formData} errors={errors} onUpdate={handleUpdate} />
          </Step>
          <Step>
            <CompanyInfoStep data={formData} errors={errors} onUpdate={handleUpdate} />
          </Step>
          <Step>
            <BusinessAndTermsStep data={formData} errors={errors} onUpdate={handleUpdate} />
          </Step>
        </Stepper>
      )}
    </article>
  );
}