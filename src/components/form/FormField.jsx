import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function FormField({
  value,
  onChange,
  error,
  isValueValid,
  regex,
  id,
  name,
  type = "text",
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
  endContent = null,
  ...props
}) {
  const { t } = useTranslation();
  const fallbackId = useId();
  const fieldId = id || fallbackId;

  const handleChange = (e) => {
    const newValue = e.target.value;
    let validationError = null;
    let isValid = true;

    if (!newValue && required) {
      validationError = t("validation.required");
      isValid = false;
    } else if (newValue && regex && !regex.test(newValue)) {
      validationError = t("validation.invalid");
      isValid = false;
    }

    onChange({
      value: newValue,
      error: validationError,
      isValueValid: isValid,
      name: name,
    });
  };

  return (
    <div className={cn("space-y-2 text-start", className)}>
      {label && (
        <Label htmlFor={fieldId}>
          {label}
          <span
            className={`text-destructive ml-1 leading-3 ${
              required ? "" : "opacity-0"
            }`}
          >
            *
          </span>
        </Label>
      )}

      <div className="relative">
        <Input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(
            "peer",
            endContent && "pr-10",
            error && "border-destructive",
            isValueValid && "border-primary/20"
          )}
          aria-invalid={!!error}
          {...props}
        />
        {endContent && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            {endContent}
          </div>
        )}
      </div>

      {error && (
        <p
          className="text-destructive text-xs pt-0.5"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
