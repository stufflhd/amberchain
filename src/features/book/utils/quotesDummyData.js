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

    // Schedule / transit info
    etd: "2025-11-20",
    eta: "2025-12-05",
    transitTimeDays: 15,
    cutOff: {
      documentation: "2025-11-18 16:00",
      cargo: "2025-11-19 12:00",
    },

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

    // Schedule / transit info
    etd: "2025-11-15",
    eta: "2025-11-16",
    transitTimeDays: 1,
    cutOff: {
      documentation: "2025-11-14 12:00",
      cargo: "2025-11-14 18:00",
    },

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

    // Schedule / transit info
    etd: "2025-11-18",
    eta: "2025-11-19",
    transitTimeDays: 1,
    cutOff: {
      documentation: "2025-11-17 10:00",
      cargo: "2025-11-17 20:00",
    },

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
  // RAIL example (General Cargo)
  {
    id: "Q-2025-004",
    mode: "rail",
    shipmentType: "FCL",
    containerType: "40HC",

    // Top-level fields
    pol: "Xi'an, CN",
    pod: "Duisburg, DE",
    customer: "Silk Road Traders",
    createdAt: "2025-11-15",

    // Schedule
    etd: "2025-11-25",
    eta: "2025-12-10",
    transitTimeDays: 15,
    cutOff: {
      documentation: "2025-11-22 10:00",
      cargo: "2025-11-23 18:00",
    },

    data: {
      pol: "Xi'an, CN",
      pod: "Duisburg, DE",
      origin: { name: "Xi'an Railway Station", country: "CN" },
      destination: { name: "Duisburg Intermodal Terminal", country: "DE" },
    },

    plorChecked: true,
    plor: "Shaanxi Tech Park",
    plodChecked: false,
    plod: "",

    pickupChecked: false,
    pickupLocation: "",
    returnChecked: false,
    returnLocation: "",

    cargoType: "General",
    commodity: "Auto Parts",
    grossWeight: "18000",

    wizardSelection: {
      mainCategory: "Automotive",
      subCategory: "Spare Parts",
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
      freshAirExchange: "",
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
      width: "2.3",
      length: "12",
      height: "2.4",
      lengthMetrics: "m",
      packageType: "Crates",
      numberOfPackages: "40",
      volume: "60",
      truckType: "",
      numberOfPallets: "20",
      stackableCargo: true,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Rail terminal slot booking reference required.",
  },

  // ECOMMERCE example (Small parcel)
  {
    id: "Q-2025-005",
    mode: "ecommerce",
    shipmentType: null, // Null as requested for ecommerce
    containerType: "parcel",

    // Top-level fields
    pol: "Shenzhen, CN",
    pod: "Los Angeles, US",
    customer: "DropShip Pro",
    createdAt: "2025-11-16",

    // Schedule
    etd: "2025-11-18",
    eta: "2025-11-25",
    transitTimeDays: 7,
    cutOff: {
      documentation: "2025-11-17 12:00",
      cargo: "2025-11-17 14:00",
    },

    data: {
      pol: "Shenzhen, CN",
      pod: "Los Angeles, US",
      origin: { name: "Shenzhen Sort Center", country: "CN" },
      destination: { name: "LAX Distribution Hub", country: "US" },
    },

    plorChecked: true,
    plor: "Shenzhen Fulfillment Center",
    plodChecked: true,
    plod: "Customer Doorstep, Beverly Hills",

    pickupChecked: true,
    pickupLocation: "Shenzhen Fulfillment Center",
    returnChecked: false,
    returnLocation: "",

    cargoType: "General",
    commodity: "Phone Accessories",
    grossWeight: "50",

    wizardSelection: {
      mainCategory: "Consumer Goods",
      subCategory: "Electronics",
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
      freshAirExchange: "",
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
      width: "0.5",
      length: "0.5",
      height: "0.4",
      lengthMetrics: "m",
      packageType: "Box",
      numberOfPackages: "5",
      volume: "0.1",
      truckType: "Van",
      numberOfPallets: "0",
      stackableCargo: true,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Door code required for delivery.",
  },

  // COMBINED example (Multimodal Hazardous)
  {
    id: "Q-2025-005",
    mode: "combined",
    shipmentType: "LCL",
    containerType: "20GP",

    // Top-level fields
    pol: "Antwerp, BE",
    pod: "Paris, FR",
    customer: "ChemCorp Europe",
    createdAt: "2025-11-17",

    // Schedule
    etd: "2025-11-22",
    eta: "2025-11-28",
    transitTimeDays: 4,
    cutOff: {
      documentation: "2025-11-19 09:00",
      cargo: "2025-11-19 12:00",
    },

    data: {
      pol: "Antwerp, BE",
      pod: "Lyon, FR",
      origin: { name: "Antwerp Port Area", country: "BE" },
      destination: { name: "Lyon River Terminal", country: "FR" },
    },

    plorChecked: false,
    plor: "",
    plodChecked: true,
    plod: "Lyon Industrial Park, Building B",

    pickupChecked: false,
    pickupLocation: "",
    returnChecked: false,
    returnLocation: "",

    cargoType: "Hazardous",
    commodity: "Industrial Paint",
    grossWeight: "4500",

    wizardSelection: {
      mainCategory: "Chemicals",
      subCategory: "Flammable Liquids",
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
      class: "3",
      unNumber: "UN1263",
      width: "1.0",
      length: "1.2",
      height: "1.0",
      lengthMetrics: "m",
      packageType: "Drums",
      numberOfPackages: "20",
      volume: "8",
      truckType: "ADR Truck",
      numberOfPallets: "10",
      stackableCargo: false,
    },

    liftgate: {
      required: true,
    },

    accsesConditions: "ADR Certified Driver required. MSDS documents attached.",
  },
  {
    id: "Q-2025-006",
    mode: "combined",
    shipmentType: "LCL",
    containerType: "20GP",

    // Top-level fields
    pol: "Antwerp, BE",
    pod: "Lyon, FR",
    customer: "ChemCorp Europe",
    createdAt: "2025-11-17",

    // Schedule
    etd: "2025-11-20",
    eta: "2025-11-24",
    transitTimeDays: 4,
    cutOff: {
      documentation: "2025-11-19 09:00",
      cargo: "2025-11-19 12:00",
    },

    data: {
      pol: "Antwerp, BE",
      pod: "Lyon, FR",
      origin: { name: "Antwerp Port Area", country: "BE" },
      destination: { name: "Lyon River Terminal", country: "FR" },
    },

    plorChecked: false,
    plor: "",
    plodChecked: true,
    plod: "Lyon Industrial Park, Building B",

    pickupChecked: false,
    pickupLocation: "",
    returnChecked: false,
    returnLocation: "",

    cargoType: "General",
    commodity: "Industrial Paint",
    grossWeight: "4500",

    wizardSelection: {
      mainCategory: "Chemicals",
      subCategory: "Flammable Liquids",
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
      class: "3",
      unNumber: "UN1263",
      width: "1.0",
      length: "1.2",
      height: "1.0",
      lengthMetrics: "m",
      packageType: "Drums",
      numberOfPackages: "20",
      volume: "8",
      truckType: "ADR Truck",
      numberOfPallets: "10",
      stackableCargo: false,
    },

    liftgate: {
      required: true,
    },

    accsesConditions: "ADR Certified Driver required. MSDS documents attached.",
  },

  // SEA example (Oversized)
  {
    id: "Q-2025-007",
    mode: "sea",
    shipmentType: "Breakbulk",
    containerType: "FlatRack",

    // Top-level fields
    pol: "Tokyo, JP",
    pod: "Sydney, AU",
    customer: "Heavy Machinery Co",
    createdAt: "2025-11-18",

    // Schedule
    etd: "2025-12-01",
    eta: "2025-12-20",
    transitTimeDays: 19,
    cutOff: {
      documentation: "2025-11-25 17:00",
      cargo: "2025-11-28 10:00",
    },

    data: {
      pol: "Tokyo, JP",
      pod: "Sydney, AU",
      origin: { name: "Tokyo Port", country: "JP" },
      destination: { name: "Sydney Port Botany", country: "AU" },
    },

    plorChecked: false,
    plor: "",
    plodChecked: false,
    plod: "",

    pickupChecked: false,
    pickupLocation: "",
    returnChecked: false,
    returnLocation: "",

    cargoType: "Oversized",
    commodity: "Excavator",
    grossWeight: "35000",

    wizardSelection: {
      mainCategory: "Construction",
      subCategory: "Heavy Equipment",
    },

    coldTreatment: {
      required: false,
      temperature: "",
      temperatureSetPoints: [],
      multipleSetPoints: false,
    },

    probes: {
      numberOfCargoProbes: 0,
      drainHoles: true,
      freshAirExchange: "",
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
      width: "3.5",
      length: "8.0",
      height: "3.2",
      lengthMetrics: "m",
      packageType: "Unit",
      numberOfPackages: "1",
      volume: "90",
      truckType: "Lowbed Trailer",
      numberOfPallets: "0",
      stackableCargo: false,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Crane required for loading/unloading. Police escort for road transport.",
  },

  // ROAD example (Liquid)
  {
    id: "Q-2025-008",
    mode: "road",
    shipmentType: "FTL",
    containerType: "Tanker",

    // Top-level fields
    pol: "Milan, IT",
    pod: "Zurich, CH",
    customer: "AgroLiquid S.p.A",
    createdAt: "2025-11-19",

    // Schedule
    etd: "2025-11-22",
    eta: "2025-11-22",
    transitTimeDays: 0,
    cutOff: {
      documentation: "2025-11-21 15:00",
      cargo: "2025-11-21 16:00",
    },

    data: {
      pol: "Milan, IT",
      pod: "Zurich, CH",
      origin: { name: "Milan Refinery", country: "IT" },
      destination: { name: "Zurich Production Plant", country: "CH" },
    },

    plorChecked: true,
    plor: "Milan Refinery Tank 4",
    plodChecked: true,
    plod: "Zurich Plant Tank 2",

    pickupChecked: true,
    pickupLocation: "Milan Refinery",
    returnChecked: true,
    returnLocation: "Milan Depot",

    cargoType: "Liquid",
    commodity: "Olive Oil",
    grossWeight: "24000",

    wizardSelection: {
      mainCategory: "Foodstuff",
      subCategory: "Oils & Fats",
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
      freshAirExchange: "",
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
      width: "",
      length: "",
      height: "",
      lengthMetrics: "m",
      packageType: "Bulk",
      numberOfPackages: "1",
      volume: "24000",
      truckType: "Food Grade Tanker",
      numberOfPallets: "0",
      stackableCargo: false,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "Tank cleaning certificate required prior to loading.",
  },
    
  // AIR example (Hazardous - Checking Null ShipmentType constraint)
  {
    id: "Q-2025-009",
    mode: "air",
    shipmentType: null, // Null as requested for air
    containerType: "ULD",

    // Top-level fields
    pol: "Frankfurt, DE",
    pod: "New York, US",
    customer: "BioPharma Inc",
    createdAt: "2025-11-20",

    // Schedule
    etd: "2025-11-24",
    eta: "2025-11-25",
    transitTimeDays: 1,
    cutOff: {
      documentation: "2025-11-23 12:00",
      cargo: "2025-11-23 22:00",
    },

    data: {
      pol: "Frankfurt, DE",
      pod: "New York, US",
      origin: { name: "FRA Cargo City", country: "DE" },
      destination: { name: "JFK Cargo Terminal", country: "US" },
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
    commodity: "Lithium Batteries",
    grossWeight: "1200",

    wizardSelection: {
      mainCategory: "Electronics",
      subCategory: "Batteries",
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
      class: "9",
      unNumber: "UN3480",
      width: "1.2",
      length: "1.0",
      height: "1.6",
      lengthMetrics: "m",
      packageType: "Pallets",
      numberOfPackages: "4",
      volume: "8",
      truckType: "",
      numberOfPallets: "4",
      stackableCargo: false,
    },

    liftgate: {
      required: false,
    },

    accsesConditions: "IATA Dangerous Goods Regulations apply. Pilot notification required.",
  },
]