import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { handleApiRequest } from "@/lib/handleApiRequest";
import Stepper, { Step } from "@/components/magicui/Stepper";
import TransportModeStep from "./TransportModeStep";
import RouteDetailsStep from "./RouteDetailsStep";
import ServiceAddOnsStep from "./ServiceAddOnsStep";
import TransitPreferencesStep from "./TransitPreferencesStep";
import {
  useSubmitCompareOptions,
  useShippingOptions,
} from "@/queries/useCompareOptionsQuery";
import { TRANSPORT_MODES } from "@/constants/CompareOptionsFields";

/*
 * Compare Options Multi-Step Form fields
 */
const initialFormData = {
  // Step 1 - Transport Mode
  transportMode: "",

  // Step 2 - Route Details
  departureLocation: "",
  arrivalLocation: "",
  optionalPickup: "",
  plor: "",
  plod: "",
  liftgate: "",
  accessConditions: "",
  containerType: "",
  truckType: "",
  cargoType: "",
  classImo: "",
  unNumber: "",
  coldTreatment: "",
  temperature: "",
  multipleSetPoints: "",
  cargoProbes: "",
  drainHoles: "",
  freshAirExchange: "",
  ventilationVolume: "",
  humidity: "",
  humidityPercentage: "",
  gensetExport: "",
  gensetImport: "",
  oversized_width: "",
  oversized_length: "",
  oversized_height: "",
  oversized_lengthMetric: "",
  packageType: "",
  numberOfPackages: "",
  volume: "",
  numberOfPallets: "",
  ltl_width: "",
  ltl_length: "",
  ltl_height: "",
  ltl_lengthMetric: "",
  commodity: "",
  grossWeight: "",

  // Step 3 - Service Add-Ons
  insurance: "",
  cargoValue: "",
  currency: "",
  stuffing: "",
  stuffingEquipment: "",
  stuffingResources: "",
  unstuffing: "",
  unstuffingEquipment: "",
  unstuffingResources: "",
  inspection: "",
  inspectionType: "",
  portAgent: "",
  ireposition: "",
  trackLive: "",
  trokeTrace: "",
  socForAll: "",
  readyToLoad: "",
  customsBrokerage: "",

  // Step 4 - Transit Preferences
  fastestTransit: false,
  cheapestOption: false,
  lowestEmission: false,
  balancedOption: false,
};

/**
 * Compare Options Multi-Step Form
 * Handles form state, validation, and submission
 */
