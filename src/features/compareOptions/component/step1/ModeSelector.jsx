import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Ship, Train, Truck, Plane, ShoppingCart } from "lucide-react"

export default function ModeSelector({ mode, setField }) {
  const modes = ["sea", "rail", "road", "air", "ecommerce"]
  const modeIcons = { sea: Ship, rail: Train, road: Truck, air: Plane, ecommerce: ShoppingCart }

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-center">Mode of Transport</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {modes.map(m => {
          const Icon = modeIcons[m]
          const active = mode === m
          return (
            <motion.div key={m} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Card className={`cursor-pointer transition-all duration-300 border-2 ${active ? "border-primary bg-primary text-primary-foreground shadow-md" : "hover:border-primary hover:bg-accent hover:text-accent-foreground"}`}
                onClick={() => {
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
