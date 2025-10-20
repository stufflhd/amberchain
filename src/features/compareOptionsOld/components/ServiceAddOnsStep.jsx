import React from "react";
import { useTranslation } from "react-i18next";
import FormField from "@/components/form/FormField";
import CheckboxField from "./CheckboxField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TRANSPORT_MODES, CURRENCIES } from "@/constants/CompareOptionsFields";
import { numberRegex, generalTextRegex } from "@/constants/CompareOptionsFields";
import { cn } from "@/lib/utils";

/**
 * Service Add-Ons Step
 * Displays available service add-ons based on transport mode
 */
export default function ServiceAddOnsStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();
  
  const selectedMode = data.transportMode ? TRANSPORT_MODES[data.transportMode.toUpperCase()] : null;

  if (!selectedMode) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">{t('compareOptions.messages.selectModeFirst')}</p>
      </div>
    );
  }

  const handleFieldChange = (payload) => {
    onUpdate(payload.name, payload.value);
  };

  const handleSelectChange = (name, value) => {
    onUpdate(name, value);
  };

  const availableAddons = selectedMode.addons || [];

  const renderAddon = (addonKey) => {
    switch (addonKey) {
      case 'insurance':
        return (
          <div key={addonKey} className="space-y-4 p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.insurance')}
              name="insurance"
              value={data.insurance}
              onChange={handleFieldChange}
            />
            {data.insurance === 'Yes' && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label={t('compareOptions.fields.cargoValue')}
                    name="cargoValue"
                    type="number"
                    value={data.cargoValue || ''}
                    onChange={handleFieldChange}
                    error={errors.cargoValue}
                    regex={numberRegex}
                  />

                  <div className="space-y-2">
                    <Label>{t('compareOptions.fields.currency')}</Label>
                    <Select value={data.currency} onValueChange={(val) => handleSelectChange('currency', val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('common.select')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map(curr => (
                          <SelectItem key={curr.value} value={curr.value}>{curr.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'stuffing':
        return (
          <div key={addonKey} className="space-y-4 p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.stuffing')}
              name="stuffing"
              value={data.stuffing}
              onChange={handleFieldChange}
            />
            {data.stuffing === 'Yes' && (
              <div className="ml-6 space-y-4">
                <FormField
                  label={t('compareOptions.fields.equipmentNeeded')}
                  name="stuffingEquipment"
                  type="text"
                  value={data.stuffingEquipment || ''}
                  onChange={handleFieldChange}
                  error={errors.stuffingEquipment}
                  placeholder={t('compareOptions.placeholders.forklift')}
                  regex={generalTextRegex}
                />

                <FormField
                  label={t('compareOptions.fields.resourcesNeeded')}
                  name="stuffingResources"
                  type="number"
                  value={data.stuffingResources || ''}
                  onChange={handleFieldChange}
                  error={errors.stuffingResources}
                  placeholder="2, 3, 4, 5..."
                  regex={numberRegex}
                />
              </div>
            )}
          </div>
        );

      case 'unstuffing':
        return (
          <div key={addonKey} className="space-y-4 p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.unstuffing')}
              name="unstuffing"
              value={data.unstuffing}
              onChange={handleFieldChange}
            />
            {data.unstuffing === 'Yes' && (
              <div className="ml-6 space-y-4">
                <FormField
                  label={t('compareOptions.fields.equipmentNeeded')}
                  name="unstuffingEquipment"
                  type="text"
                  value={data.unstuffingEquipment || ''}
                  onChange={handleFieldChange}
                  error={errors.unstuffingEquipment}
                  placeholder={t('compareOptions.placeholders.forklift')}
                  regex={generalTextRegex}
                />

                <FormField
                  label={t('compareOptions.fields.resourcesNeeded')}
                  name="unstuffingResources"
                  type="number"
                  value={data.unstuffingResources || ''}
                  onChange={handleFieldChange}
                  error={errors.unstuffingResources}
                  placeholder="2, 3, 4, 5..."
                  regex={numberRegex}
                />
              </div>
            )}
          </div>
        );

      case 'inspection':
        return (
          <div key={addonKey} className="space-y-4 p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.inspection')}
              name="inspection"
              value={data.inspection}
              onChange={handleFieldChange}
            />
            {data.inspection === 'Yes' && (
              <div className="ml-6">
                <FormField
                  label={t('compareOptions.fields.inspectionType')}
                  name="inspectionType"
                  type="text"
                  value={data.inspectionType || ''}
                  onChange={handleFieldChange}
                  error={errors.inspectionType}
                  regex={generalTextRegex}
                />
              </div>
            )}
          </div>
        );

      case 'port_agent':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.portAgent')}
              name="portAgent"
              value={data.portAgent}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'ireposition':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.ireposition')}
              name="ireposition"
              value={data.ireposition}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'track_live':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.trackLive')}
              name="trackLive"
              value={data.trackLive}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'troke_trace':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.trokeTrace')}
              name="trokeTrace"
              value={data.trokeTrace}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'socforall':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.socForAll')}
              name="socForAll"
              value={data.socForAll}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'readytoLoad':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.readyToLoad')}
              name="readyToLoad"
              value={data.readyToLoad}
              onChange={handleFieldChange}
            />
          </div>
        );

      case 'customs_brokerage':
        return (
          <div key={addonKey} className="p-4 border rounded-md">
            <CheckboxField
              label={t('compareOptions.services.customsBrokerage')}
              name="customsBrokerage"
              value={data.customsBrokerage}
              onChange={handleFieldChange}
              options={[
                { label: t('compareOptions.options.atDestination') },
                { label: t('compareOptions.options.atOrigin') }
              ]}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {t('compareOptions.steps.serviceAddOns')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('compareOptions.steps.serviceAddOnsDesc')}
        </p>
      </div>

      <div className="space-y-4">
        {availableAddons.length > 0 ? (
          availableAddons.map(addon => renderAddon(addon))
        ) : (
          <p className="text-center text-muted-foreground">
            {t('compareOptions.messages.noAddonsAvailable')}
          </p>
        )}
      </div>
    </div>
  );
}
