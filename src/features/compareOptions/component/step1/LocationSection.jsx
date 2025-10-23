import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import LocationInput from "./LocationInput"

export default function LocationSection({ data, setField, labels, errors = {} }) {
  const [polLabel, podLabel] = labels
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <h2 className="text-2xl font-semibold text-center">Locations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <LocationInput id="pol" label={polLabel} value={data.pol || ""} onChange={v => setField("pol", v)} placeholder={`Enter ${polLabel}`} error={errors.pol} />
        <LocationInput id="pod" label={podLabel} value={data.pod || ""} onChange={v => setField("pod", v)} placeholder={`Enter ${podLabel}`} error={errors.pod} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {["plor", "plod"].map(field => {
          const checked = data[`${field}Checked`] || false
          return (
            <div key={field} className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox id={field} checked={checked} onCheckedChange={val => {
                  setField(`${field}Checked`, val)
                  if (!val) setField(field, "")
                }} className="w-5 h-5" />
                <Label htmlFor={field} className="font-medium">{field.toUpperCase()}</Label>
              </div>
              {checked && <LocationInput id={field} value={data[field] || ""} onChange={v => setField(field, v)} placeholder={`Enter ${field.toUpperCase()}`} error={errors[field]} />}
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
