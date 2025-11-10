import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Boxes, Container, Truck, Package } from "lucide-react"
import ContainerTypeSearchSelect from "./ContainerTypeSearchSelect"
import { useShipmentStore } from "@/store/shipmentStore"
export default function ShipmentTypeSection({ mode, shipmentType, setField, error, forwardedRef }) {
  const shipmentOptions = mode === "sea" || mode === "rail" ? ["FCL", "LCL"] : mode === "road" ? ["FCL", "FTL", "LTL"] : []
  const transition = { duration: 0.35, ease: "easeOut" }
  const { data } = useShipmentStore()
  return (
    <motion.section ref={forwardedRef} className="shipment-type-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
      <h2 className="text-2xl font-semibold text-center mb-4">Shipment Type</h2>
      {/**
       * Responsive layout:
       * - If there are exactly 2 options, render as a centered horizontal row for better balance.
       * - Otherwise use a responsive grid (1/2/3 cols) which keeps cards evenly sized.
       */}
      {(() => {
        const isTwo = shipmentOptions.length === 2
        return (
          <div className={`max-w-2xl mx-auto ${isTwo ? 'flex justify-center gap-6' : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
            {shipmentOptions.map(type => {
              const descriptions = {
                FCL: "Full Container Load",
                LCL: "Less than Container Load",
                FTL: "Full Truck Load",
                LTL: "Less than Truck Load"
              };
              const Icon = type === 'FCL' ? Container : type === 'LCL' ? Package : type === 'FTL' ? Truck : Package;
              return (
                <Button
                  key={type}
                  type="button"
                  aria-pressed={shipmentType === type}
                  variant={shipmentType === type ? "default" : "outline"}
                  className={`relative flex flex-col items-center text-center h-full gap-3 p-5 rounded-xl transition-all min-w-[180px] ${
                    shipmentType === type
                      ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary ring-offset-2"
                      : "bg-card hover:bg-accent hover:text-accent-foreground"
                  }`}
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
                  <Icon className="size-12 w-12 h-12 mb-1 flex-shrink-0" />
                  <div className="font-medium text-base">{type}</div>
                  <div className="text-sm opacity-90 max-w-[220px]">{descriptions[type]}</div>
                </Button>
              )
            })}
          </div>
        )
      })()}
      

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

      {(mode === "sea" || mode === "rail" || mode==="road") && shipmentType === "FCL" && (
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
