import React, { useId, useState, useEffect, useMemo, useRef, useLayoutEffect, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon, ChevronDownIcon, LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountriesQuery } from "@/queries/useCountriesQuery";

export default function PhoneNumberField({
  id,
  name = "gsm",
  value = "",
  onChange,
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  className,
  onValidation,
  selectedCountry = "US",
  onCountryChange,
  minSelectDelay = 700,
  ...props
}) {
  const { t } = useTranslation();
  const fallbackId = useId();
  const fieldId = id || fallbackId;

  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [localCountry, setLocalCountry] = useState(selectedCountry);

  useEffect(() => setLocalCountry(selectedCountry), [selectedCountry]);

  const { data: countries = [], isLoading, isError } = useCountriesQuery();

  const hiddenListRef = useRef(null);
  const visibleListRef = useRef(null);
  const [listSize, setListSize] = useState({ width: null, height: null });

  useEffect(() => {
    if (open) {
      setShowList(false);
      const id = setTimeout(() => setShowList(true), 50);
      return () => clearTimeout(id);
    } else {
      setShowList(false);
    }
  }, [open]);

  useLayoutEffect(() => {
    const measure = () => {
      const el = hiddenListRef.current || visibleListRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setListSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };

    const raf = requestAnimationFrame(() => {
      measure();
    });
    return () => cancelAnimationFrame(raf);
  }, [countries, showList]);

  const [isPending, startTransition] = useTransition();

  const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
  const validatePhoneNumber = (phoneValue) => {
    const trimmed = String(phoneValue || "").trim();
    if (!trimmed) return required ? t("validation.required") : null;
    if (!phoneRegex.test(trimmed)) return t("validation.invalidPhone");
    return null;
  };

  const handlePhoneChange = (e) => {
    const validationError = validatePhoneNumber(e.target.value);
    if (onValidation) onValidation(validationError);
    if (onChange) onChange(e);
  };

  const handlePhoneBlur = (e) => {
    const validationError = validatePhoneNumber(e.target.value);
    if (onValidation) onValidation(validationError);
  };

  const countryItems = useMemo(() => {
    if (!countries || countries.length === 0) return null;
    return countries.map((country) => (
      <CommandItem
        key={country.code}
        value={`${country.name} ${country.dialCode}`}
        onSelect={() => handleCountrySelect(country.code)}
        className="flex items-center gap-2"
      >
        <img
          src={country.flag}
          alt={country.name}
          className="w-4 h-3 object-cover rounded-sm"
          loading="lazy"
          width={16}
          height={12}
        />
        <span className="flex-1">{country.name}</span>
        <span className="text-muted-foreground text-sm">{country.dialCode}</span>
        {localCountry === country.code && <CheckIcon size={16} className="ml-auto" />}
      </CommandItem>
    ));
  }, [countries, localCountry]);

  const selectedCountryData = useMemo(() => {
    if (!countries || countries.length === 0) return null;
    return countries.find((c) => c.code === localCountry) || countries[0];
  }, [countries, localCountry]);

  async function handleCountrySelect(countryCode) {
    setLocalCountry(countryCode);
    setSelecting(true);
    const start = Date.now();

    let parentPromise;
    startTransition(() => {
      if (onCountryChange) parentPromise = onCountryChange(countryCode);
    });

    try {
      if (parentPromise && typeof parentPromise.then === "function") {
        await parentPromise;
      } else {
        await new Promise((res) => setTimeout(res, 0));
      }
    } catch (err) {
      console.error("onCountryChange failed:", err);
    } finally {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minSelectDelay - elapsed);
      if (remaining > 0) {
        await new Promise((res) => setTimeout(res, remaining));
      }
      setSelecting(false);
      setOpen(false);
    }
  }

  const fallbackMinHeight = 280;
  const loaderWrapperStyle = {
    width: listSize.width ? `${listSize.width}px` : "100%",
    height: listSize.height ? `${listSize.height}px` : `${fallbackMinHeight}px`,
    minWidth: listSize.width ? `${listSize.width}px` : undefined,
    minHeight: listSize.height ? `${listSize.height}px` : undefined,
  };

  return (
    <div className={cn("*:not-first:mt-2 text-start", className)}>
      {label && (
        <Label htmlFor={fieldId}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="flex rounded-md shadow-xs relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-busy={isLoading || isPending || selecting}
              className="text-muted-foreground hover:text-foreground w-fit rounded-e-none shadow-none bg-background hover:bg-background border-input justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
              disabled={disabled}
            >
              <span className="flex items-center gap-2">
                {isLoading ? (
                  <LoaderCircleIcon className="animate-spin" size={16} />
                ) : selectedCountryData ? (
                  <>
                    <img
                      src={selectedCountryData.flag}
                      alt={selectedCountryData.name}
                      className="w-4 h-3 object-cover rounded-sm"
                      loading="lazy"
                      width={16}
                      height={12}
                    />
                    <span className="text-xs">{selectedCountryData.dialCode}</span>
                  </>
                ) : (
                  "🇺🇸 +1"
                )}
              </span>
              <ChevronDownIcon
                size={16}
                className="text-muted-foreground/80 shrink-0"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 relative"
            align="start"
          >
            <Command>
              <CommandInput placeholder={t("phoneField.searchCountry")} />

              {countries.length > 0 && !listSize.width && (
                <div style={{ position: "absolute", left: -9999, top: 0, visibility: "hidden", pointerEvents: "none" }}>
                  <CommandList ref={hiddenListRef}>
                    <CommandEmpty>{t("phoneField.noCountryFound")}</CommandEmpty>
                    <CommandGroup>{countryItems}</CommandGroup>
                  </CommandList>
                </div>
              )}

              <div style={loaderWrapperStyle} className="overflow-hidden">
                {(!showList || isLoading) ? (
                  <div className="flex items-center justify-center p-4 w-full h-full">
                    <LoaderCircleIcon className="animate-spin" size={20} />
                    <span className="ml-2 text-sm">{t("phoneField.loading")}</span>
                  </div>
                ) : isError ? (
                  <CommandList ref={visibleListRef}>
                    <CommandEmpty>{t("phoneField.errorLoading")}</CommandEmpty>
                  </CommandList>
                ) : (
                  <CommandList ref={visibleListRef}>
                    <CommandEmpty>{t("phoneField.noCountryFound")}</CommandEmpty>
                    <CommandGroup>{countryItems}</CommandGroup>
                  </CommandList>
                )}
              </div>
            </Command>

            {selecting && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-background/60"
                aria-live="polite"
                aria-busy="true"
              >
                <div className="flex items-center gap-2 rounded p-2">
                  <LoaderCircleIcon className="animate-spin" size={20} />
                  <span className="text-sm">{t("phoneField.updating") || "Updating..."}</span>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <Input
          id={fieldId}
          name={name}
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder={placeholder || t("phoneField.placeholder")}
          required={required}
          disabled={disabled}
          className={cn("-me-px rounded-s-none shadow-none focus-visible:z-10 peer", error && "border-destructive")}
          aria-invalid={!!error}
          {...props}
        />
      </div>

      {error && (
        <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
