import React from "react";
import { useTranslation } from "react-i18next";
import {
  Ship,
  Train,
  Truck,
  Plane,
  Package,
  Check,
  Circle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TRANSPORT_MODES } from "@/constants/CompareOptionsFields";

const iconMap = {
  Ship,
  Train,
  Truck,
  Plane,
  Package,
};

/**
 * Transport Mode Selection Step
 * Displays transport modes as selectable cards
 */
export default function TransportModeStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();

  const handleModeSelect = (mode) => {
    onUpdate("transportMode", mode);
  };

  const modes = Object.values(TRANSPORT_MODES);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {t("compareOptions.steps.selectTransportMode")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("compareOptions.steps.selectTransportModeDesc")}
        </p>
      </div>

      <div>
        <Label>
          {t("compareOptions.fields.transportMode")}
          <span className="text-destructive ml-1">*</span>
        </Label>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pb-8 mt-4">
          {modes.map((mode) => {
            const IconComponent = iconMap[mode.icon];
            const isSelected = data.transportMode === mode.id;

            return (
              <Card
                key={mode.id}
                className={cn(
                  "p-6 cursor-pointer transition-all border-2 shadow-none",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-input hover:border-primary/50",
                  errors.transportMode && !isSelected && "border-destructive/50"
                )}
                onClick={() => handleModeSelect(mode.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3 relative">
                  {isSelected && (
                    <Check className="absolute top-0 right-0 w-5 h-5 bg-primary rounded-full !stroke-background p-1 translate-x-4 -translate-y-4 " />
                  )}
                  <div className="p-3 rounded-full bg-muted">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      {t(mode.translationKey)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(mode.description)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {errors.transportMode && (
          <p className="text-destructive text-xs mt-2" role="alert">
            {errors.transportMode}
          </p>
        )}
      </div>
    </div>
  );
}
