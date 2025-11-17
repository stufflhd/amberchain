export const dummyQuotes = [
  {
    id: "Q-2025-001",
    mode: "sea",
    shipmentType: "FCL",
    containerType: "40RH",

    // Top-level fields used by helpers
    pol: "Rotterdam, NL",
    pod: "New York, US",
    customer: "Fresh Fruits BV",
    createdAt: "2025-11-10",

    data: {
      pol: "Rotterdam, NL",
      pod: "New York, US",
      origin: { name: "Rotterdam Port", country: "NL" },
      destination: { name: "New York Terminal", country: "US" },
    },

    plorChecked: true,
    plor: "Rotterdam Warehouse 12",
    plodChecked: false,
    plod: "",
    
    pickupChecked: false,
    pickupLocation: "",
    returnChecked: true,
    returnLocation: "NJ Return Depot",

    cargoType: "General",
    commodity: "Bananas",
    grossWeight: "22000",

    wizardSelection: {
      mainCategory: "Reefer",
      subCategory: "Fresh Produce",
    },

    coldTreatment: {
      required: true,
      temperature: "-1",
      temperatureSetPoints: [-1, -1, -1],
      multipleSetPoints: true,
    },

    probes: {
      numberOfCargoProbes: 4,
      drainHoles: true,
      freshAirExchange: "open",
      ventilationVolume: "80",
    },

    humidity: {
      required: true,
      percentage: "90",
    },

    genset: {
      duringExport: true,
      duringImport: false,
    },

    temperatureSchedule: {
      daysBeforeETA: [
        { day: 3, temperature: -1 },
        { day: 2, temperature: -1 },
        { day: 1, temperature: -1 },
      ],
      daysAfterGateIn: [
        { day: 1, temperature: -1 },
        { day: 2, temperature: -1 },
      ],
    },

    cargo: {
      class: "A",
      unNumber: "UN1234",
      width: "2.2",
      length: "12",
      height: "2.4",
      lengthMetrics: "m",
      packageType: "Pallets",
      numberOfPackages: "20",
      volume: "65",
      truckType: "Reefer Truck",
      numberOfPallets: "20",
      stackableCargo: false,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Reefer plug needed at POL",
  },

  // ROAD example
  {
    id: "Q-2025-002",
    mode: "road",
    shipmentType: "FTL",
    containerType: "truck",

    // Top-level fields used by helpers
    pol: "Hamburg, DE",
    pod: "Paris, FR",
    customer: "LogiTech GmbH",
    createdAt: "2025-11-12",

    data: {
      pol: "Hamburg, DE",
      pod: "Paris, FR",
      origin: { name: "Hamburg Depot A", country: "DE" },
      destination: { name: "Paris DC19", country: "FR" },
    },

    plorChecked: false,
    plor: "",
    plodChecked: false,
    plod: "",

    pickupChecked: true,
    pickupLocation: "Hamburg Industrial Zone",
    returnChecked: true,
    returnLocation: "Paris North Depot",

    cargoType: "Perishable",
    commodity: "Electronics",
    grossWeight: "8000",

    wizardSelection: {
      mainCategory: "Dry Cargo",
      subCategory: "Consumer Electronics",
    },

    coldTreatment: {
      required: false,
      temperature: "",
      temperatureSetPoints: [],
      multipleSetPoints: false,
    },

    probes: {
      numberOfCargoProbes: 0,
      drainHoles: false,
      freshAirExchange: "closed",
      ventilationVolume: "",
    },

    humidity: {
      required: false,
      percentage: "",
    },

    genset: {
      duringExport: false,
      duringImport: false,
    },

    temperatureSchedule: {
      daysBeforeETA: [],
      daysAfterGateIn: [],
    },

    cargo: {
      class: "",
      unNumber: "",
      width: "1.2",
      length: "2",
      height: "1.5",
      lengthMetrics: "m",
      packageType: "Boxes",
      numberOfPackages: "50",
      volume: "20",
      truckType: "Standard Truck",
      numberOfPallets: "8",
      stackableCargo: true,
    },

    liftgate: {
      required: true,
    },

    accsesConditions: "Truck with liftgate required at destination.",
  },

  // AIR example
  {
    id: "Q-2025-003",
    mode: "air",
    shipmentType: "airport-to-airport",
    containerType: "ULD",

    // Top-level fields used by helpers
    pol: "Amsterdam, NL",
    pod: "Dubai, AE",
    customer: "Global Fashion Co",
    createdAt: "2025-11-14",

    data: {
      pol: "Amsterdam, NL",
      pod: "Dubai, AE",
      origin: { name: "Schiphol Airport", country: "NL" },
      destination: { name: "Dubai Intl Airport", country: "AE" },
    },

    plorChecked: false,
    plor: "",
    plodChecked: false,
    plod: "",

    pickupChecked: false,
    pickupLocation: "",
    returnChecked: false,
    returnLocation: "",

    cargoType: "Hazardous",
    commodity: "Garments",
    grossWeight: "3000",

    wizardSelection: {
      mainCategory: "General Cargo",
      subCategory: "Fashion",
    },

    coldTreatment: {
      required: false,
      temperature: "",
      temperatureSetPoints: [],
      multipleSetPoints: false,
    },

    probes: {
      numberOfCargoProbes: 0,
      drainHoles: false,
      freshAirExchange: "open",
      ventilationVolume: "",
    },

    humidity: {
      required: false,
      percentage: "",
    },

    genset: {
      duringExport: false,
      duringImport: false,
    },

    temperatureSchedule: {
      daysBeforeETA: [],
      daysAfterGateIn: [],
    },

    cargo: {
      class: "",
      unNumber: "",
      width: "1.2",
      length: "1.6",
      height: "1.4",
      lengthMetrics: "inch",
      packageType: "Cartons",
      numberOfPackages: "120",
      volume: "14",
      truckType: "",
      numberOfPallets: "2",
      stackableCargo: true,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Airport cargo terminal clearance required.",
  },
]