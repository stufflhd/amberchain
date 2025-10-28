import { create } from "zustand"

export const useShipmentStore = create((set) => ({
  data: {
    mode: "",
    shipmentType: "",
    containerType: "",
   data: {
    pol: "",
    pod: "",
    origin: null,
    destination: null,
  },

    plorChecked: false,
    plor: "",
    plodChecked: false,
    plod: "",
    cargoType: "",
    commodity: "",
    grossWeight: "",
    pickupLocation: "",
    // Wizard form data
    wizardSelection: {
      mainCategory: "",
      subCategory: "",
    },
    setWizardSelection: (selection) => set((state) => ({
      data: {
        ...state.data,
        wizardSelection: selection
      }
    })),
    coldTreatment: {
    required: false, // yes/no
      temperature: "", // <— add this line

    temperatureSetPoints: [], // array of numbers if multiple set points
    multipleSetPoints: false, // yes/no
    },
    probes: {
      numberOfCargoProbes: 0,
      drainHoles: false,
      freshAirExchange: "open", // open/close
      ventilationVolume: "", // input number
    },
    humidity: {
      required: false,
      percentage: "",
    },
    genset: {
      duringExport: false, // yes/no
      duringImport: false, // yes/no
    },
    temperatureSchedule: {
      daysBeforeETA: [], // array of { day: 1, temperature: 5 } objects
      daysAfterGateIn: [], // same structure
    },
    cargo: {
      class: "",
      unNumber: "",
      width: "",
      length: "",
      height: "",
      lengthMetrics: "",
      packageType: "",
      numberOfPackages: "",
      volume: "",
      truckType: "",
      numberOfPallets: "",
      stackableCargo: false,
    },
    liftgate: {
  required: false, // yes/no
},
accsesConditions: "",
  },




  setField: (key, value) =>
    set((state) => ({
      data: { ...state.data, [key]: value }
    })),

    
  reset: () =>
    set({
      data: {
        mode: "",
        shipmentType: "",
        containerType: "",
        pol: "",
        pod: "",
        plorChecked: false,
        plor: "",
        plodChecked: false,
        plod: "",
        cargoType: "",
        commodity: "",
        grossWeight: "",
        pickupLocation: "",
        wizardSelection: {
          mainCategory: "",
          subCategory: "",
          incoterms: "",
        }
      }
    })
}))
