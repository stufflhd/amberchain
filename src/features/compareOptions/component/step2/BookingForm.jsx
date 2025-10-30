import React, { useState, useMemo, useCallback, memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShipmentStore } from "../../../../store/shipmentStore";
import { Info, CheckCircle, Plus, X, Package } from "lucide-react";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingConfirmationPopup } from "@/components/ui/booking-confirmation-popup";
import { Checkbox } from "@/components/ui/checkbox";

// Small presentational helpers defined outside the component so they are stable
// and won't be recreated each render. They are pure render helpers and
// intentionally simple to preserve exact markup and styles.
const FormField = memo(({ label, children, info = false, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
      {label}
      {info && <Info className="h-3 w-3" />}
    </Label>
    {children}
  </div>
));

const Section = memo(({ title, children, className = "" }) => (
  <div className={`p-4 rounded-lg border border-border/50 bg-card/30 space-y-3 ${className}`}>
    {title && <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>}
    {children}
  </div>
));

function BookingForm() {
  // select data and setField separately to avoid recreating a new object
  // on every store update (minimizes unnecessary re-renders)
  const data = useShipmentStore((s) => s.data);
  const setField = useShipmentStore((s) => s.setField);

  const [newBeforeETA, setNewBeforeETA] = useState({ day: "", temperature: "" });
  const [newAfterGateIn, setNewAfterGateIn] = useState({ day: "", temperature: "" });
  const [activeScheduleTab, setActiveScheduleTab] = useState("beforeEta");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const addBeforeETA = useCallback(() => {
    if (!newBeforeETA.day || !newBeforeETA.temperature) return;
    setField("temperatureSchedule", {
      ...data.temperatureSchedule,
      daysBeforeETA: [...(data.temperatureSchedule?.daysBeforeETA || []), { ...newBeforeETA }],
    });
    setNewBeforeETA({ day: "", temperature: "" });
  }, [newBeforeETA, data.temperatureSchedule, setField]);

  const addAfterGateIn = useCallback(() => {
    if (!newAfterGateIn.day || !newAfterGateIn.temperature) return;
    setField("temperatureSchedule", {
      ...data.temperatureSchedule,
      daysAfterGateIn: [...(data.temperatureSchedule?.daysAfterGateIn || []), { ...newAfterGateIn }],
    });
    setNewAfterGateIn({ day: "", temperature: "" });
  }, [newAfterGateIn, data.temperatureSchedule, setField]);

  const removeBeforeETA = useCallback((index) => {
    const updatedPoints = data.temperatureSchedule?.daysBeforeETA?.filter((_, i) => i !== index) || [];
    setField("temperatureSchedule", { ...data.temperatureSchedule, daysBeforeETA: updatedPoints });
  }, [data.temperatureSchedule, setField]);

  const removeAfterGateIn = useCallback((index) => {
    const updatedPoints = data.temperatureSchedule?.daysAfterGateIn?.filter((_, i) => i !== index) || [];
    setField("temperatureSchedule", { ...data.temperatureSchedule, daysAfterGateIn: updatedPoints });
  }, [data.temperatureSchedule, setField]);


  const handleBookNow = useCallback(() => {
    console.log("Booking data:", data);
    setShowConfirmationPopup(true);
  }, [data]);

  // Stable handlers to avoid recreating inline functions for common UI events
  const handleScheduleTabChange = useCallback((val) => setActiveScheduleTab(val || "beforeEta"), []);

  const handleNewBeforeDayChange = useCallback((e) => {
    const v = e?.target ? e.target.value : e;
    setNewBeforeETA((prev) => ({ ...prev, day: v }));
  }, []);

  const handleNewBeforeTempChange = useCallback((e) => {
    const v = e?.target ? e.target.value : e;
    setNewBeforeETA((prev) => ({ ...prev, temperature: v }));
  }, []);

  const handleNewAfterDayChange = useCallback((e) => {
    const v = e?.target ? e.target.value : e;
    setNewAfterGateIn((prev) => ({ ...prev, day: v }));
  }, []);

  const handleNewAfterTempChange = useCallback((e) => {
    const v = e?.target ? e.target.value : e;
    setNewAfterGateIn((prev) => ({ ...prev, temperature: v }));
  }, []);



// Check if Cargo Information section should be displayed
const shouldShowCargoInfo = useMemo(() => {
  const isHazardous = data.cargoType == "Hazardous" && ["sea", "rail", "road", "air"].includes(data.mode);
  const isOversized = 
    (data.cargoType == "Oversized" && ["sea", "rail", "road"].includes(data.mode)) ||
    (data.mode == "road" && data.shipmentType == "LTL") ||
    ["air", "ecommerce"].includes(data.mode);
  const hasPackageInfo = 
    (data.shipmentType == "LCL" && ["sea", "rail"].includes(data.mode)) ||
    (data.shipmentType == "LTL" && data.mode == "road") ||
    ["air", "ecommerce"].includes(data.mode);
  const isRoadFTL = data.mode == "road" && data.shipmentType == "FTL";
  const isAirStackable = data.mode == "air";

  return isHazardous || isOversized || hasPackageInfo || isRoadFTL || isAirStackable;
}, [data.cargoType, data.mode, data.shipmentType]);

// Check if Temperature Control section should be displayed
// const shouldShowTempControl = useMemo(() => {
//   return data.cargoType == "Perishable" && ["sea", "rail", "road", "air"].includes(data.mode);
// }, [data.cargoType, data.mode]);

// Check if Delivery Requirements section should be displayed
// const shouldShowDeliveryReq = useMemo(() => {
//   return data.mode == "road";
// }, [data.mode]);

// Calculate grid columns based on visible sections
// const visibleSectionsCount = useMemo(() => {
//   return [shouldShowCargoInfo, shouldShowTempControl, shouldShowDeliveryReq].filter(Boolean).length;
// }, [shouldShowCargoInfo, shouldShowTempControl, shouldShowDeliveryReq]);





  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="border-b border-border/50 pb-3">
        <h3 className="text-lg font-semibold text-foreground">Booking Details</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Configure your shipment settings</p>
      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
  <div className="space-y-6">

     {shouldShowCargoInfo && (
  <Section title="Cargo Details">
          <div className="grid grid-cols-2 gap-3">
            {data.cargoType == "Hazardous" && ["sea", "rail", "road", "air"].includes(data.mode) && (
              <>
                <FormField label="Class IMO">
                  <Input
                    value={data.cargo?.class || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, class: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="UN Number">
                  <Input
                    value={data.cargo?.unNumber || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, unNumber: e.target.value })}
                    className="h-9"
                  />
                </FormField>
              </>
            )}

            {((data.cargoType == "Oversized" && ["sea", "rail", "road"].includes(data.mode)) ||
              (data.mode == "road" && data.shipmentType == "LTL") ||
              ["air", "ecommerce"].includes(data.mode)) && (
              <>
                <FormField label="Width">
                  <Input
                    value={data.cargo?.width || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, width: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Length">
                  <Input
                    value={data.cargo?.length || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, length: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Height">
                  <Input
                    value={data.cargo?.height || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, height: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Unit">
                  <Select
                    value={data.cargo?.lengthMetrics || ""}
                    onValueChange={(val) => setField("cargo", { ...data.cargo, lengthMetrics: val })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inch">Inch</SelectItem>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </>
            )}

            {((data.shipmentType == "LCL" && ["sea", "rail"].includes(data.mode)) ||
              (data.shipmentType == "LTL" && data.mode == "road") ||
              ["air", "ecommerce"].includes(data.mode)) && (
              <>
                <FormField label="Package Type">
                  <Input
                    value={data.cargo?.packageType || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, packageType: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Number of Packages">
                  <Input
                    type="number"
                    value={data.cargo?.numberOfPackages || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, numberOfPackages: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Volume" className="col-span-2">
                  <Input
                    value={data.cargo?.volume || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, volume: e.target.value })}
                    className="h-9"
                  />
                </FormField>
              </>
            )}

            {data.mode == "road" && data.shipmentType == "FTL" && (
              <>
                <FormField label="Number of Pallets">
                  <Input
                    value={data.cargo?.numberOfPallet || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, numberOfPallet: e.target.value })}
                    className="h-9"
                  />
                </FormField>
                <FormField label="Truck Type">
                  <Input
                    value={data.cargo?.truckType || ""}
                    onChange={(e) => setField("cargo", { ...data.cargo, truckType: e.target.value })}
                    className="h-9"
                  />
                </FormField>
              </>
            )}

            {data.mode == "air" && (
              <>
                <FormField label="Stackable Cargo" className="col-span-2">
                  <RadioGroup
                    value={data.cargo.stackableCargo ? "yes" : "no"}
                    onValueChange={(val) => setField("cargo", { ...data.cargo, stackableCargo: val == "yes" })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="stackable-yes" />
                      <label htmlFor="stackable-yes" className="text-sm">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="stackable-no" />
                      <label htmlFor="stackable-no" className="text-sm">No</label>
                    </div>
                  </RadioGroup>
                </FormField>
              </>
            )}
          </div>
        </Section>
)}

        {/* Perishable Settings */}
        {data.cargoType == "Perishable" && ["sea", "rail", "road", "air"].includes(data.mode) && (
       <Section title="Temperature Control">
  {["sea", "rail", "road"].includes(data.mode) && (
    <>
      {/* Cold Treatment + Temperature side by side */}
      <div
       className="grid grid-cols-2 gap-4"
      >
        <FormField label="Cold Treatment Required" info>
          <RadioGroup
            value={data.coldTreatment.required ? "yes" : "no"}
            onValueChange={(val) =>
              setField("coldTreatment", { ...data.coldTreatment, required: val == "yes" })
            }
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="cold-yes" />
              <label htmlFor="cold-yes" className="text-sm">Yes</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="cold-no" />
              <label htmlFor="cold-no" className="text-sm">No</label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Temperature (°C)" info>
          <Input
            value={data.coldTreatment.temperature || ""}
            onChange={(e) =>
              setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })
            }
            className="h-9 max-w-xs"
            placeholder="e.g. -18"
          />
        </FormField>
      </div>

      {/* Temperature Set Points */}
      <FormField label="Temperature Set Points" info>
        <ToggleGroup
          type="single"
          value={data.temperatureSchedule?.enabled ? "yes" : "no"}
          onValueChange={(val) =>
            setField("temperatureSchedule", { ...data.temperatureSchedule, enabled: val == "yes" })
          }
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Yes</ToggleGroupItem>
          <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">No</ToggleGroupItem>
        </ToggleGroup>
      </FormField>

      {/* Schedule details */}
      {data.temperatureSchedule?.enabled && (
        <div className="border rounded-lg p-3 bg-muted/30 space-y-3">
          <ToggleGroup
            type="single"
            value={activeScheduleTab}
            onValueChange={handleScheduleTabChange}
            variant="outline"
            size="sm"
            className="justify-start"
          >
            <ToggleGroupItem value="beforeEta" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground text-xs">
              Before ETA
            </ToggleGroupItem>
            <ToggleGroupItem value="afterGateIn" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground text-xs">
              After Gate In
            </ToggleGroupItem>
          </ToggleGroup>

          {activeScheduleTab == "beforeEta" ? (
            <div className="space-y-2">
              {(data.temperatureSchedule?.daysBeforeETA || []).map((d, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input value={d.day} readOnly className="w-20 h-8" />
                  <Input value={d.temperature} readOnly className="flex-1 h-8" />
                  <Button size="sm" variant="ghost" onClick={() => removeBeforeETA(idx)} className="h-8 w-8 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 items-center pt-2 border-t border-dashed">
                <Input
                  value={newBeforeETA.day}
                  onChange={handleNewBeforeDayChange}
                  placeholder="Day"
                  className="w-20 h-8"
                />
                <Input
                  value={newBeforeETA.temperature}
                  onChange={handleNewBeforeTempChange}
                  placeholder="Temp"
                  className="flex-1 h-8"
                />
                <Button
                  size="sm"
                  onClick={addBeforeETA}
                  disabled={!newBeforeETA.day || !newBeforeETA.temperature}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {(data.temperatureSchedule?.daysAfterGateIn || []).map((d, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input value={d.day} readOnly className="w-20 h-8" />
                  <Input value={d.temperature} readOnly className="flex-1 h-8" />
                  <Button size="sm" variant="ghost" onClick={() => removeAfterGateIn(idx)} className="h-8 w-8 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 items-center pt-2 border-t border-dashed">
                <Input
                  value={newAfterGateIn.day}
                  onChange={handleNewAfterDayChange}
                  placeholder="Day"
                  className="w-20 h-8"
                />
                <Input
                  value={newAfterGateIn.temperature}
                  onChange={handleNewAfterTempChange}
                  placeholder="Temp"
                  className="flex-1 h-8"
                />
                <Button
                  size="sm"
                  onClick={addAfterGateIn}
                  disabled={!newAfterGateIn.day || !newAfterGateIn.temperature}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Humidity control side by side */}
      <div className="pt-3 border-t grid grid-cols-2 gap-4">
        <FormField label="Humidity Control" info>
          <ToggleGroup
            type="single"
            value={data.humidity.required ? "yes" : "no"}
            onValueChange={(val) =>
              setField("humidity", { ...data.humidity, required: val == "yes" })
            }
            variant="outline"
            className="justify-start"
          >
            <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Yes</ToggleGroupItem>
            <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">No</ToggleGroupItem>
          </ToggleGroup>
        </FormField>

        <FormField label="Humidity (%)" info>
          <Input
            value={data.humidity.percentage}
            onChange={(e) =>
              setField("humidity", { ...data.humidity, percentage: e.target.value })
            }
            className="h-9 max-w-xs"
            placeholder="e.g. 85"
          />
        </FormField>
      </div>

      {/* Probes Section - two per row */}
      <div className="pt-3 border-t grid grid-cols-2 gap-4">
        <FormField label="Number Of Cargo Probes" info>
          <Input
            type="number"
            value={data.probes.numberOfCargoProbes}
            onChange={(e) =>
              setField("probes", { ...data.probes, numberOfCargoProbes: e.target.value })
            }
            className="h-9 max-w-xs"
            placeholder="Number"
          />
        </FormField>

        <FormField label="Drain Holes" info>
          <RadioGroup
            value={data.probes.drainHoles ? "open" : "closed"}
            onValueChange={(val) =>
              setField("probes", { ...data.probes, drainHoles: val == "open" })
            }
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="open" id="drain-open" />
              <label htmlFor="drain-open" className="text-sm">Open</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="closed" id="drain-closed" />
              <label htmlFor="drain-closed" className="text-sm">Closed</label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Fresh Air Exchange" info>
          <ToggleGroup
            type="single"
            value={data.probes.freshAirExchange}
            onValueChange={(val) => setField("probes", { ...data.probes, freshAirExchange: val })}
            variant="outline"
            className="justify-start"
          >
            <ToggleGroupItem value="open" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Open</ToggleGroupItem>
            <ToggleGroupItem value="close" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Close</ToggleGroupItem>
          </ToggleGroup>
        </FormField>

        <FormField label="Ventilation Volume" info>
          <Input
            value={data.probes.ventilationVolume}
            onChange={(e) =>
              setField("probes", { ...data.probes, ventilationVolume: e.target.value })
            }
            className="h-9 max-w-xs"
            placeholder="Volume"
          />
        </FormField>
      </div>

      {/* Genset section unchanged */}
      <div className="pt-3 border-t">
        <FormField label="Genset" info>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">During Export</Label>
              <RadioGroup
                value={data.genset.duringExport ? "yes" : "no"}
                onValueChange={(val) =>
                  setField("genset", { ...data.genset, duringExport: val == "yes" })
                }
                className="flex gap-3"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="export-yes" />
                  <label htmlFor="export-yes" className="text-sm">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="export-no" />
                  <label htmlFor="export-no" className="text-sm">No</label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">During Import</Label>
              <RadioGroup
                value={data.genset.duringImport ? "yes" : "no"}
                onValueChange={(val) =>
                  setField("genset", { ...data.genset, duringImport: val == "yes" })
                }
                className="flex gap-3"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="import-yes" />
                  <label htmlFor="import-yes" className="text-sm">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="import-no" />
                  <label htmlFor="import-no" className="text-sm">No</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </FormField>
      </div>
    </>
  )}

  {data.mode == "air" && (
    <FormField label="Temperature (°C)" info>
      <Input
        value={data.coldTreatment.temperature || ""}
        onChange={(e) =>
          setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })
        }
        className="h-9 max-w-xs"
        placeholder="e.g. -18"
      />
    </FormField>
  )}
</Section>
        )}

        {/* Road-specific settings */}
        {data.mode == "road" && (
          <Section title="Delivery Requirements">
            <div className="grid grid-cols-2 gap-3">

            <FormField label="Liftgate Required">
              <RadioGroup
                value={data.liftgate.required ? "yes" : "no"}
                onValueChange={(val) => setField("liftgate", { ...data.liftgate, required: val == "yes" })}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="liftgate-yes" />
                  <label htmlFor="liftgate-yes" className="text-sm">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="liftgate-no" />
                  <label htmlFor="liftgate-no" className="text-sm">No</label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Access Conditions" info>
              <Select
                value={data.accessConditions || ""}
                onValueChange={(val) => setField("accessConditions", val)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy access</SelectItem>
                  <SelectItem value="limited">Limited access</SelectItem>
                  <SelectItem value="difficult">Difficult access</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
                </div>
          </Section>
        )}

    </div>
{/* Service Add-ons Section */}

<Section title="Service Add-Ons">
  <div 
  className="grid grid-cols-1 gap-6 w-full items-stretch"
  >

    {/* Complex add-ons - 2 per row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Customs Brokerage */}
      {["sea", "rail", "road", "air", "ecommerce"].includes(data.mode) && (
        <div className="border border-border/30 rounded-md p-2 flex flex-col justify-center bg-background hover:bg-muted/30 transition">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-medium">Customs Brokerage</label>
            <div className="flex items-center gap-3">
              {data.addons?.customsBrokerage?.enabled && (
                <Select
                  value={data.addons?.customsBrokerage?.location || "origin"}
                  onValueChange={(val) =>
                    setField("addons", {
                      ...data.addons,
                      customsBrokerage: {
                        ...data.addons?.customsBrokerage,
                        location: val,
                      },
                    })
                  }
                >
                  <SelectTrigger className="h-7 w-28 text-xs">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="origin">Origin</SelectItem>
                    <SelectItem value="destination">Destination</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Checkbox
                checked={data.addons?.customsBrokerage?.enabled || false}
                onCheckedChange={(checked) =>
                  setField("addons", {
                    ...data.addons,
                    customsBrokerage: {
                      ...data.addons?.customsBrokerage,
                      enabled: checked,
                    },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Insurance */}
      {["sea", "rail", "road", "air"].includes(data.mode) && (
        <div className="border border-border/30 rounded-md p-2 flex flex-col justify-center bg-background hover:bg-muted/30 transition">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-medium">Insurance</label>
            <div className="flex items-center gap-2">
              {data.addons?.insurance?.enabled && (
                <>
                  <Input
                    type="number"
                    value={data.addons?.insurance?.cargoValue || ""}
                    onChange={(e) =>
                      setField("addons", {
                        ...data.addons,
                        insurance: {
                          ...data.addons?.insurance,
                          cargoValue: e.target.value,
                        },
                      })
                    }
                    className="h-7 w-24 text-xs"
                    placeholder="Value"
                  />
                  <Select
                    value={data.addons?.insurance?.currency || "USD"}
                    onValueChange={(val) =>
                      setField("addons", {
                        ...data.addons,
                        insurance: {
                          ...data.addons?.insurance,
                          currency: val,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="MAD">MAD</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <Checkbox
                checked={data.addons?.insurance?.enabled || false}
                onCheckedChange={(checked) =>
                  setField("addons", {
                    ...data.addons,
                    insurance: {
                      ...data.addons?.insurance,
                      enabled: checked,
                    },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Stuffing */}
      {["sea", "rail", "road", "air"].includes(data.mode) && (
        <div className="border border-border/30 rounded-md p-2 flex flex-col justify-center bg-background hover:bg-muted/30 transition">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-medium">Stuffing</label>
            <div className="flex items-center gap-2">
              {data.addons?.stuffing?.enabled && (
                <>
                  <Select
                    value={data.addons?.stuffing?.equipment || ""}
                    onValueChange={(val) =>
                      setField("addons", {
                        ...data.addons,
                        stuffing: {
                          ...data.addons?.stuffing,
                          equipment: val,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-7 w-28 text-xs">
                      <SelectValue placeholder="Equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forklift">Forklift</SelectItem>
                      <SelectItem value="manually">Manually</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={data.addons?.stuffing?.resources || ""}
                    onValueChange={(val) =>
                      setField("addons", {
                        ...data.addons,
                        stuffing: {
                          ...data.addons?.stuffing,
                          resources: val,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue placeholder="Workers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <Checkbox
                checked={data.addons?.stuffing?.enabled || false}
                onCheckedChange={(checked) =>
                  setField("addons", {
                    ...data.addons,
                    stuffing: {
                      ...data.addons?.stuffing,
                      enabled: checked,
                    },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Unstuffing */}
      {["sea", "rail", "road", "air"].includes(data.mode) && (
        <div className="border border-border/30 rounded-md p-2 flex flex-col justify-center bg-background hover:bg-muted/30 transition">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-medium">Unstuffing</label>
            <div className="flex items-center gap-2">
              {data.addons?.unstuffing?.enabled && (
                <>
                  <Select
                    value={data.addons?.unstuffing?.equipment || ""}
                    onValueChange={(val) =>
                      setField("addons", {
                        ...data.addons,
                        unstuffing: {
                          ...data.addons?.unstuffing,
                          equipment: val,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-7 w-28 text-xs">
                      <SelectValue placeholder="Equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forklift">Forklift</SelectItem>
                      <SelectItem value="manually">Manually</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={data.addons?.unstuffing?.resources || ""}
                    onValueChange={(val) =>
                      setField("addons", {
                        ...data.addons,
                        unstuffing: {
                          ...data.addons?.unstuffing,
                          resources: val,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue placeholder="Workers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <Checkbox
                checked={data.addons?.unstuffing?.enabled || false}
                onCheckedChange={(checked) =>
                  setField("addons", {
                    ...data.addons,
                    unstuffing: {
                      ...data.addons?.unstuffing,
                      enabled: checked,
                    },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Inspection */}
      {["sea", "rail", "road", "air", "ecommerce"].includes(data.mode) && (
        <div className="border border-border/30 rounded-md p-2 flex flex-col justify-center bg-background hover:bg-muted/30 transition">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-medium">Inspection</label>
            <div className="flex items-center gap-2">
              {data.addons?.inspection?.enabled && (
                <Select
                  value={data.addons?.inspection?.type || ""}
                  onValueChange={(val) =>
                    setField("addons", {
                      ...data.addons,
                      inspection: {
                        ...data.addons?.inspection,
                        type: val,
                      },
                    })
                  }
                >
                  <SelectTrigger className="h-7 w-36 text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="quantity">Quantity</SelectItem>
                    <SelectItem value="customs">Customs</SelectItem>
                    <SelectItem value="phytosanitary">Phytosanitary</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Checkbox
                checked={data.addons?.inspection?.enabled || false}
                onCheckedChange={(checked) =>
                  setField("addons", {
                    ...data.addons,
                    inspection: {
                      ...data.addons?.inspection,
                      enabled: checked,
                    },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Simple Yes/No checkboxes - 3 per row */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3">
      {[
        { key: "portAgent", label: "Port Agent", modes: ["sea"] },
        { key: "reposition", label: "Repositioning", modes: ["sea", "rail"] },
        { key: "trackLive", label: "Live Tracking", modes: ["sea", "rail", "road", "air", "ecommerce"] },
        { key: "trokeTrace", label: "Troke Trace", modes: ["sea", "rail", "road", "air", "ecommerce"] },
        { key: "socForAll", label: "SOC for All", modes: ["sea", "rail"] },
        { key: "readyToLoad", label: "Ready To Load", modes: ["sea", "rail", "road"] },
        { key: "changeDestination", label: "Change Destination", modes: ["sea", "rail", "road", "air", "ecommerce"] },
        { key: "extraFreeTime", label: "Extra Free Time", modes: ["sea", "rail", "road", "air", "ecommerce"] },
        { key: "reduceEmission", label: "Reduce Emission", modes: ["sea", "rail", "road", "air", "ecommerce"] },
      ]
        .filter((item) => item.modes.includes(data.mode))
        .map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between bg-muted/40 hover:bg-muted/60 transition px-2 py-1.5 rounded-md border border-border/20"
          >
            <label className="text-xs cursor-pointer">{item.label}</label>
            <Checkbox
              checked={data.addons?.[item.key] || false}
              onCheckedChange={(checked) =>
                setField("addons", { ...data.addons, [item.key]: checked })
              }
              className="h-4 w-4"
            />
          </div>
        ))}
    </div>
  </div>
</Section>
    </div>

      {/* Book Now Button */}
      <div className="flex justify-center pt-4 border-t border-border/50">
        <Button
          onClick={handleBookNow}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-12 h-11 rounded-lg shadow-sm hover:shadow transition-all"
        >
          {/* <CheckCircle className="mr-2 h-4 w-4" /> */}
          Book Now
        </Button>
      </div>

      <BookingConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
        bookingData={data}
      />
    </div>
  );
}

export default memo(BookingForm);