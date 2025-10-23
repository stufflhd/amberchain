import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Boxes } from "lucide-react"
import ContainerTypeSearchSelect from "./ContainerTypeSearchSelect"
import { useShipmentStore } from "../../../../store/shipmentStore"
export default function ShipmentTypeSection({ mode, shipmentType, setField, error }) {
  const shipmentOptions = mode === "sea" || mode === "rail" ? ["FCL", "LCL"] : mode === "road" ? ["FCL", "FTL", "LTL"] : []
  const transition = { duration: 0.35, ease: "easeOut" }
  const { data } = useShipmentStore()
  return (
    <motion.section className="shipment-type-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
      <h2 className="text-2xl font-semibold text-center mb-4">Shipment Type</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {shipmentOptions.map(type => (
          <Button key={type} type="button"
            variant={shipmentType === type ? "default" : "outline"}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl text-lg transition-all ${shipmentType === type ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-accent hover:text-accent-foreground"}`}
            onClick={() => {
              if (shipmentType === type) {
                setField("shipmentType", "")
                setField("cargoType", "")
              } else {
                setField("shipmentType", type)
                setField("cargoType", "")
              }
            }}
          >
            <Boxes className="w-6 h-6" />
            {type}
          </Button>
        ))}
      </div>

      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-destructive text-sm text-center mt-2" 
          role="alert"
        >
          {error}
        </motion.p>
      )}

      {(mode === "sea" || mode === "rail") && shipmentType === "FCL" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition} className="mt-6">
           <ContainerTypeSearchSelect
                label="Container Type"
                value={data.containerType || ""}
                onChange={v => setField("containerType", v)}
                placeholder="Search container types"
            />
  </motion.div>
      )}
    </motion.section>
  )
}
