import React from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * Transit Preferences Step
 * Final step where user selects their preferences
 */
export default function TransitPreferencesStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();

  const preferences = [
    { key: 'fastestTransit', label: t('compareOptions.preferences.fastest') },
    { key: 'cheapestOption', label: t('compareOptions.preferences.cheapest') },
    { key: 'lowestEmission', label: t('compareOptions.preferences.lowestEmission') },
    { key: 'balancedOption', label: t('compareOptions.preferences.balanced') }
  ];

  const handlePreferenceChange = (key, checked) => {
    onUpdate(key, checked);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {t('compareOptions.steps.transitPreferences')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('compareOptions.steps.transitPreferencesDesc')}
        </p>
      </div>

      <div className="space-y-4">
        <Label>
          {t('compareOptions.sections.selectPreferences')}
        </Label>

        <div className="space-y-4 border rounded-md p-4">
          {preferences.map((pref) => (
            <div key={pref.key} className="flex items-center space-x-3">
              <Checkbox
                id={pref.key}
                checked={data[pref.key] || false}
                onCheckedChange={(checked) => handlePreferenceChange(pref.key, checked)}
              />
              <Label
                htmlFor={pref.key}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {pref.label}
              </Label>
            </div>
          ))}
        </div>

        {errors.preferences && (
          <p className="text-destructive text-xs" role="alert">
            {errors.preferences}
          </p>
        )}
      </div>
    </div>
  );
}
