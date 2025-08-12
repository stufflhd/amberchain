import React from 'react';
import { useTranslation } from 'react-i18next';
import FormField from "@/components/form/FormField";
import { companyInfoStepFields } from '@/constants/formFields';

export default function CompanyInfoStep({ data, errors, onUpdate }) {
    const { t } = useTranslation();

    const handleChange = (payload) => {
        onUpdate(payload.name, payload.value);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-6">{t('registerForm.step2Title')}</h2>
            {companyInfoStepFields.map(field => (
                <FormField
                    key={field.name}
                    label={field.label()}
                    name={field.name}
                    type={field.type}
                    value={data[field.name]}
                    onChange={handleChange}
                    error={errors[field.name]}
                    required={field.required}
                />
            ))}
        </div>
    );
}