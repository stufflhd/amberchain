import { motion } from "framer-motion"
import { Package, AlertTriangle, Snowflake, Maximize, Droplets } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import LocationInput from "./LocationInput"
import CommoditySearchSelect from "./CommoditySearchSelect"
import { Input } from "@/components/ui/input"

export default function CargoTypeSection({ cargoType, pickupChecked, setPickupChecked, data, setField, errors = {} }) {
  const allCargoTypes = [
    { value: "General", label: "General", icon: Package },
    { value: "Hazardous", label: "Hazardous", icon: AlertTriangle },
    { value: "Perishable", label: "Perishable", icon: Snowflake },
    { value: "Oversized", label: "Oversized", icon: Maximize },
    { value: "Liquid", label: "Liquid", icon: Droplets }
  ]
   const cargoTypes = data.mode === "air"
    ? allCargoTypes.filter(c => c.value !== "Oversized")
    : allCargoTypes
    
  const transition = { duration: 0.35, ease: "easeOut" }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="cargo-type-section space-y-5">
      <h2 className="text-2xl font-semibold text-center">Cargo Type</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {cargoTypes.map(c => {
          const Icon = c.icon
          const active = cargoType === c.value
          return (
            <motion.div key={c.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setField("cargoType", c.value)}
              className={`cursor-pointer flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 w-[140px] ${active ? "bg-primary text-primary-foreground border-primary shadow-md" : "hover:border-primary hover:bg-accent hover:text-accent-foreground"}`}
            >
              <Icon className="w-10 h-10 mb-2" />
              <span className="font-medium">{c.label}</span>
            </motion.div>
          )
        })}
      </div>

      {errors.cargoType && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm text-center mt-2"
          role="alert"
        >
          {errors.cargoType}
        </motion.p>
      )}

      {cargoType && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mt-6 border-t pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div id="commodity">
              <CommoditySearchSelect label="Commodity" value={data.commodity || ""} onChange={v => setField("commodity", v)} placeholder="Search commodities" />
              {errors.commodity && (
                <p className="text-destructive text-sm mt-1" role="alert">{errors.commodity}</p>
              )}
            </div>
            <div id="grossWeight" className="space-y-2">
              <Label>Gross Weight (kg)</Label>
              <Input type="number" value={data.grossWeight || ""} onChange={e => setField("grossWeight", e.target.value)} placeholder="Enter weight" className="w-full h-11 border-2 focus:border-primary rounded-md" />
              {errors.grossWeight && (
                <p className="text-destructive text-sm mt-1" role="alert">{errors.grossWeight}</p>
              )}
            </div>
          </div>

          <div className="bg-accent/50 p-6 rounded-lg border-2 border-accent shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Checkbox 
                id="pickup" 
                checked={pickupChecked} 
                onCheckedChange={setPickupChecked} 
                className="w-6 h-6"
              />
              <Label htmlFor="pickup" className="text-lg font-semibold">Add Pickup Location</Label>
            </div>
            {pickupChecked && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <LocationInput 
                  value={data.pickupLocation || ""} 
                  onChange={v => setField("pickupLocation", v)} 
                  placeholder="Enter pickup location"
                  className="bg-background"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}