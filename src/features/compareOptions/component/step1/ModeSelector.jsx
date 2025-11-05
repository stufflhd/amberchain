import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Ship, Train, Truck, Plane, ShoppingCart, ArrowRightLeft } from "lucide-react"

export default function ModeSelector({ mode, setField }) {
  const modes = ["sea", "rail", "road", "air", "ecommerce", "combined"]
  const modeIcons = { 
    sea: Ship, 
    rail: Train, 
    road: Truck, 
    air: Plane, 
    ecommerce: ShoppingCart,
    combined: ArrowRightLeft
  }
  const disabledModes = ["combined"]

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-center pt-8 ">Mode of Transport</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 -mx-2 px-2 pt-4">
        {modes.map(m => {
          const Icon = modeIcons[m]
          const active = mode === m
          return (
            <motion.div key={m} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
              className="flex-1 min-w-[140px] md:min-w-[160px]">
              <Card 
                className={`transition-all duration-300 border-2 ${
                  disabledModes.includes(m) 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer " + (active 
                      ? "border-primary bg-primary text-primary-foreground shadow-md" 
                      : "hover:border-primary hover:bg-accent hover:text-accent-foreground")
                }`}
                onClick={() => {
                  if (disabledModes.includes(m)) return;
                  if (active) {
                    setField("mode", "")
                    setField("shipmentType", "")
                    setField("cargoType", "")
                  } else {
                    setField("mode", m)
                    setField("shipmentType", "")
                    setField("cargoType", "")
                  }
                }}
              >
                <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                  <Icon className="w-10 h-10" />
                  <span className="capitalize font-medium">{m}</span>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}  