import { useState, useRef } from "react"
import { TRANSPORT_MODES } from "@/constants/CompareOptionsFields"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShipmentStore } from "@/store/shipmentStore"
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

  // POL / POD labels come from locationLabels[mode] if available,
  // otherwise fallback to standard names
  const [polLabel, podLabel] = locationLabels[mode] || ["Port of Loading", "Port of Discharge"]

  // PLOR / PLOD full names — conditional on selected mode.
  // If mode exists, include the chosen POL/POD label in the description;
  // if not, show a standard full name.
  const plorLabel = mode
    ? `${polLabel} — Place/Return of Loading (PLOR)`
    : "Place of Loading (PLOR)"
  const plodLabel = mode
    ? `${podLabel} — Place/Return of Discharge (PLOD)`
    : "Place of Discharge (PLOD)"

  // Return an object of field errors. Empty object = valid
  const validateForm = () => {
    const errors = {}

    // Start with location validation first (POL/POD are always required)
    if (!data.pol) errors.pol = `Please enter a valid ${polLabel || 'POL'}.`
    if (!data.pod) errors.pod = `Please enter a valid ${podLabel || 'POD'}.`

    // Optional PLOR/PLOD/Pickup (only required if their checkboxes are checked)
    if (data.plorChecked && !data.plor) errors.plor = `Please enter a valid ${plorLabel}.`
    if (data.plodChecked && !data.plod) errors.plod = `Please enter a valid ${plodLabel}.`
    if (data.pickupChecked && !data.pickup) errors.pickup = "Please enter a valid Pickup location."

    // If location errors found, short-circuit (so user sees location errors first)
    if (Object.keys(errors).length > 0) return errors

    // Mode is optional now — do NOT require mode
    // But if mode is selected and it requires shipmentType, validate it
    if ((mode && mode !== "air" && mode !== "ecommerce") && !shipmentType) {
      errors.shipmentType = "Please select a shipment type."
      return errors
    }

    if (!cargoType) {
      errors.cargoType = "Please select a cargo type."
      return errors
    }

    // Commodity and gross weight required once cargo type is selected
    if (!data.commodity) {
      errors.commodity = "Please select a commodity."
    }
    if (!data.grossWeight) {
      errors.grossWeight = "Please enter gross weight."
    }

    // plor, plod, pickup re-check (kept, though we already did above)
    if (data.plorChecked && !data.plor) errors.plor = `Please enter a valid ${plorLabel}.`
    if (data.plodChecked && !data.plod) errors.plod = `Please enter a valid ${plodLabel}.`
    if (data.pickupChecked && !data.pickup) errors.pickup = "Please enter a valid Pickup location."

    return errors
  }



const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateForm();
  if (validationErrors && Object.keys(validationErrors).length) {
    setFieldErrors(validationErrors);
    return;
  }

  // Clear any previous errors
  setError("");
  setShowError(false);
  setFieldErrors({});

  // Check if popup is needed
  const requiresPopup = ["air", "ecommerce"].includes(data.mode);

  if (requiresPopup) {
    setShowSuccessPopup(true);
    return; // stop here, submission will continue after popup closes
  }

  // Normal submission for other modes
  completeSubmission();
};

// Function that handles the actual submission
const completeSubmission = () => {
  if (onFormComplete) onFormComplete();

  setTimeout(() => submitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);

  console.log("Form submitted with data:", data);
};





  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-3/4 space-y-10 bg-card p-8 rounded-2xl border shadow-xl">

        {/* Mode selector remains (unchanged behavior / placement can be kept below POL/POD) */}
        <div className="mode-section">
          {/* POL / POD: always visible */}
          <LocationSection
            data={data}
            setField={setField}
            labels={[polLabel, podLabel]}
            plorPlodLabels={[plorLabel, plodLabel]} // new prop to communicate full names to LocationSection
            errors={fieldErrors}
          />
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

     {/* Shipment Type section (same as before) */}
{mode && mode !== "air" && mode !== "ecommerce" && (
  <ShipmentTypeSection
    mode={mode}
    shipmentType={shipmentType}
    setField={setField}
    error={fieldErrors.shipmentType}
  />
)}

{/* Cargo Type section logic updated */}
{(
  // Case 1: normal behavior if mode selected
  (mode && (
    (mode === "air" || mode === "ecommerce") ||
    (mode !== "air" && mode !== "ecommerce" && shipmentType)
  ))
  // Case 2: NEW behavior — no mode, but POL & POD filled
  || (!mode && data.pol && data.pod)
) && (
  <CargoTypeSection
    cargoType={cargoType}
    pickupChecked={pickupChecked}
    setPickupChecked={setPickupChecked}
    data={data}
    setField={setField}
    errors={fieldErrors}
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
        { (data.mode || data.pol && data.pod)  && (
          <motion.section ref={submitRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="flex justify-center pt-8">
            <Button type="submit" size="lg" className="px-12 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              {hasSubmitted ? "Shipment Results" : "Shipment Request"}
            </Button>
          </motion.section>
          )} 
      </form>
      
{["air", "ecommerce"].includes(data.mode) && (
  <PopUp 
    showSuccessPopup={showSuccessPopup} 
    setShowSuccessPopup={(val) => {
      setShowSuccessPopup(val);
      if (!val) {
        // Popup closed — continue submission
        completeSubmission();
      }
    }} 
  />
)}

    </div>
  )
}
