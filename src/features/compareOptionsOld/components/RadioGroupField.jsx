import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function RadioGroupField({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <>
      <div className="space-y-2">
        <Label>{label}</Label>
        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(name, val)}
          className="flex w-fit gap-0"
        >
          {options.map((option, i) => (
            <div key={option.value} className={cn("flex items-center space-x-2 p-4 py-2.5 border w-full  radio-parent", i === 0 ? "rounded-l-full" : "", i === options.length - 1 ? "rounded-r-full" : "")}>
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
                className={'cursor-pointer'}
              />
              <Label
                htmlFor={`${name}-${option.value}`}
                className="font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
    </>
  );
}
