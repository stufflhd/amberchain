import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormField from "@/components/form/FormField";
import AgreementDialog from '../AgreementDialog';

import {
  Building2Icon,
  TruckIcon,
  StoreIcon,
  UsersIcon,
  BriefcaseIcon,
  MoreHorizontalIcon,
  UserIcon,
} from "lucide-react";

// Values chosen to align with backend UsersSignupDto enum values.
// Adjust mapping if different enum semantics are required.
// Use exact enum values from UsersSignupDto while keeping existing labels.
const businessProfiles = [
  { value: "PUBLIC_ORGANISATION", label: t => t(`businessProfiles.PUBLIC_ORGANISATION`), icon: Building2Icon },
  { value: "ADMIN", label: t => t(`businessProfiles.ADMIN`), icon:  UsersIcon },
  { value: "BANK", label: t => t(`businessProfiles.BANK`), icon: BriefcaseIcon },
  { value: "FREIGHT_FORWARDER", label: t => t(`businessProfiles.FREIGHT_FORWARDER`), icon: TruckIcon },
  { value: "INDIVIDUAL", label: t => t(`businessProfiles.INDIVIDUAL`), icon: UserIcon },
  { value: "PROFESSIONAL", label: t => t(`businessProfiles.PROFESSIONAL`), icon: BriefcaseIcon },
  { value: "OTHER", label: t => t(`businessProfiles.OTHER`), icon: MoreHorizontalIcon },
];


export default function BusinessAndTermsStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();

  const handleFieldChange = (payload) => {
    onUpdate(payload.name, payload.value);
  };

  const handleBusinessProfileChange = (value) => {
    onUpdate("businessProfile", value);
    // keep customBusinessType only when PROFESSIONAL is selected
    if (value !== "PROFESSIONAL") {
      onUpdate("customBusinessType", "");
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-semibold text-center mb-6">{t('registerForm.step3Title')}</h2>

      <div className="space-y-2 text-start">
        <Label htmlFor="businessProfile">
          {t('registerForm.businessProfile')}
          <span className="text-destructive ml-1">*</span>
        </Label>
        <RadioGroup
          value={data.businessProfile}
          onValueChange={handleBusinessProfileChange}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {businessProfiles.map((item) => (
            <Label
              key={item.value}
              htmlFor={`businessProfile-${item.value}`}
              className="border-input has-[:checked]:border-primary flex flex-col items-start gap-4 rounded-md border p-4 cursor-pointer"
            >
              <div className="flex justify-between w-full">
                <RadioGroupItem
                  value={item.value}
                  id={`businessProfile-${item.value}`}
                  className="border-muted-foreground"
                />
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-normal text-sm">{item.label(t)}</span>
            </Label>
          ))}
        </RadioGroup>
        {errors.businessProfile && (
          <p className="text-destructive mt-2 text-xs" role="alert">
            {errors.businessProfile}
          </p>
        )}
      </div>

      {data.businessProfile === "OTHER" && (
        <FormField
          label={t('registerForm.customBusinessType')}
          name="customBusinessType"
          placeholder={t('businessProfiles.logisticsPartnerExample')}
          value={data.customBusinessType}
          onChange={handleFieldChange}
          error={errors.customBusinessType}
          required
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className={`border rounded-md p-4 flex items-start gap-3 ${errors.hasAgreedToTerms ? 'border-destructive' : 'border-input'}`}>
          <Checkbox
            id='terms'
            checked={data.hasAgreedToTerms}
            onCheckedChange={(checked) => onUpdate('hasAgreedToTerms', !!checked)}
            className="mt-0.5"
          />
          <div className="grid gap-1.5">
            <Label htmlFor='terms'>{t('registerForm.termsOfService')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('registerForm.reviewAndAccept')}{" "}
              <AgreementDialog
                title={t('terms.title')}
                sections={t('terms.sections', { returnObjects: true })}
                onAgree={() => onUpdate('hasAgreedToTerms', true)}
                onOpen={() => {
                  if (data.hasAgreedToTerms) {
                    onUpdate('hasAgreedToTerms', false);
                  }
                }}
              />.
            </p>
            {errors.hasAgreedToTerms && <p className="text-destructive text-xs" role="alert">{errors.hasAgreedToTerms}</p>}
          </div>
        </div>

        <div className={`border rounded-md p-4 flex items-start gap-3 ${errors.hasAgreedToPrivacy ? 'border-destructive' : 'border-input'}`}>
          <Checkbox
            id='privacy'
            checked={data.hasAgreedToPrivacy}
            onCheckedChange={(checked) => onUpdate('hasAgreedToPrivacy', !!checked)}
            className="mt-0.5"
          />
          <div className="grid gap-1.5">
            <Label htmlFor='privacy'>{t('registerForm.privacyPolicy')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('registerForm.reviewAndAccept')}{" "}
              <AgreementDialog
                title={t('privacy.title')}
                sections={t('privacy.sections', { returnObjects: true })}
                onAgree={() => onUpdate('hasAgreedToPrivacy', true)}
                onOpen={() => {
                  if (data.hasAgreedToPrivacy) {
                    onUpdate('hasAgreedToPrivacy', false);
                  }
                }}
              />.
            </p>
            {errors.hasAgreedToPrivacy && <p className="text-destructive text-xs" role="alert">{errors.hasAgreedToPrivacy}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}