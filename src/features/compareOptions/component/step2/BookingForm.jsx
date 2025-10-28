import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShipmentStore } from "../../../../store/shipmentStore";
import { Info, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingConfirmationPopup } from "@/components/ui/booking-confirmation-popup";

export default function BookingForm() {
  const { data, setField } = useShipmentStore();

  // local state for temperature set points
  const [newBeforeETA, setNewBeforeETA] = useState({ day: "", temperature: "" });
  const [newAfterGateIn, setNewAfterGateIn] = useState({ day: "", temperature: "" });
  const [activeScheduleTab, setActiveScheduleTab] = useState("beforeEta");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  // helpers
  const addBeforeETA = () => {
    if (!newBeforeETA.day || !newBeforeETA.temperature) return;
    setField("temperatureSchedule", {
      ...data.temperatureSchedule,
      daysBeforeETA: [...(data.temperatureSchedule?.daysBeforeETA || []), { ...newBeforeETA }],
    });
    setNewBeforeETA({ day: "", temperature: "" });
  };

  const addAfterGateIn = () => {
    if (!newAfterGateIn.day || !newAfterGateIn.temperature) return;
    setField("temperatureSchedule", {
      ...data.temperatureSchedule,
      daysAfterGateIn: [...(data.temperatureSchedule?.daysAfterGateIn || []), { ...newAfterGateIn }],
    });
    setNewAfterGateIn({ day: "", temperature: "" });
  };

  const removeBeforeETA = (index) => {
    const updatedPoints = data.temperatureSchedule?.daysBeforeETA?.filter((_, i) => i !== index) || [];
    setField("temperatureSchedule", { ...data.temperatureSchedule, daysBeforeETA: updatedPoints });
  };

  const removeAfterGateIn = (index) => {
    const updatedPoints = data.temperatureSchedule?.daysAfterGateIn?.filter((_, i) => i !== index) || [];
    setField("temperatureSchedule", { ...data.temperatureSchedule, daysAfterGateIn: updatedPoints });
  };

  const handleBookNow = () => {
    // Here you would typically send the data to your API
    console.log("Booking data:", data);
    setShowConfirmationPopup(true);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-3 shadow-sm relative">
      <h3 className="text-base font-semibold mb-2 text-primary">Specify your Reefer Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Column - Cargo Details and Cold Treatment */}
        <div className="space-y-3">
          {/* Cargo Details Section */}
          <div className="space-y-2 p-2 border border-border rounded-lg bg-card/50">
            <h4 className="text-sm font-medium text-primary mb-2">Cargo Details</h4>
            <div className="grid grid-cols-2 gap-3 items-center">


    {console.log('Debug - Hazardous:', { cargoType: data.cargoType, mode: data.mode })}
    {data.cargoType == "Hazardous" && ["sea", "rail", "road", "air"].includes(data.mode) && (
        <>
                    <Label className="col-span-1 flex items-center gap-2 text-sm">Class IMO</Label>
              <Input
              value={data.cargo?.class || ""}
              onChange={(e) => setField("cargo", { ...data.cargo, class: e.target.value })}
              className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">UN Number</Label>
              <Input
                value={data.cargo?.unNumber || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, unNumber: e.target.value })}
                className="col-span-1"
                />
        </>
        )
        }


