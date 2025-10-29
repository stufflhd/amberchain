import React from 'react';
import { useTranslation } from 'react-i18next';
import FormField from "@/components/form/FormField";
import PasswordField from "@/components/form/PasswordField";
import PhoneNumberField from '@/components/form/PhoneNumberFiled';
import { userInfoStepFields } from '@/constants/formFields';

export default function UserInfoStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();
  
  const handleChange = (payload) => {
    onUpdate(payload.name, payload.value);
  };

  const renderField = (field) => {
    const props = {
      label: field.label(),
      name: field.name,
      type: field.type,
      value: data[field.name],
      onChange: handleChange,
      error: errors[field.name],
      required: field.required
    };

    if (field.name === 'password') {
      return <PasswordField key={field.name} {...props} />;
    }

    if (field.name === 'gsm') {
      return (
        <PhoneNumberField
          key={field.name}
          value={data.gsm}
          onChange={(e) => onUpdate("gsm", e.target.value)}
          required
          error={errors.gsm}
          selectedCountry={data.phoneCountry || "US"}
          onCountryChange={(countryCode) => onUpdate("phoneCountry", countryCode)}
          onValidation={(err) => onUpdate("gsmError", err)}
        />
      );
    }

    return <FormField key={field.name} {...props} />;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">{t('registerForm.userInfoTitle')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {renderField(userInfoStepFields[0])} {/* firstName */}
        {renderField(userInfoStepFields[1])} {/* lastName */}
      </div>
      {userInfoStepFields.slice(2).map(renderField)} {/* remaining fields */}
    </div>
  );
}