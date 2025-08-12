import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import { userInfoStepFields, companyInfoStepFields } from '@/constants/formFields';

/**
 * Main registration page component, orchestrating the multi-step signup form.
 */
export default function RegisterPage() {
  const { t } = useTranslation();
  useCountriesQuery();

  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const backButtonText = t('common.back')
  const nextButtonText = t('common.next')
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
        userInfoStepFields.forEach(field => {
          const error = field.validation(formData[field.name], formData);
          if (error) newErrors[field.name] = error;
        });
        break;
      case 2:
        companyInfoStepFields.forEach(field => {
          const error = field.validation(formData[field.name], formData);
          if (error) newErrors[field.name] = error;
        });
        break;
      case 3:
        if (!businessProfile) newErrors.businessProfile = t('validation.selectBusinessProfile');
        if (businessProfile === "others" && (!customBusinessType.trim() || !generalTextRegex.test(customBusinessType))) {
          newErrors.customBusinessType = t('validation.invalidBusinessType');
        }
        if (!hasAgreedToTerms) newErrors.hasAgreedToTerms = t('validation.mustAgreeToTerms');
        if (!hasAgreedToPrivacy) newErrors.hasAgreedToPrivacy = t('validation.mustAgreeToPrivacy');
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
      toast.error(t('validation.formErrors'));
      return;
    }

    // console.log('Form data before submission:', {
    //   ...formData,
    //   isStep1Valid,
    //   isStep2Valid,
    //   isStep3Valid,
    //   errors
    // });

    try {
      await handleApiRequest(
        () => mutation.mutateAsync(formData),
        {
          loading: t('validation.creatingAccount'),
          success: t('SuccessSignup.title'),
          error: (err) => err?.message || t('loginForm.notifications.error'),
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
          backButtonText={backButtonText}
          nextButtonText={nextButtonText}
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