{console.log('Debug - Dimensions:', { cargoType: data.cargoType, mode: data.mode, shipmentType: data.shipmentType })}
{(
  (data.cargoType == "Oversized" && ["sea", "rail", "road"].includes(data.mode)) ||
  (data.mode == "road" && data.shipmentType == "LTL") ||
  ["air", "ecommerce"].includes(data.mode)
) && (<>    
              <Label className="col-span-1 flex items-center gap-2 text-sm">Width</Label>
              <Input
                value={data.cargo?.width || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, width: e.target.value })}
                className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">Length</Label>
              <Input
                value={data.cargo?.length || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, length: e.target.value })}
                className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">Height</Label>
              <Input
                value={data.cargo?.height || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, height: e.target.value })}
                className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">Length Unit</Label>
              <Select
                value={data.cargo?.lengthMetrics || ""}
                onValueChange={(val) => setField("cargo", { ...data.cargo, lengthMetrics: val })}
              >
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inch">Inch</SelectItem>
                  <SelectItem value="meter">Meter</SelectItem>
                  <SelectItem value="feet">Feet</SelectItem>
                </SelectContent>
              </Select>
        </>
)
}      
{console.log('Debug - Package:', { mode: data.mode, shipmentType: data.shipmentType })}
{(
  (data.shipmentType == "LCL" && ["sea", "rail"].includes(data.mode)) ||
  (data.shipmentType == "LTL" && data.mode == "rail") ||
  ["air", "ecommerce"].includes(data.mode)
) && (<>
              <Label className="col-span-1 flex items-center gap-2 text-sm">Package Type</Label>
              <Input
                value={data.cargo?.packageType || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, packageType: e.target.value })}
                className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">Number of Packages</Label>
              <Input
                type="number"
                value={data.cargo?.numberOfPackages || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, numberOfPackages: e.target.value })}
                className="col-span-1"
              />
              <Label className="col-span-1 flex items-center gap-2 text-sm">Volume</Label>
              <Input
                value={data.cargo?.volume || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, volume: e.target.value })}
                className="col-span-1"
              />
  

        </>
    )
    }
{data.mode == "road" && data.shipmentType == "FTL" && (
        <>
              <Label className="col-span-1 flex items-center gap-2 text-sm">Number of pallet</Label>
              <Input
                value={data.cargo?.numberOfPallet || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, numberOfPallet: e.target.value })}
                className="col-span-1"
              />
              
        </>
    )
    }

    
        {data.mode == "air" && (
        <>  
        
             <Label className="col-span-1 flex items-center gap-2 text-sm">Stackable Cargo</Label>
                <RadioGroup
                value={data.cargo.stackableCargo ? "yes" : "no"}
                onValueChange={(val) =>
                    setField("cargo", { ...data.cargo, stackableCargo: val == "yes" })
                }
                className="flex gap-3"
                >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="stackable-yes" />
                    <label htmlFor="stackable-yes" className="text-sm font-medium">
                    Yes
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="stackable-no" />
                    <label htmlFor="stackable-no" className="text-sm font-medium">
                    No
                    </label>
                </div>
                </RadioGroup>
        {data.cargoType == "Perishable" && (
        <div className="p-2 border border-border rounded-lg bg-card/50">
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label className="col-span-1 flex items-center gap-2 text-sm">
              Temperature
              <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              value={data.coldTreatment.temperature || ""}
              onChange={(e) =>
                setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })
              }
              className="col-span-2 max-w-xs"
              placeholder="°C"
            />
          </div>
        </div>
      )}
        </>
        )}
          {data.mode == "road" && data.shipmentType == "FTL" && (
        <>
              <Label className="col-span-1 flex items-center gap-2 text-sm">Truck Type</Label>
              <Input
                value={data.cargo?.truckType || ""}
                onChange={(e) => setField("cargo", { ...data.cargo, truckType: e.target.value })}
                className="col-span-1"
              />
        </>
            )
            }
            </div>
          </div>
          
          {/* Cold Treatment Section - Moved from right column */}
          {data.cargoType == "Perishable" && ["sea", "rail", "road"].includes(data.mode) && (
            <>
          {/* Cold Treatment */}
          <div className="p-2 border border-border rounded-lg bg-card/50">
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="col-span-1 flex items-center gap-2 text-sm">
                Cold Treatment
                <Info className="h-3 w-3 text-muted-foreground" />
              </Label>
              <div className="col-span-2 flex items-center gap-3">
                <RadioGroup
                  value={data.coldTreatment.required ? "yes" : "no"}
                  onValueChange={(val) => setField("coldTreatment", { ...data.coldTreatment, required: val == "yes" })}
                  className="flex gap-3"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="cold-yes" />
                    <label htmlFor="cold-yes" className="text-sm font-medium">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="cold-no" />
                    <label htmlFor="cold-no" className="text-sm font-medium">
                      No
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        
          <div className="p-2 border border-border rounded-lg bg-card/50">
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="col-span-1 flex items-center gap-2 text-sm">
                Temperature
                <Info className="h-3 w-3 text-muted-foreground" />
              </Label>
              <Input
                value={data.coldTreatment.temperature || ""}
                onChange={(e) =>
                  setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })
                }
                className="col-span-2 max-w-xs"
                placeholder="°C"
              />
            </div>
          </div>
        


          {/* Temperature Section with Set Points, Humidity, and Probes */}
          <div className="p-2 border border-border rounded-lg bg-card/50">
            {/* Temperature Set Points */}
            <div className="grid grid-cols-3 gap-3 items-center">
              <Label className="col-span-1 flex items-center gap-2 text-sm">
                Temperature Set Points
                <Info className="h-3 w-3 text-muted-foreground" />
              </Label>
              <div className="col-span-2 flex items-center gap-3">
                <ToggleGroup
                  type="single"
                  value={data.temperatureSchedule?.enabled ? "yes" : "no"}
                  onValueChange={(val) =>
                    setField("temperatureSchedule", { ...data.temperatureSchedule, enabled: val == "yes" })
                  }
                  variant="outline"
                  className="bg-background"
                >
                  <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                    Yes
                  </ToggleGroupItem>
                  <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                    No
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {data.temperatureSchedule?.enabled && (
              <div className="mt-3 border rounded p-3 bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <ToggleGroup
                    type="single"
                    value={activeScheduleTab}
                    onValueChange={(val) => setActiveScheduleTab(val || "beforeEta")}
                    variant="outline"
                    size="sm"
                    className="bg-background"
                  >
                    <ToggleGroupItem
                      value="beforeEta"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground font-medium px-4 py-2"
                    >
                      Days Before ETA
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="afterGateIn"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground font-medium px-4 py-2"
                    >
                      Days After Gate In
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {activeScheduleTab == "beforeEta" ? (
                  <div className="space-y-2">
                    {(data.temperatureSchedule?.daysBeforeETA || []).map((d, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-2 bg-muted rounded-md">
                        <Input value={d.day} readOnly className="w-24" placeholder="Day" />
                        <Input value={d.temperature} readOnly className="w-32" placeholder="Temperature" />
                        <Button size="sm" variant="destructive" onClick={() => removeBeforeETA(idx)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-3 items-center p-2 border-2 border-dashed border-muted-foreground/25 rounded-md">
                      <Input
                        value={newBeforeETA.day}
                        onChange={(e) => setNewBeforeETA({ ...newBeforeETA, day: e.target.value })}
                        placeholder="Day (e.g. -3)"
                        className="w-24"
                      />
                      <Input
                        value={newBeforeETA.temperature}
                        onChange={(e) => setNewBeforeETA({ ...newBeforeETA, temperature: e.target.value })}
                        placeholder="Temperature"
                        className="w-32"
                      />
                      <Button
                        size="sm"
                        onClick={addBeforeETA}
                        disabled={!newBeforeETA.day || !newBeforeETA.temperature}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(data.temperatureSchedule?.daysAfterGateIn || []).map((d, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-2 bg-muted rounded-md">
                        <Input value={d.day} readOnly className="w-24" placeholder="Day" />
                        <Input value={d.temperature} readOnly className="w-32" placeholder="Temperature" />
                        <Button size="sm" variant="destructive" onClick={() => removeAfterGateIn(idx)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-3 items-center p-2 border-2 border-dashed border-muted-foreground/25 rounded-md">
                      <Input
                        value={newAfterGateIn.day}
                        onChange={(e) => setNewAfterGateIn({ ...newAfterGateIn, day: e.target.value })}
                        placeholder="Day (e.g. 1)"
                        className="w-24"
                      />
                      <Input
                        value={newAfterGateIn.temperature}
                        onChange={(e) => setNewAfterGateIn({ ...newAfterGateIn, temperature: e.target.value })}
                        placeholder="Temperature"
                        className="w-32"
                      />
                      <Button
                        size="sm"
                        onClick={addAfterGateIn}
                        disabled={!newAfterGateIn.day || !newAfterGateIn.temperature}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Humidity Control - Moved inside temperature section */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  Humidity Control
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Label>
                <ToggleGroup
                  type="single"
                  value={data.humidity.required ? "yes" : "no"}
                  onValueChange={(val) => setField("humidity", { ...data.humidity, required: val == "yes" })}
                  variant="outline"
                  className="bg-background"
                >
                  <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                    Yes
                  </ToggleGroupItem>
                  <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                    No
                  </ToggleGroupItem>
                </ToggleGroup>
                {data.humidity.required && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Humidity Percentage
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <Input
                      value={data.humidity.percentage}
                      onChange={(e) => setField("humidity", { ...data.humidity, percentage: e.target.value })}
                      placeholder="Humidity %"
                      className="w-36 max-w-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Cargo Probes - Moved inside temperature section */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Number of Cargo Probes
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Label>
                <Input
                  type="number"
                  value={data.probes.numberOfCargoProbes}
                  onChange={(e) => setField("probes", { ...data.probes, numberOfCargoProbes: e.target.value })}
                  className="w-36 max-w-xs"
                />
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Label className="flex items-center gap-2 mb-0">
                      Drain Holes
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <RadioGroup
                      value={data.probes.drainHoles ? "open" : "closed"}
                      onValueChange={(val) => setField("probes", { ...data.probes, drainHoles: val == "open" })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="open" id="drain-open" />
                        <label htmlFor="drain-open" className="text-sm font-medium">
                          Open
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="closed" id="drain-closed" />
                        <label htmlFor="drain-closed" className="text-sm font-medium">
                          Closed
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fresh Air Exchange moved from probes section */}
          <div className="p-2 border border-border rounded-lg bg-card/50">
            <div className="flex items-center gap-4">
              <Label className="flex items-center gap-2 mb-0">
                Fresh Air Exchange
                <Info className="h-4 w-4 text-muted-foreground" />
              </Label>
              <ToggleGroup
                type="single"
                value={data.probes.freshAirExchange}
                onValueChange={(val) => setField("probes", { ...data.probes, freshAirExchange: val })}
                variant="outline"
                className="bg-background"
              >
                <ToggleGroupItem value="open" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                  Open
                </ToggleGroupItem>
                <ToggleGroupItem value="close" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                  Close
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="mt-2">
              <Label className="flex items-center gap-2">
                Ventilation Volume
                <Info className="h-4 w-4 text-muted-foreground" />
              </Label>
              <Input
                value={data.probes.ventilationVolume}
                onChange={(e) => setField("probes", { ...data.probes, ventilationVolume: e.target.value })}
                className="w-36 mt-1"
                placeholder="Volume"
              />
            </div>
          </div>

          {/* Genset */}
          <div className="p-2 border border-border rounded-lg bg-card/50">
            <Label className="flex items-center gap-2 mb-2">
              Genset
              <Info className="h-4 w-4 text-muted-foreground" />
            </Label>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-1 flex items-center gap-2 text-sm">
                  During Export
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <RadioGroup
                  value={data.genset.duringExport ? "yes" : "no"}
                  onValueChange={(val) => setField("genset", { ...data.genset, duringExport: val == "yes" })}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="export-yes" />
                      <label htmlFor="export-yes" className="text-sm font-medium">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="export-no" />
                      <label htmlFor="export-no" className="text-sm font-medium">
                        No
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="mb-1 flex items-center gap-2 text-sm">
                  During Import
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <RadioGroup
                  value={data.genset.duringImport ? "yes" : "no"}
                  onValueChange={(val) => setField("genset", { ...data.genset, duringImport: val == "yes" })}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="import-yes" />
                      <label htmlFor="import-yes" className="text-sm font-medium">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="import-no" />
                      <label htmlFor="import-no" className="text-sm font-medium">
                        No
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          </>
//  </div>
)}
{/* Liftgate Required (only for road mode) */}
{data.mode == "road" && (
  <div className="p-2 border border-border rounded-lg bg-card/50">
    <div className="grid grid-cols-3 gap-2 items-center">
      <Label className="col-span-1 flex items-center gap-2 text-sm">Liftgate Required</Label>
      <div className="col-span-2">
        <RadioGroup
          value={data.liftgate.required ? "yes" : "no"}
          onValueChange={(val) => setField("liftgate", { ...data.liftgate, required: val == "yes" })}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="liftgate-yes" />
            <label htmlFor="liftgate-yes" className="text-sm font-medium">Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="liftgate-no" />
            <label htmlFor="liftgate-no" className="text-sm font-medium">No</label>
          </div>
        </RadioGroup>
      </div>
    </div>

    <div className="mt-3 grid grid-cols-3 gap-2 items-center">
      <Label className="col-span-1 flex items-center gap-2 text-sm">
        Access Conditions
        <Info className="h-3 w-3 text-muted-foreground" />
      </Label>
      <div className="col-span-2">
        <Select
          value={data.accessConditions || ""}
          onValueChange={(val) => setField("accessConditions", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select access condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy access</SelectItem>
            <SelectItem value="limited">Limited access</SelectItem>
            <SelectItem value="difficult">Difficult access</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)}


        </div>
      </div>

      {/* Book Now Button Container - Always aligned with right column */}
      <div className={`mt-4 flex ${data.cargoType == "Perishable" && ["sea", "rail", "road"].includes(data.mode) ? 'md:w-1/2 md:ml-auto' : 'w-full'}`}>
        <div className="w-full flex justify-center py-2">
          <Button
            onClick={handleBookNow}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 rounded-lg shadow-sm hover:shadow transition-all duration-200"
            size="default"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>

      {/* Booking Confirmation Popup */}
      <BookingConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
        bookingData={data}
      />
    </div>
  );
}