import React, { useMemo, useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Ship, Train, Truck, Plane, ShoppingCart, ArrowRightLeft, Package, AlertTriangle, Snowflake, Maximize, Droplets, Container, Boxes } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import LocationInput from "./LocationInput"
import ContainerTypeSearchSelect from "@/features/compareOptions/component/step1/ContainerTypeSearchSelect"
import TruckTypeSearchSelect from "@/features/compareOptions/component/step1/TruckTypeSearchSelect"
import CommoditySearchSelect from "./CommoditySearchSelect"


// Combined component: Mode + ShipmentType + CargoType + dependent fields
// Props expected to match your existing pattern so we don't change logic:
// { data, setField, errors = {}, forwardedRef }

export default function BookModeCargoShipmentForm({ data = {}, setField, errors = {}, forwardedRef }) {
  // --- options definition ---
  const modes = [
    { key: "sea", label: "Sea", icon: Ship, hasShipmentTypes: true, subtypes: ["FCL", "LCL"] },
    { key: "rail", label: "Rail", icon: Train, hasShipmentTypes: true, subtypes: ["FCL", "LCL"] },
    { key: "road", label: "Road", icon: Truck, hasShipmentTypes: true, subtypes: ["FTL", "FCL", "LTL"] },
    { key: "air", label: "Air", icon: Plane, hasShipmentTypes: false, subtypes: [] },
    { key: "ecommerce", label: "Ecommerce", icon: ShoppingCart, hasShipmentTypes: false, subtypes: [] },
    { key: "combined", label: "Combined Transport", icon: ArrowRightLeft, hasShipmentTypes: false, subtypes: [] },
  ]

  const shipmentCompositeOptions = useMemo(() => {
    // Produce the flat list: "Sea — FCL" or single "Air"
    const list = []
    modes.forEach((m) => {
      if (m.hasShipmentTypes && m.subtypes.length) {
        m.subtypes.forEach((st) => list.push({ mode: m.key, shipmentType: st, label: `${m.label} — ${st}`, icon: m.icon }))
      } else {
        list.push({ mode: m.key, shipmentType: "", label: m.label, icon: m.icon })
      }
    })
    return list
  }, [])

  // Cargo types (single-select pills)
  const cargoTypes = [
    { value: "General", label: "General", icon: Package },
    { value: "Hazardous", label: "Hazardous", icon: AlertTriangle },
    { value: "Perishable", label: "Perishable", icon: Snowflake },
    { value: "Oversized", label: "Oversized", icon: Maximize },
    { value: "Liquid", label: "Liquid", icon: Droplets }
  ]

  // --- local UI state ---
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [filtered, setFiltered] = useState(shipmentCompositeOptions)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!query) return setFiltered(shipmentCompositeOptions)
    const q = query.trim().toLowerCase()
    setFiltered(shipmentCompositeOptions.filter(o => o.label.toLowerCase().includes(q)))
  }, [query])

  // Helper to select an option
  const selectComposite = (opt) => {
    if (!opt) return
    setField("mode", opt.mode)
    setField("shipmentType", opt.shipmentType || "")

    // Clear dependent values to mimic previous behavior
    setField("cargoType", "")
    setField("containerType", "")
    setField("cargo", { ...(data.cargo || {}), truckType: data?.cargo?.truckType || "" })

    setOpen(false)
    setQuery("")
  }

  // Keyboard helpers
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Render helpers for labels used in PLOR/PLOD
  const modeLabels = {
    sea: { plor: "Place of Loading (Origin)", plod: "Place of Discharge (Destination)" },
    air: { plor: "Place of receipt", plod: "Place Of Delivery" },
    road: { plor: "Pickup Location", plod: "Delivery Location" },
    rail: { plor: "Rail Terminal of Loading", plod: "Rail Terminal of Destination" },
    ecommerce: { plor: "Warehouse / Fulfillment Center", plod: "Customer Delivery Location" }
  }

  const currentLabels = (data && modeLabels[data.mode]) || { plor: "Place of receipt", plod: "Place of delivery" }

  // Utility to display currently selected composite label
  const selectedCompositeLabel = useMemo(() => {
    if (!data?.mode) return "Select mode & shipment type"
    const found = shipmentCompositeOptions.find(o => o.mode === data.mode && (o.shipmentType === (data.shipmentType || "")))
    return found ? found.label : "(selected)"
  }, [data?.mode, data?.shipmentType])

  // --- interaction for cargo pills ---
  const onCargoSelect = (val) => {
    if (data?.cargoType === val) {
      setField("cargoType", "")
    } else {
      setField("cargoType", val)
    }
  }

  const transition = { duration: 0.28, ease: "easeOut" }

  return (
    <section ref={forwardedRef} className="space-y-6">
      {/* --- Combined searchable select --- */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center pt-4">Mode & Shipment</h2>

        <div className="relative mt-4">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => { setOpen(v => !v); setQuery(""); inputRef.current?.focus() }}
            className="w-full text-left border-2 rounded-lg p-3 flex items-center justify-between gap-3 bg-card hover:shadow-sm"
          >
            <span className="text-sm text-foreground/80">{selectedCompositeLabel}</span>
            <span className="text-xs opacity-70">Search…</span>
          </button>

          <div className={`absolute left-0 right-0 mt-2 z-40 ${open ? "block" : "hidden"}`}>
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="bg-popover border rounded-lg shadow-lg">
              <div className="p-3">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search mode or shipment type — e.g. sea fcl, road ftl"
                  className="w-full px-3 py-2 rounded-md border focus:outline-none"
                />
              </div>

              <div className="max-h-56 overflow-auto">
                {filtered.length === 0 && (
                  <div className="p-3 text-sm text-muted-foreground">No matches</div>
                )}

                {filtered.map((o) => {
                  const Icon = o.icon
                  const active = data?.mode === o.mode && (data?.shipmentType || "") === (o.shipmentType || "")
                  return (
                    <button
                      key={`${o.mode}-${o.shipmentType}`}
                      onClick={() => selectComposite(o)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-accent/40 ${active ? "bg-primary/10" : ""}`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{o.label}</div>
                        <div className="text-xs opacity-80">{o.shipmentType ? `${o.shipmentType} — ${o.mode.toUpperCase()}` : `${o.mode.toUpperCase()}`}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* show error if present for mode/shipmentType */}
        {(errors.mode || errors.shipmentType) && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm text-center mt-2" role="alert">
            {errors.mode || errors.shipmentType}
          </motion.p>
        )}
      </div>

      {/* --- Cargo type pills (single-select) --- */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="max-w-3xl mx-auto">
        <h3 className="text-lg font-medium text-center">Cargo Type</h3>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center">
          {cargoTypes.map((c) => {
            const Icon = c.icon
            const active = data?.cargoType === c.value
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onCargoSelect(c.value)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors min-h-[64px] ${active ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card hover:bg-accent"}`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-sm font-medium">{c.label}</div>
              </button>
            )
          })}
        </div>

        {errors.cargoType && <p className="text-destructive text-sm mt-2 text-center">{errors.cargoType}</p>}
      </motion.div>

      {/* --- PLOR & PLOD (hide for combined) --- */}
      {data && data.mode !== "combined" && (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-6">
          {["plor", "plod"].map((field) => {
            const checked = data[`${field}Checked`] || false
            const label = currentLabels[field]
            return (
              <div key={field} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={field}
                    checked={checked}
                    onCheckedChange={(val) => {
                      setField(`${field}Checked`, val)
                      if (!val) setField(field, "")
                    }}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={field} className="font-medium text-sm">{label}</Label>
                </div>

                {checked && (
                  <LocationInput
                    id={field}
                    value={data[field] || ""}
                    onChange={(v) => setField(field, v)}
                    placeholder={`Enter ${label}`}
                    error={errors[field]}
                    mode={data.mode}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* --- Shipment-specific settings (container / truck / pickup / return) --- */}
      {(data.mode === "sea" || data.mode === "rail" || data.mode === "road") && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="max-w-4xl mx-auto mt-6 space-y-4">
          {/* container type shown when shipmentType === FCL */}
          {data.shipmentType === "FCL" && (
            <div>
              <ContainerTypeSearchSelect
                label="Container Type"
                value={data.containerType || ""}
                onChange={(v) => setField("containerType", v)}
                placeholder="Search container types"
              />
            </div>
          )}

          {/* truck type for road FTL/LTL */}
          {data.mode === "road" && (data.shipmentType === "FTL" || data.shipmentType === "LTL") && (
            <div>
              <TruckTypeSearchSelect
                label="Truck Type"
                value={data.cargo?.truckType || ""}
                onChange={(v) => setField("cargo", { ...data.cargo, truckType: v })}
                placeholder="Search truck types"
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-accent/30 p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Checkbox
                  id="pickup-inline"
                  checked={!!data.pickupChecked || !!data.plorChecked}
                  onCheckedChange={(val) => setField("pickupChecked", val)}
                  disabled={!!data.plorChecked}
                  className="w-5 h-5"
                />
                <Label htmlFor="pickup-inline" className="font-medium">Add Pickup Location</Label>
              </div>
              {(data.pickupChecked || data.plorChecked) && (
                <LocationInput
                  id="pickupLocation-inline"
                  label="Pickup Location"
                  value={data.pickupLocation || ""}
                  onChange={(v) => setField("pickupLocation", v)}
                  placeholder="Enter pickup location"
                />
              )}
            </div>
            <div className="bg-accent/30 p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Checkbox
                  id="return-inline"
                  checked={!!data.returnChecked || !!data.plodChecked}
                  onCheckedChange={(val) => setField("returnChecked", val)}
                  disabled={!!data.plodChecked}
                  className="w-5 h-5"
                />
                <Label htmlFor="return-inline" className="font-medium">Add Return Location</Label>
              </div>
              {(data.returnChecked || data.plodChecked) && (
                <LocationInput
                  id="returnLocation-inline"
                  label="Return Location"
                  value={data.returnLocation || ""}
                  onChange={(v) => setField("returnLocation", v)}
                  placeholder="Enter return location"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* --- Commodity & Weight (cargo details) --- */}
      {data.cargoType && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="max-w-4xl mx-auto mt-6 border-t pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div id="commodity" className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Commodity</Label>
              <CommoditySearchSelect value={data.commodity || ""} onChange={v => setField("commodity", v)} placeholder="Search commodities" />
              {errors.commodity && <p className="text-destructive text-sm mt-1" role="alert">{errors.commodity}</p>}
            </div>
            <div id="grossWeight" className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Gross Weight (kg)</Label>
              <Input type="number" value={data.grossWeight || ""} onChange={e => setField("grossWeight", e.target.value)} placeholder="Enter weight" className="w-full h-11 border-2 focus:border-primary rounded-md" />
              {errors.grossWeight && <p className="text-destructive text-sm mt-1" role="alert">{errors.grossWeight}</p>}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
