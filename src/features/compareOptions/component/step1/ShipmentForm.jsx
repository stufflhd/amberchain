import { useState, useRef } from "react"
import { TRANSPORT_MODES } from "@/constants/CompareOptionsFields"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShipmentStore } from "../../../../store/shipmentStore"
import { locationLabels } from "../../utils/modeLabels"
import ModeSelector from "./ModeSelector"
import LocationSection from "./LocationSection"
import ShipmentTypeSection from "./ShipmentTypeSection"
import CargoTypeSection from "./CargoTypeSection"


import { AnimatePresence, motion as m } from "framer-motion"
import PopUp from "./PopUp"

export default function ShipmentForm({ onFormComplete }) {

  const { data, setField } = useShipmentStore()
  const { mode, shipmentType, cargoType } = data
  const [pickupChecked, setPickupChecked] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const shipmentTypeRef = useRef(null)
  const locationsRef = useRef(null)
  const cargoTypeRef = useRef(null)
  const submitRef = useRef(null)
  const transition = { duration: 0.35, ease: "easeOut" }
  const [polLabel, podLabel] = locationLabels[mode] || []

  // Return an object of field errors. Empty object = valid
  const validateForm = () => {
    const errors = {}

    // Start with location validation first
    if (!data.pol) errors.pol = `Please enter a valid ${polLabel || 'POL'}.`
    if (!data.pod) errors.pod = `Please enter a valid ${podLabel || 'POD'}.`

    // Check optional locations if their checkboxes are checked
    if (data.plorChecked && !data.plor) errors.plor = "Please enter a valid PLOR."
    if (data.plodChecked && !data.plod) errors.plod = "Please enter a valid PLOD."
    if (data.pickupChecked && !data.pickup) errors.pickup = "Please enter a valid Pickup location."

    // Only proceed with other validations if locations are valid
    if (Object.keys(errors).length > 0) return errors

    // Then check mode and types
    if (!mode) {
      errors.mode = "Please select a shipment mode."
      return errors
    }

    if ((mode !== "air" && mode !== "ecommerce") && !shipmentType) {
      errors.shipmentType = "Please select a shipment type."
      return errors
    }

    if (!cargoType) {
      errors.cargoType = "Please select a cargo type."
      return errors
    }

    // plor, plod, pickup are optional, but if their checkbox is checked, value is required
    if (data.plorChecked && !data.plor) errors.plor = "Please enter a valid PLOR."
    if (data.plodChecked && !data.plod) errors.plod = "Please enter a valid PLOD."
    if (data.pickupChecked && !data.pickup) errors.pickup = "Please enter a valid Pickup location."

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (validationErrors && Object.keys(validationErrors).length) {
      // If there's a general error, keep the top banner
      if (validationErrors._general) {
        setError(validationErrors._general)
        setShowError(true)
        setFieldErrors({})
        setTimeout(() => setShowError(false), 2200)
        return
      }

      setFieldErrors(validationErrors)
      // Enhanced scroll handling for all field types
      const order = [
        "pol", "pod", "plor", "plod", "pickup", // Location fields first
        "mode", "shipmentType", "cargoType"      // Then mode and types
      ]
      const firstInvalid = order.find(k => validationErrors[k])
      if (firstInvalid) {
        const scrollToElement = (selector) => {
          const el = document.querySelector(selector)
          if (el) {
            // Use a larger timeout to ensure DOM is ready
            setTimeout(() => {
              const yOffset = -100; // Adjust this value to control final scroll position
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
              // Try to focus if it's an input
              el.querySelector('input')?.focus()
            }, 100)
          }
        }

        // Map field names to their container selectors
        const selectorMap = {
          pol: '#pol',
          pod: '#pod',
          plor: '#plor',
          plod: '#plod',
          pickup: '#pickup',
          mode: '.mode-section',
          shipmentType: '.shipment-type-section',
          cargoType: '.cargo-type-section'
        }

        scrollToElement(selectorMap[firstInvalid])
      }
      return
    }
    setError("")
    setShowError(false)
    setFieldErrors({})
    if (!hasSubmitted) {
      setShowSuccessPopup(true)
      setHasSubmitted(true)
    } else {
      if (onFormComplete) onFormComplete()
    }
    setTimeout(() => submitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)

    console.log("Form submitted with data:", data)
  }
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-3/4 space-y-10 bg-card p-8 rounded-2xl border shadow-xl">
        <div className="mode-section">
          <ModeSelector mode={mode} setField={setField} />
          {fieldErrors.mode && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-destructive text-sm text-center mt-2" 
              role="alert"
            >
              {fieldErrors.mode}
            </motion.p>
          )}
        </div>
        
        {mode && <LocationSection data={data} setField={setField} labels={[polLabel, podLabel]} errors={fieldErrors} />}
        
        {mode && mode !== "air" && mode !== "ecommerce" && (
          <ShipmentTypeSection
            mode={mode}
            shipmentType={shipmentType}
            setField={setField}
            error={fieldErrors.shipmentType}
          />
        )}
        
        {((mode !== "air" && mode !== "ecommerce" && shipmentType) || mode === "air" || mode === "ecommerce") && (
          <CargoTypeSection
            cargoType={cargoType}
            pickupChecked={pickupChecked}
            setPickupChecked={setPickupChecked}
            data={data}
            setField={setField}
            error={fieldErrors.cargoType}
          />
        )}
        <AnimatePresence>
          {showError && error && (
            <m.div
              key="form-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-destructive font-semibold text-center mb-2"
              style={{ minHeight: 24 }}
            >
              {error}
            </m.div>
          )}
        </AnimatePresence>
        {mode && (
          <motion.section ref={submitRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="flex justify-center pt-8">
            <Button type="submit" size="lg" className="px-12 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle className="w-6 h-6 mr-3" />
              {hasSubmitted ? "Compare Shipment Options" : "Submit Shipment Request"}
            </Button>
          </motion.section>
        )}
      </form>
      <PopUp showSuccessPopup={showSuccessPopup} setShowSuccessPopup={setShowSuccessPopup} />
    </div>
  )
}
