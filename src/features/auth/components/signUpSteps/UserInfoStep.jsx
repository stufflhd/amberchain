import React from 'react';
import FormField from "@/components/form/FormField";
import PasswordField from "@/components/form/PasswordField";
import PhoneNumberField from '@/components/form/PhoneNumberFiled';

export default function UserInfoStep({ data, errors, onUpdate }) {
  const handleChange = (payload) => {
    onUpdate(payload.name, payload.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">User Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FormField
        label="Confirm Email"
        name="emailConfirmation"
        type="email"
        value={data.emailConfirmation}
        onChange={handleChange}
        error={errors.emailConfirmation}
        required
      />
      <PasswordField
        label="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <PhoneNumberField
        value={data.phoneNumber}
        onChange={(e) => onUpdate("phoneNumber", e.target.value)}
        required
        error={errors.phoneNumber}
        selectedCountry={data.phoneCountry || "US"}
        onCountryChange={(countryCode) => onUpdate("phoneCountry", countryCode)}
        onValidation={(err) => onUpdate("phoneNumberError", err)}
      />
    </div>
  );
}