export default function CompareOptionsForm({ onComplete }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const submitMutation = useSubmitCompareOptions();
  const { refetch: fetchShippingOptions } = useShippingOptions();

  const handleUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Transport Mode
        if (!formData.transportMode) {
          newErrors.transportMode = t("validation.required");
        }
        break;

      case 2: {
        // Route Details
        if (!formData.departureLocation) {
          newErrors.departureLocation = t("validation.required");
        }
        if (!formData.arrivalLocation) {
          newErrors.arrivalLocation = t("validation.required");
        }

        const selectedMode = formData.transportMode
          ? TRANSPORT_MODES[formData.transportMode.toUpperCase()]
          : null;

        if (
          selectedMode?.containerTypes &&
          selectedMode.containerTypes.length > 0
        ) {
          if (!formData.containerType) {
            newErrors.containerType = t("validation.required");
          }
          if (!formData.cargoType) {
            newErrors.cargoType = t("validation.required");
          }

          // Validate based on container type
          if (formData.containerType === "ftl" && !formData.truckType) {
            newErrors.truckType = t("validation.required");
          }

          // Validate based on cargo type
          if (formData.cargoType === "hazardous") {
            if (!formData.classImo)
              newErrors.classImo = t("validation.required");
            if (!formData.unNumber)
              newErrors.unNumber = t("validation.required");
          }

          if (formData.cargoType === "perishable" && !formData.temperature) {
            newErrors.temperature = t("validation.required");
          }

          if (formData.cargoType === "oversized") {
            if (!formData.oversized_width)
              newErrors.oversized_width = t("validation.required");
            if (!formData.oversized_length)
              newErrors.oversized_length = t("validation.required");
            if (!formData.oversized_height)
              newErrors.oversized_height = t("validation.required");
            if (!formData.oversized_lengthMetric)
              newErrors.oversized_lengthMetric = t("validation.required");
          }

          // Package details for LCL/LTL
          if (
            formData.containerType === "lcl" ||
            formData.containerType === "ltl"
          ) {
            if (!formData.packageType)
              newErrors.packageType = t("validation.required");
            if (!formData.numberOfPackages)
              newErrors.numberOfPackages = t("validation.required");
            if (!formData.volume) newErrors.volume = t("validation.required");
          }

          // LTL dimensions
          if (formData.containerType === "ltl") {
            if (!formData.ltl_width)
              newErrors.ltl_width = t("validation.required");
            if (!formData.ltl_length)
              newErrors.ltl_length = t("validation.required");
            if (!formData.ltl_height)
              newErrors.ltl_height = t("validation.required");
            if (!formData.ltl_lengthMetric)
              newErrors.ltl_lengthMetric = t("validation.required");
          }

          // FTL pallets
          if (formData.containerType === "ftl" && !formData.numberOfPallets) {
            newErrors.numberOfPallets = t("validation.required");
          }
        }

        if (!formData.commodity) {
          newErrors.commodity = t("validation.required");
        }
        if (!formData.grossWeight) {
          newErrors.grossWeight = t("validation.required");
        }

        // Extra fields validation
        if (
          selectedMode?.extraFields?.includes("liftgate") &&
          !formData.liftgate
        ) {
          newErrors.liftgate = t("validation.required");
        }
        if (
          selectedMode?.extraFields?.includes("access") &&
          !formData.accessConditions
        ) {
          newErrors.accessConditions = t("validation.required");
        }
        break;
      }

      case 3: // Service Add-Ons (optional, no required fields)
        break;

      case 4: // Transit Preferences (optional)
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBeforeStepChange = async (currentStep) => {
    return validateStep(currentStep);
  };

  const handleFormSubmit = async () => {
    // Validate all steps
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);

    if (!isStep1Valid || !isStep2Valid) {
      toast.error(t("validation.formErrors"));
      return;
    }

    try {
      await handleApiRequest(() => submitMutation.mutateAsync(formData), {
        loading: t("compareOptions.messages.submitting"),
        success: t("compareOptions.success"),
        error: (err) => err?.message || t("common.generic-error"),
      });
    } catch (err) {
      console.log("Submission error (expected):", err);
    } finally {
      // Fetch and show results regardless of submission status
      try {
        const { data: shippingOptions } = await fetchShippingOptions();
        if (onComplete) {
          onComplete(shippingOptions);
        }
      } catch (fetchErr) {
        console.error("Error fetching shipping options:", fetchErr);
        toast.error(t("compareOptions.messages.fetchError"));
      }
    }
  };

  return (
    <Stepper
      initialStep={1}
      onFinalStepCompleted={handleFormSubmit}
      onBeforeStepChange={handleBeforeStepChange}
      isFinalStepLoading={submitMutation.isPending}
      backButtonText={t("common.back")}
      nextButtonText={t("common.next")}
      className="[&_.card]:max-w-full [&_.card]:p-0 [&_.card]:border-0 [&_.steps-indicator]:max-w-4xl [&_.steps-indicator]:mx-auto [&_.card]:shadow-none"
    >
      <Step>
        <TransportModeStep
          data={formData}
          errors={errors}
          onUpdate={handleUpdate}
        />
      </Step>

      <Step>
        <RouteDetailsStep
          data={formData}
          errors={errors}
          onUpdate={handleUpdate}
        />
      </Step>

      <Step>
        <ServiceAddOnsStep
          data={formData}
          errors={errors}
          onUpdate={handleUpdate}
        />
      </Step>

      <Step>
        <TransitPreferencesStep
          data={formData}
          errors={errors}
          onUpdate={handleUpdate}
        />
      </Step>
    </Stepper>
  );
}
