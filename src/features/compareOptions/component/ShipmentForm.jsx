import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useShipmentStore } from "../../../store/shipmentStore"
import { locationLabels } from "../utils/modeLabels"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ShipmentForm() {
  const { data, setField } = useShipmentStore()
  const { mode, shipmentType, cargoType } = data
  const [pickupChecked, setPickupChecked] = useState(false)

  const modes = ["sea", "rail", "road", "air", "ecommerce"]

  const shipmentOptions =
    mode === "sea" || mode === "rail"
      ? ["FCL", "LCL"]
      : mode === "road"
      ? ["FCL", "FTL", "LTL"]
      : []

  const [polLabel, podLabel] = locationLabels[mode] || []

  const requiresPackageType =
    mode === "air" ||
    mode === "ecommerce" ||
    shipmentType === "LCL" ||
    mode === "road"

  const requiresWidth = mode === "air" || mode === "road"

  const showLengthHeight = requiresWidth
  const showPackageExtras = requiresPackageType

  const transition = { duration: 0.35, ease: "easeOut" }

  return (
    <form className="space-y-10 max-w-3xl mx-auto bg-card p-8 rounded-lg border shadow-sm overflow-hidden">
      <section>
        <h2 className="text-lg font-semibold mb-3">Mode of Transport</h2>
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <Button
            key={m}
            type="button"
            variant={mode === m ? "default" : "outline"}
            onClick={() => {
              if (mode === m) {
                // If user clicks the same selected mode, reset the form
                setField("mode", "")
                setField("shipmentType", "")
                setField("plor", "")
                setField("plod", "")
                setField("pol", "")
                setField("pod", "")
                setField("cargoType", "")
                setField("commodity", "")
                setField("grossWeight", "")
                setField("pickupLocation", "")
              } else {
                setField("mode", m)
              }
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </Button>
          
          ))}
        </div>
      </section>

      {mode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="space-y-8"
        >
          <section>
            <h2 className="text-lg font-semibold mb-3">Shipment Type</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {shipmentOptions.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={shipmentType === type ? "default" : "outline"}
                  onClick={() => setField("shipmentType", type)}
                >
                  {type}
                </Button>
              ))}
            </div>

            {mode === "sea" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>
                <Label htmlFor="containerType">Container Type</Label>
                <Input
                  id="containerType"
                  className="w-full md:w-[260px]"
                  placeholder="Enter container type"
                  value={data.containerType || ""}
                  onChange={(e) => setField("containerType", e.target.value)}
                />
              </motion.div>
            )}

            {mode === "road" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="accessCondition">Access Condition</Label>
                  <Input
                    id="accessCondition"
                    className="w-full md:w-[260px]"
                    placeholder="Enter access condition"
                    value={data.accessCondition || ""}
                    onChange={(e) => setField("accessCondition", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="liftage"
                    checked={data.liftageRequired || false}
                    onCheckedChange={(v) => setField("liftageRequired", !!v)}
                  />
                  <Label htmlFor="liftage">Liftage Required</Label>
                </div>
              </motion.div>
            )}

            {requiresPackageType && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>
                <Label htmlFor="packageType">Package Type</Label>
                <Input
                  id="packageType"
                  className="w-full md:w-[260px]"
                  placeholder="Enter package type"
                  value={data.packageType || ""}
                  onChange={(e) => setField("packageType", e.target.value)}
                />
              </motion.div>
            )}

            {showPackageExtras && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition}
                className="grid md:grid-cols-2 gap-4 mt-3"
              >
                <div className="space-y-1">
                  <Label>Number of Packages</Label>
                  <Input
                    type="number"
                    className="w-full md:w-[260px]"
                    value={data.packageCount || ""}
                    onChange={(e) => setField("packageCount", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Volume (m³)</Label>
                  <Input
                    type="number"
                    className="w-full md:w-[260px]"
                    value={data.volume || ""}
                    onChange={(e) => setField("volume", e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {requiresWidth && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>
                <Label>Width</Label>
                <Input
                  type="number"
                  className="w-full md:w-[260px]"
                  value={data.width || ""}
                  onChange={(e) => setField("width", e.target.value)}
                />
              </motion.div>
            )}

            {showLengthHeight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition}
                className="grid md:grid-cols-3 gap-4 mt-3"
              >
                <div className="space-y-1">
                  <Label>Length</Label>
                  <Input
                    type="number"
                    className="w-full md:w-[260px]"
                    value={data.length || ""}
                    onChange={(e) => setField("length", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    className="w-full md:w-[260px]"
                    value={data.height || ""}
                    onChange={(e) => setField("height", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Unit</Label>
                  <Select
                    value={data.unit || ""}
                    onValueChange={(v) => setField("unit", v)}
                  >
                    <SelectTrigger className="w-full md:w-[260px]">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="inch">Inch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <h2 className="text-lg font-semibold mb-3">Locations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{polLabel}</Label>
                <Input
                  className="w-full md:w-[260px]"
                  value={data.pol || ""}
                  onChange={(e) => setField("pol", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>{podLabel}</Label>
                <Input
                  className="w-full md:w-[260px]"
                  value={data.pod || ""}
                  onChange={(e) => setField("pod", e.target.value)}
                />
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <h2 className="text-lg font-semibold mb-3">PLOR / PLOD</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>PLOR</Label>
                <Select
                  value={data.plor || ""}
                  onValueChange={(v) => setField("plor", v)}
                >
                  <SelectTrigger className="w-full md:w-[260px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>PLOD</Label>
                <Select
                  value={data.plod || ""}
                  onValueChange={(v) => setField("plod", v)}
                >
                  <SelectTrigger className="w-full md:w-[260px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <h2 className="text-lg font-semibold mb-3">Cargo Type</h2>
            <RadioGroup
              value={cargoType || ""}
              onValueChange={(v) => setField("cargoType", v)}
              className="flex flex-col gap-2"
            >
              {["General", "Hazardous", "Refrigerated"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem id={type} value={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>

            {cargoType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="mt-6 space-y-6 border-t pt-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Commodity</Label>
                    <Select
                      value={data.commodity || ""}
                      onValueChange={(v) => setField("commodity", v)}
                    >
                      <SelectTrigger className="w-full md:w-[260px]">
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Gross Weight (kg)</Label>
                    <Input
                      type="number"
                      className="w-full md:w-[260px]"
                      placeholder="Enter weight"
                      value={data.grossWeight || ""}
                      onChange={(e) => setField("grossWeight", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="pickup"
                    checked={pickupChecked}
                    onCheckedChange={(checked) => setPickupChecked(!!checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="pickup">Pickup Required</Label>
                    <Input
                      disabled={!pickupChecked}
                      placeholder="Enter pickup location"
                      className="mt-2 w-full md:w-[260px]"
                      value={data.pickupLocation || ""}
                      onChange={(e) => setField("pickupLocation", e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        </motion.div>
      )}
    </form>
  )
}
