import React from "react";
import { useTranslation } from "react-i18next";
import FormField from "@/components/form/FormField";
import CitySearchField from "./CitySearchField";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import RadioGroupField from "./RadioGroupField";
import {
  TRANSPORT_MODES,
  DUMMY_COMMODITIES,
  DUMMY_TRUCK_TYPES,
  DUMMY_PACKAGE_TYPES,
  LENGTH_METRICS,
  CARGO_TYPES,
  CARGO_PROBES_OPTIONS,
} from "@/constants/CompareOptionsFields";
import {
  numberRegex,
  textRegex,
  generalTextRegex,
} from "@/constants/CompareOptionsFields";

/**
 * Route Details Step
 * Dynamically renders fields based on selected transport mode
 */
export default function RouteDetailsStep({ data, errors, onUpdate }) {
  const { t } = useTranslation();

  const selectedMode = data.transportMode
    ? TRANSPORT_MODES[data.transportMode.toUpperCase()]
    : null;

  if (!selectedMode) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">
          {t("compareOptions.messages.selectModeFirst")}
        </p>
      </div>
    );
  }

  const handleFieldChange = (payload) => {
    onUpdate(payload.name, payload.value);
  };

  const handleSelectChange = (name, value) => {
    onUpdate(name, value);
  };

  const renderContainerTypeFields = () => {
    if (
      !selectedMode.containerTypes ||
      selectedMode.containerTypes.length === 0
    )
      return null;

    const containerType = data.containerType;

    const containerTypeOptions = selectedMode.containerTypes.map((type) => {
      const labelMap = {
        fcl: t("compareOptions.containerTypes.fcl"),
        lcl: t("compareOptions.containerTypes.lcl"),
        ftl: "FTL",
        ltl: "LTL",
      };
      return { value: type, label: labelMap[type] || type };
    });

    return (
      <>
        <SelectField
          label={t("compareOptions.fields.containerType")}
          name="containerType"
          value={containerType}
          onChange={handleSelectChange}
          error={errors.containerType}
          options={containerTypeOptions}
          placeholder={t("compareOptions.placeholders.selectContainerType")}
          required
        />

        {/* Truck Type for FTL */}
        {containerType === "ftl" && (
          <SelectField
            label={t("compareOptions.fields.truckType")}
            name="truckType"
            value={data.truckType}
            onChange={handleSelectChange}
            error={errors.truckType}
            options={DUMMY_TRUCK_TYPES}
            placeholder={t("compareOptions.placeholders.selectTruckType")}
            required
          />
        )}

        {/* Cargo Type */}
        <div
          className={
            data.cargoType === "hazardous"
              ? "flex flex-wrap sm:flex-nowrap md:col-span-2 lg:col-span-3 2xl:col-span-2 xl:gap-8 gap-4 space-y-4 xl:space-y-0 [&>div]:w-full"
              : data.cargoType === "perishable"
              ? "grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-8 gap-4 space-y-4 xl:space-y-0 md:col-span-2 lg:col-span-3 2xl:col-span-4 md:[&_.perishable]:col-span-2 lg:[&_.perishable]:col-span-2 2xl:[&_.perishable]:col-span-3"
              : data.cargoType === "oversized"
              ? "flex md:col-span-2 lg:col-span-3 2xl:col-span-4  xl:gap-8 gap-4 space-y-4 xl:space-y-0 [&>div]:w-full"
              : "space-y-4"
          }
        >
          <SelectField
            label={t("compareOptions.fields.cargoType")}
            name="cargoType"
            value={data.cargoType}
            onChange={handleSelectChange}
            error={errors.cargoType}
            options={Object.entries(CARGO_TYPES).map(([key, type]) => ({
              value: key.toLowerCase(),
              label: t(type.label),
            }))}
            placeholder={t("compareOptions.placeholders.selectCargoType")}
            required
          />
          {/* Conditional Cargo Type Fields */}
          {renderCargoTypeFields()}
        </div>

        {/* Package Details for LCL/LTL */}
        {(containerType === "lcl" || containerType === "ltl") &&
          renderPackageDetails()}

        {/* FTL Pallets */}
        {containerType === "ftl" && (
          <FormField
            label={t("compareOptions.fields.numberOfPallets")}
            name="numberOfPallets"
            type="number"
            value={data.numberOfPallets || ""}
            onChange={handleFieldChange}
            error={errors.numberOfPallets}
            required
            regex={numberRegex}
          />
        )}

        {/* LTL Dimensions */}
        {containerType === "ltl" && renderDimensions("ltl_")}
      </>
    );
  };

  const renderCargoTypeFields = () => {
    const cargoType = data.cargoType;

    if (cargoType === "hazardous") {
      return (
        <>
          <FormField
            label={t("compareOptions.fields.classImo")}
            name="classImo"
            type="text"
            value={data.classImo || ""}
            onChange={handleFieldChange}
            error={errors.classImo}
            required
            regex={textRegex}
          />
          <FormField
            label={t("compareOptions.fields.unNumber")}
            name="unNumber"
            type="number"
            value={data.unNumber || ""}
            onChange={handleFieldChange}
            error={errors.unNumber}
            required
            regex={numberRegex}
          />
        </>
      );
    }

    if (cargoType === "perishable") {
      return renderPerishableFields();
    }

    if (cargoType === "oversized") {
      return renderDimensions("oversized_");
    }

    return null;
  };

  const renderPerishableFields = () => {
    const isFCL = data.containerType === "fcl" || data.containerType === "ftl";

    if (!isFCL) {
      // LCL - just temperature
      return (
        <FormField
          label={t("compareOptions.fields.temperature")}
          name="temperature"
          type="number"
          value={data.temperature || ""}
          onChange={handleFieldChange}
          error={errors.temperature}
          required
          endContent={<span className="text-xs text-muted-foreground">°C</span>}
        />
      );
    }

    // FCL - full perishable fields
    return (
      <div className="perishable lg:gap-8 gap-4 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 border rounded-md bg-muted/20">
        <h3 className="font-semibold text-sm md:col-span-2 xl:col-span-3 2xl:col-span-4 mb-4">
          {t("compareOptions.sections.perishableSettings")}
        </h3>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <RadioGroupField
            label={t("compareOptions.fields.coldTreatment")}
            name="coldTreatment"
            value={data.coldTreatment}
            onChange={handleSelectChange}
            options={[
              { value: "yes", label: t("common.yes") },
              { value: "no", label: t("common.no") },
            ]}
          />

          <FormField
            label={t("compareOptions.fields.temperature")}
            name="temperature"
            type="number"
            value={data.temperature || ""}
            onChange={handleFieldChange}
            error={errors.temperature}
            required
            endContent={
              <span className="text-xs text-muted-foreground">°C</span>
            }
          />
        {/* </div> */}

        <RadioGroupField
          label={t("compareOptions.fields.multipleSetPoints")}
          name="multipleSetPoints"
          value={data.multipleSetPoints}
          onChange={handleSelectChange}
          options={[
            { value: "yes", label: t("common.yes") },
            { value: "no", label: t("common.no") },
          ]}
          error={errors.multipleSetPoints}
        />

        <SelectField
          label={t("compareOptions.fields.cargoProbes")}
          name="cargoProbes"
          value={data.cargoProbes}
          onChange={handleSelectChange}
          options={CARGO_PROBES_OPTIONS}
        />

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <RadioGroupField
            label={t("compareOptions.fields.drainHoles")}
            name="drainHoles"
            value={data.drainHoles}
            onChange={handleSelectChange}
            options={[
              { value: "open", label: t("compareOptions.options.open") },
              { value: "closed", label: t("compareOptions.options.closed") },
            ]}
          />

          <RadioGroupField
            label={t("compareOptions.fields.freshAirExchange")}
            name="freshAirExchange"
            value={data.freshAirExchange}
            onChange={handleSelectChange}
            options={[
              { value: "open", label: t("compareOptions.options.open") },
              { value: "closed", label: t("compareOptions.options.closed") },
            ]}
          />
        {/* </div> */}

        <FormField
          label={t("compareOptions.fields.ventilationVolume")}
          name="ventilationVolume"
          type="number"
          value={data.ventilationVolume || ""}
          onChange={handleFieldChange}
          error={errors.ventilationVolume}
          endContent={
            <span className="text-xs text-muted-foreground">m³/hr</span>
          }
        />

        <RadioGroupField
          label={t("compareOptions.fields.humidity")}
          name="humidity"
          value={data.humidity}
          onChange={handleSelectChange}
          options={[
            { value: "yes", label: t("common.yes") },
            { value: "no", label: t("common.no") },
          ]}
        />

        {data.humidity === "yes" && (
          <FormField
            label={t("compareOptions.fields.humidityPercentage")}
            name="humidityPercentage"
            type="number"
            value={data.humidityPercentage || ""}
            onChange={handleFieldChange}
            error={errors.humidityPercentage}
            endContent={
              <span className="text-xs text-muted-foreground">%</span>
            }
          />
        )}

        <div className="space-y-4 p-4 border rounded-md">
          <h4 className="font-medium text-sm">
            {t("compareOptions.fields.gensetRequired")}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioGroupField
              label={t("compareOptions.fields.gensetExport")}
              name="gensetExport"
              value={data.gensetExport}
              onChange={handleSelectChange}
              options={[
                { value: "yes", label: t("common.yes") },
                { value: "no", label: t("common.no") },
              ]}
            />

            <RadioGroupField
              label={t("compareOptions.fields.gensetImport")}
              name="gensetImport"
              value={data.gensetImport}
              onChange={handleSelectChange}
              options={[
                { value: "yes", label: t("common.yes") },
                { value: "no", label: t("common.no") },
              ]}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPackageDetails = () => {
    return (
      <div className="space-y-4 p-4 border rounded-md bg-muted/20">
        <h3 className="font-semibold text-sm">
          {t("compareOptions.sections.packageDetails")}
        </h3>

        <SelectField
          label={t("compareOptions.fields.packageType")}
          name="packageType"
          value={data.packageType}
          onChange={handleSelectChange}
          error={errors.packageType}
          options={DUMMY_PACKAGE_TYPES}
          required
        />

        <FormField
          label={t("compareOptions.fields.numberOfPackages")}
          name="numberOfPackages"
          type="number"
          value={data.numberOfPackages || ""}
          onChange={handleFieldChange}
          error={errors.numberOfPackages}
          required
          regex={numberRegex}
        />

        <FormField
          label={t("compareOptions.fields.volume")}
          name="volume"
          type="number"
          value={data.volume || ""}
          onChange={handleFieldChange}
          error={errors.volume}
          required
          regex={numberRegex}
        />
      </div>
    );
  };

  const renderDimensions = (prefix = "") => {
    return (
      <div className="space-y-4 p-4 border rounded-md bg-muted/20">
        <h3 className="font-semibold text-sm">
          {t("compareOptions.sections.dimensions")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label={t("compareOptions.fields.width")}
            name={`${prefix}width`}
            type="number"
            value={data[`${prefix}width`] || ""}
            onChange={handleFieldChange}
            error={errors[`${prefix}width`]}
            required
            regex={numberRegex}
          />

          <FormField
            label={t("compareOptions.fields.length")}
            name={`${prefix}length`}
            type="number"
            value={data[`${prefix}length`] || ""}
            onChange={handleFieldChange}
            error={errors[`${prefix}length`]}
            required
            regex={numberRegex}
          />

          <FormField
            label={t("compareOptions.fields.height")}
            name={`${prefix}height`}
            type="number"
            value={data[`${prefix}height`] || ""}
            onChange={handleFieldChange}
            error={errors[`${prefix}height`]}
            required
            regex={numberRegex}
          />
        </div>

        <SelectField
          label={t("compareOptions.fields.lengthMetric")}
          name={`${prefix}lengthMetric`}
          value={data[`${prefix}lengthMetric`]}
          onChange={handleSelectChange}
          error={errors[`${prefix}lengthMetric`]}
          options={LENGTH_METRICS.map((m) => ({ ...m, label: t(m.label) }))}
          required
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-2 text-center">
        {t("compareOptions.steps.routeDetails")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-8 gap-4 space-y-4 xl:space-y-0">
        {/* Departure Location */}
        <CitySearchField
          label={t(selectedMode.departureLabel)}
          name="departureLocation"
          value={data.departureLocation || ""}
          onChange={handleFieldChange}
          error={errors.departureLocation}
          required
        />

        {/* Arrival Location */}
        <CitySearchField
          label={t(selectedMode.arrivalLabel)}
          name="arrivalLocation"
          value={data.arrivalLocation || ""}
          onChange={handleFieldChange}
          error={errors.arrivalLocation}
          required
        />

        {/* Optional Pickup */}
        {selectedMode.optionalFields?.includes("pickup") && (
          <CitySearchField
            label={t("compareOptions.fields.pickupEmptyContainer")}
            name="optionalPickup"
            value={data.optionalPickup || ""}
            onChange={handleFieldChange}
            error={errors.optionalPickup}
          />
        )}

        {/* PLOR */}
        {selectedMode.optionalFields?.includes("plor") && (
          <CitySearchField
            label={t("compareOptions.fields.plor")}
            name="plor"
            value={data.plor || ""}
            onChange={handleFieldChange}
            error={errors.plor}
          />
        )}

        {/* PLOD */}
        {selectedMode.optionalFields?.includes("plod") && (
          <CitySearchField
            label={t("compareOptions.fields.plod")}
            name="plod"
            value={data.plod || ""}
            onChange={handleFieldChange}
            error={errors.plod}
          />
        )}

        {/* Liftgate */}
        {selectedMode.extraFields?.includes("liftgate") && (
          <CheckboxField
            label={t("compareOptions.fields.liftgateRequired")}
            name="liftgate"
            value={data.liftgate}
            onChange={handleFieldChange}
            error={errors.liftgate}
            required
          />
        )}

        {/* Access Conditions */}
        {selectedMode.extraFields?.includes("access") && (
          <CheckboxField
            label={t("compareOptions.fields.accessConditions")}
            name="accessConditions"
            value={data.accessConditions}
            onChange={handleFieldChange}
            error={errors.accessConditions}
            required
          />
        )}

        {/* Container Type and related fields */}
        {renderContainerTypeFields()}

        {/* Commodity */}
        <SelectField
          label={t("compareOptions.fields.commodity")}
          name="commodity"
          value={data.commodity}
          onChange={handleSelectChange}
          error={errors.commodity}
          options={DUMMY_COMMODITIES}
          required
        />

        {/* Gross Weight */}
        <FormField
          label={t("compareOptions.fields.grossWeight")}
          name="grossWeight"
          type="text"
          value={data.grossWeight || ""}
          onChange={handleFieldChange}
          error={errors.grossWeight}
          required
          regex={generalTextRegex}
        />
      </div>
    </div>
  );
}
