import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
  required,
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <Label className={"leading-3"}>
        {label}
        <span className={`text-destructive ml-1 leading-3 ${required ? "" : "opacity-0"}`}>
          *
        </span>
      </Label>
      <Select value={value} onValueChange={(val) => onChange(name, val)}>
        <SelectTrigger className={cn("w-full h-9 max-h-9", error && "border-destructive")}>
          <SelectValue placeholder={placeholder || t("common.select")} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
