import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Custom Checkbox Field Component for Compare Options
 * Supports Yes/No options and custom styling
 */
export default function CheckboxField({
  id,
  name,
  label,
  options = [{ label: 'Yes' }, { label: 'No' }],
  value,
  onChange,
  required = false,
  error,
  className,
  ...props
}) {
  const handleChange = (optionLabel) => {
    if (onChange) {
      onChange({
        target: { name, value: optionLabel },
        value: optionLabel,
        name
      });
    }
  };

  return (
    <div className={cn("space-y-2 text-start", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => {
          const optionId = `${id || name}-${index}`;
          const isChecked = value === option.label;

          return (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={optionId}
                checked={isChecked}
                onCheckedChange={() => handleChange(option.label)}
                className={error && "border-destructive"}
              />
              <Label
                htmlFor={optionId}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-destructive text-xs pt-0.5" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
