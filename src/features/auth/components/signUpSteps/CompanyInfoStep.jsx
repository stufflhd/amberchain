import React from 'react';
import FormField from "@/components/form/FormField";

export default function CompanyInfoStep({ data, errors, onUpdate }) {
    const handleChange = (payload) => {
        onUpdate(payload.name, payload.value);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-6">Company Information</h2>
            <FormField
                label="Company Location"
                name="companyLocation"
                value={data.companyLocation}
                onChange={handleChange}
                error={errors.companyLocation}
                required
            />
            <FormField
                label="Company Name"
                name="companyName"
                value={data.companyName}
                onChange={handleChange}
                error={errors.companyName}
                required
            />
            <FormField
                label="Address"
                name="address"
                value={data.address}
                onChange={handleChange}
                error={errors.address}
                required
            />
            <FormField
                label="Zip Code"
                name="zipCode"
                value={data.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
                required
            />
        </div>
    );
}