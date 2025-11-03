import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { handleApiRequest } from "@/lib/handleApiRequest";
import Stepper, { Step } from "@/components/magicui/Stepper";
import SuccessSignup from "../components/SuccessSignup";
import UserInfoStep from "../components/signUpSteps/UserInfoStep";
import CompanyInfoStep from "../components/signUpSteps/CompanyInfoStep";
import BusinessAndTermsStep from "../components/signUpSteps/BusinessAndTermsStep";
import { useCountriesQuery } from "@/queries/useCountriesQuery";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import {
  userInfoStepFields,
  companyInfoStepFields,
  generalTextRegex,
} from "@/constants/formFields";
import { registerUser } from "@/services/auth";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gsm: "",
  companyLocation: "",
  companyName: "",
  address: "",
  zipCode: "",
  businessProfile: "",
  customBusinessType: "",
  hasAgreedToTerms: false,
  hasAgreedToPrivacy: false,
};

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  useCountriesQuery();

  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const backButtonText = t("common.back");
  const nextButtonText = t("common.next");
  const mutation = useMutation({
    mutationFn: registerUser,
  });
  const navigate = useNavigate();

  const handleUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    const {
      businessProfile,
      customBusinessType,
      hasAgreedToTerms,
      hasAgreedToPrivacy,
    } = formData;

    switch (step) {
      case 1:
        userInfoStepFields.forEach((field) => {
          const error = field.validation(formData[field.name], formData);
          if (error) newErrors[field.name] = error;
        });
        break;
      case 2:
        companyInfoStepFields.forEach((field) => {
          const error = field.validation(formData[field.name], formData);
          if (error) newErrors[field.name] = error;
        });
        break;
      case 3:
        if (!businessProfile)
          newErrors.businessProfile = t("validation.selectBusinessProfile");
        if (
          businessProfile === "PROFESSIONAL" &&
          (!customBusinessType.trim() ||
            !generalTextRegex.test(customBusinessType))
        ) {
          newErrors.customBusinessType = t("validation.invalidBusinessType");
        }
        if (!hasAgreedToTerms)
          newErrors.hasAgreedToTerms = t("validation.mustAgreeToTerms");
        if (!hasAgreedToPrivacy)
          newErrors.hasAgreedToPrivacy = t("validation.mustAgreeToPrivacy");
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
    // Prevent duplicate submissions
    if (mutation.isPending) {
      console.warn('Signup already in progress, preventing duplicate submission');
      return;
    }
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);

    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      toast.error(t("validation.formErrors"));
      return;
    }

    // Build payload matching UsersSignupDto from swagger
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      gsm: formData.gsm, // backend expects 'gsm'
      companyLocation: formData.companyLocation,
      companyName: formData.companyName,
      address: formData.address,
      zipCode: formData.zipCode,
      businessProfile: formData.businessProfile,
      customBusinessType: formData.customBusinessType ,
    };

   try {
  await handleApiRequest(() => mutation.mutateAsync(payload), {
    loading: t("validation.creatingAccount"),
    success: t("SuccessSignup.title"),
        error: (err) => {
          if (err?.isServerDupError) {
            // Inform the user this looks like a server-side duplicate records problem
            toast.error(t('validation.serverDuplicate') || 'Server error: duplicate user records detected. Please contact support.');
            return t('validation.serverDuplicate') || 'Server error: duplicate user records detected. Please contact support.';
          }
          if (err?.isEmailTakenError) {
            setErrors(prev => ({ ...prev, email: t("validation.emailTaken") }));
            return t("validation.emailTaken");
          }
          if (err?.isValidationError) {
            try {
              const validationErrors = JSON.parse(err.message);
              setErrors(prev => ({ ...prev, ...validationErrors }));
              return t("validation.formErrors");
            } catch (e) {
              return err.message;
            }
          }
          return err?.message || t("loginForm.notifications.error");
        },
  });

  // ✅ Redirect to login after successful registration
  navigate('/auth/login', { replace: true });

} catch (error) {
  console.error('Registration error:', error);
}

  };

  return (
    <article className="min-h-screen flex items-center justify-center">
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
            <UserInfoStep
              data={formData}
              errors={errors}
              onUpdate={handleUpdate}
            />
          </Step>
          <Step>
            <CompanyInfoStep
              data={formData}
              errors={errors}
              onUpdate={handleUpdate}
            />
          </Step>
          <Step>
            <BusinessAndTermsStep
              data={formData}
              errors={errors}
              onUpdate={handleUpdate}
            />
          </Step>
        </Stepper>
      )}
    </article>
  );
}
