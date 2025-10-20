import React, { useState, useEffect, useRef, useId } from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon, LoaderCircleIcon, MapPinIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

/**
 * City Search Field Component
 * Uses GeoDB Cities API (free, no API key required)
 * User must type at least 2 characters to search
 */
export default function CitySearchField({
  id,
  name = "city",
  value = "",
  onChange,
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  className,
  ...props
}) {
  const { t } = useTranslation();
  const fallbackId = useId();
  const fieldId = id || fallbackId;

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(value);

  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setSelectedCity(value);
  }, [value]);

  // Search cities when user types (debounced)
  useEffect(() => {
    if (searchQuery.length < 2) {
      setCities([]);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Using GeoDB Cities API - free, no API key required
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
            searchQuery
          )}&limit=10&sort=-population`,
          {
            headers: {
              "X-RapidAPI-Key": "demo", // Using demo key - replace with actual if needed
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        ).catch(() => null);

        if (!response || !response.ok) {
          // Fallback to Nominatim (OpenStreetMap) - completely free
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
              searchQuery
            )}&format=json&limit=10&addressdetails=1`,
            {
              headers: {
                "User-Agent": "AmberChain-App",
              },
            }
          );

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            const formattedCities = data
              .filter(
                (item) =>
                  item.address &&
                  (item.address.city ||
                    item.address.town ||
                    item.address.village)
              )
              .map((item) => ({
                id: item.place_id,
                name:
                  item.address.city ||
                  item.address.town ||
                  item.address.village,
                country: item.address.country,
                display: `${
                  item.address.city || item.address.town || item.address.village
                }, ${item.address.country}`,
              }))
              .filter(
                (city, index, self) =>
                  index === self.findIndex((c) => c.display === city.display)
              );
            setCities(formattedCities);
          }
        } else {
          const data = await response.json();
          if (data.data) {
            const formattedCities = data.data.map((city) => ({
              id: city.id,
              name: city.name,
              country: city.country,
              display: `${city.name}, ${city.country}`,
            }));
            setCities(formattedCities);
          }
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const handleCitySelect = (cityDisplay) => {
    setSelectedCity(cityDisplay);
    if (onChange) {
      onChange({
        target: { name, value: cityDisplay },
        value: cityDisplay,
        name,
      });
    }
    setOpen(false);
    setSearchQuery("");
  };

  const displayValue =
    selectedCity ||
    placeholder ||
    t("compareOptions.placeholders.selectLocation");

  return (
    <div className={cn("space-y-2 text-start", className)} {...props}>
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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={fieldId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal text-left h-9",
              !selectedCity && "text-muted-foreground",
              error && "border-destructive"
            )}
            disabled={disabled}
          >
            <span className="flex items-center gap-2 truncate">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">{displayValue}</span>
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent 
          className="p-0" 
          align="start"
          style={{
            width: "var(--radix-popover-trigger-width)",
            maxWidth: "100%"
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={t("compareOptions.placeholders.searchCity")}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />

            <CommandList>
              {searchQuery.length < 2 ? (
                <CommandEmpty>
                  {t("compareOptions.messages.typeToSearch")}
                </CommandEmpty>
              ) : isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <LoaderCircleIcon className="animate-spin h-4 w-4 mr-2" />
                  <span className="text-sm">{t("common.loading")}</span>
                </div>
              ) : cities.length === 0 ? (
                <CommandEmpty>
                  {t("compareOptions.messages.noCitiesFound")}
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.display}
                      onSelect={() => handleCitySelect(city.display)}
                      className="flex items-center gap-2"
                    >
                      <MapPinIcon className="h-4 w-4" />
                      <span className="flex-1">{city.display}</span>
                      {selectedCity === city.display && (
                        <CheckIcon className="h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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
