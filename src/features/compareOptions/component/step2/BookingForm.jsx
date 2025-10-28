import React, { useState } from "react";
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

export default function BookingForm() {
  const { data, setField } = useShipmentStore();

  const [newBeforeETA, setNewBeforeETA] = useState({ day: "", temperature: "" });
  const [newAfterGateIn, setNewAfterGateIn] = useState({ day: "", temperature: "" });
  const [activeScheduleTab, setActiveScheduleTab] = useState("beforeEta");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

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
    console.log("Booking data:", data);
    setShowConfirmationPopup(true);
  };

  const FormField = ({ label, children, info = false }) => (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        {label}
        {info && <Info className="h-3 w-3" />}
      </Label>
      {children}
    </div>
  );

  const Section = ({ title, children, className = "" }) => (
    <div className={`p-4 rounded-lg border border-border/50 bg-card/30 space-y-3 ${className}`}>
      {title && <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>}
      {children}
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="border-b border-border/50 pb-3">
        <h3 className="text-lg font-semibold text-foreground">Booking Details</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Configure your shipment settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cargo Details */}
        <Section title="Cargo Information">
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

        {/* Perishable Settings */}
        {data.cargoType == "Perishable" && ["sea", "rail", "road", "air"].includes(data.mode) && (
          <Section title="Temperature Control">
            {["sea", "rail", "road"].includes(data.mode) && (
              <>
                <FormField label="Cold Treatment Required" info>
                  <RadioGroup
                    value={data.coldTreatment.required ? "yes" : "no"}
                    onValueChange={(val) => setField("coldTreatment", { ...data.coldTreatment, required: val == "yes" })}
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
                    onChange={(e) => setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })}
                    className="h-9 max-w-xs"
                    placeholder="e.g. -18"
                  />
                </FormField>

                <FormField label="Temperature Set Points" info>
                  <ToggleGroup
                    type="single"
                    value={data.temperatureSchedule?.enabled ? "yes" : "no"}
                    onValueChange={(val) => setField("temperatureSchedule", { ...data.temperatureSchedule, enabled: val == "yes" })}
                    variant="outline"
                    className="justify-start"
                  >
                    <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                      Yes
                    </ToggleGroupItem>
                    <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                      No
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormField>

                {data.temperatureSchedule?.enabled && (
                  <div className="border rounded-lg p-3 bg-muted/30 space-y-3">
                    <ToggleGroup
                      type="single"
                      value={activeScheduleTab}
                      onValueChange={(val) => setActiveScheduleTab(val || "beforeEta")}
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
                            onChange={(e) => setNewBeforeETA({ ...newBeforeETA, day: e.target.value })}
                            placeholder="Day"
                            className="w-20 h-8"
                          />
                          <Input
                            value={newBeforeETA.temperature}
                            onChange={(e) => setNewBeforeETA({ ...newBeforeETA, temperature: e.target.value })}
                            placeholder="Temp"
                            className="flex-1 h-8"
                          />
                          <Button size="sm" onClick={addBeforeETA} disabled={!newBeforeETA.day || !newBeforeETA.temperature} className="h-8 w-8 p-0">
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
                            onChange={(e) => setNewAfterGateIn({ ...newAfterGateIn, day: e.target.value })}
                            placeholder="Day"
                            className="w-20 h-8"
                          />
                          <Input
                            value={newAfterGateIn.temperature}
                            onChange={(e) => setNewAfterGateIn({ ...newAfterGateIn, temperature: e.target.value })}
                            placeholder="Temp"
                            className="flex-1 h-8"
                          />
                          <Button size="sm" onClick={addAfterGateIn} disabled={!newAfterGateIn.day || !newAfterGateIn.temperature} className="h-8 w-8 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-3 border-t">
                  <FormField label="Humidity Control" info>
                    <ToggleGroup
                      type="single"
                      value={data.humidity.required ? "yes" : "no"}
                      onValueChange={(val) => setField("humidity", { ...data.humidity, required: val == "yes" })}
                      variant="outline"
                      className="justify-start"
                    >
                      <ToggleGroupItem value="yes" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        Yes
                      </ToggleGroupItem>
                      <ToggleGroupItem value="no" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        No
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormField>
                  <FormField label="Humidity (%)" info>
                    <Input
                      value={data.humidity.percentage}
                      onChange={(e) => setField("humidity", { ...data.humidity, percentage: e.target.value })}
                      className="h-9 max-w-xs"
                      placeholder="e.g. 85"
                    />
                  </FormField>
                </div>

                <div className="pt-3 border-t space-y-3">
                  <FormField label=" Number Of Cargo Probes" info>
                    <Input
                      type="number"
                      value={data.probes.numberOfCargoProbes}
                      onChange={(e) => setField("probes", { ...data.probes, numberOfCargoProbes: e.target.value })}
                      className="h-9 max-w-xs"
                      placeholder="Number"
                    />
                  </FormField>

                  <FormField label="Drain Holes" info>
                    <RadioGroup
                      value={data.probes.drainHoles ? "open" : "closed"}
                      onValueChange={(val) => setField("probes", { ...data.probes, drainHoles: val == "open" })}
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
                      <ToggleGroupItem value="open" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        Open
                      </ToggleGroupItem>
                      <ToggleGroupItem value="close" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        Close
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormField>

                  <FormField label="Ventilation Volume" info>
                    <Input
                      value={data.probes.ventilationVolume}
                      onChange={(e) => setField("probes", { ...data.probes, ventilationVolume: e.target.value })}
                      className="h-9 max-w-xs"
                      placeholder="Volume"
                    />
                  </FormField>
                </div>

                <div className="pt-3 border-t">
                  <FormField label="Genset" info>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">During Export</Label>
                        <RadioGroup
                          value={data.genset.duringExport ? "yes" : "no"}
                          onValueChange={(val) => setField("genset", { ...data.genset, duringExport: val == "yes" })}
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
                          onValueChange={(val) => setField("genset", { ...data.genset, duringImport: val == "yes" })}
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
                  onChange={(e) => setField("coldTreatment", { ...data.coldTreatment, temperature: e.target.value })}
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
          </Section>
        )}

        {/* Add-ons Section */}
        <Section title="Additional Services" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="insurance"
                checked={data.addons?.insurance || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, insurance: checked })}
              />
              <div className="flex-1">
                <label htmlFor="insurance" className="text-sm font-medium cursor-pointer">Cargo Insurance</label>
                <p className="text-xs text-muted-foreground mt-0.5">Comprehensive coverage for your shipment</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="tracking"
                checked={data.addons?.tracking || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, tracking: checked })}
              />
              <div className="flex-1">
                <label htmlFor="tracking" className="text-sm font-medium cursor-pointer">Real-time Tracking</label>
                <p className="text-xs text-muted-foreground mt-0.5">GPS tracking with alerts</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="priority"
                checked={data.addons?.priority || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, priority: checked })}
              />
              <div className="flex-1">
                <label htmlFor="priority" className="text-sm font-medium cursor-pointer">Priority Handling</label>
                <p className="text-xs text-muted-foreground mt-0.5">Expedited processing and delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="customs"
                checked={data.addons?.customs || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, customs: checked })}
              />
              <div className="flex-1">
                <label htmlFor="customs" className="text-sm font-medium cursor-pointer">Customs Clearance</label>
                <p className="text-xs text-muted-foreground mt-0.5">Full customs documentation service</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="packaging"
                checked={data.addons?.packaging || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, packaging: checked })}
              />
              <div className="flex-1">
                <label htmlFor="packaging" className="text-sm font-medium cursor-pointer">Professional Packaging</label>
                <p className="text-xs text-muted-foreground mt-0.5">Expert packing and crating services</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <Checkbox
                id="storage"
                checked={data.addons?.storage || false}
                onCheckedChange={(checked) => setField("addons", { ...data.addons, storage: checked })}
              />
              <div className="flex-1">
                <label htmlFor="storage" className="text-sm font-medium cursor-pointer">Warehouse Storage</label>
                <p className="text-xs text-muted-foreground mt-0.5">Secure storage facilities available</p>
              </div>
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
          <CheckCircle className="mr-2 h-4 w-4" />
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