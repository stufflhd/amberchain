export const textRegex = /^(?=.*[A-Za-z])[\sA-Za-z'.-]{2,}$/;
export const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
export const generalTextRegex = /^(?=.*[A-Za-z0-9])[\sA-Za-z0-9&@#',./()-]{2,}$/;

// Transport Modes Configuration
export const TRANSPORT_MODES = {
  COMBINED: {
    id: 'combined',
    translationKey: 'compareOptions.modes.combined',
    description: 'compareOptions.modeDescriptions.combined',
    icon: 'Combined',
    disabled: true
  },
  SEA: {
    id: 'sea',
    translationKey: 'compareOptions.modes.sea',
    description: 'compareOptions.modeDescriptions.sea',
    icon: 'Ship',
    departureLabel: 'compareOptions.fields.pol',
    arrivalLabel: 'compareOptions.fields.pod',
    containerTypes: ['fcl', 'lcl'],
    optionalFields: ['pickup', 'plor', 'plod'],
    addons: ['insurance', 'stuffing', 'unstuffing', 'inspection', 'port_agent', 'ireposition', 'track_live', 'troke_trace', 'socforall', 'readytoLoad', 'customs_brokerage']
  },
  RAIL: {
    id: 'rail',
    translationKey: 'compareOptions.modes.rail',
    description: 'compareOptions.modeDescriptions.rail',
    icon: 'Train',
    departureLabel: 'compareOptions.fields.railRampOrigin',
    arrivalLabel: 'compareOptions.fields.railRampDestination',
    containerTypes: ['fcl', 'lcl'],
    optionalFields: ['pickup', 'plor', 'plod'],
    addons: ['insurance', 'stuffing', 'unstuffing', 'inspection', 'ireposition', 'track_live', 'troke_trace', 'socforall', 'readytoLoad', 'customs_brokerage']
  },
  ROAD: {
    id: 'road',
    translationKey: 'compareOptions.modes.road',
    description: 'compareOptions.modeDescriptions.road',
    icon: 'Truck',
    departureLabel: 'compareOptions.fields.placeOfPickup',
    arrivalLabel: 'compareOptions.fields.placeOfDelivery',
    containerTypes: ['ftl', 'ltl'],
    optionalFields: [],
    extraFields: ['liftgate', 'access'],
    addons: ['insurance', 'stuffing', 'unstuffing', 'inspection', 'track_live', 'troke_trace', 'customs_brokerage']
  },
  AIR: {
    id: 'air',
    translationKey: 'compareOptions.modes.air',
    description: 'compareOptions.modeDescriptions.air',
    icon: 'Plane',
    departureLabel: 'compareOptions.fields.airportOfDeparture',
    arrivalLabel: 'compareOptions.fields.airportOfArrival',
    containerTypes: [],
    optionalFields: ['plor', 'plod'],
    addons: ['insurance', 'stuffing', 'unstuffing', 'inspection', 'track_live', 'troke_trace', 'customs_brokerage']
  },
  ECOMMERCE: {
    id: 'ecommerce',
    translationKey: 'compareOptions.modes.ebusiness',
    description: 'compareOptions.modeDescriptions.ecommerce',
    icon: 'Package',
    departureLabel: 'compareOptions.fields.pickupAddress',
    arrivalLabel: 'compareOptions.fields.deliveryAddress',
    containerTypes: [],
    optionalFields: [],
    addons: ['inspection', 'track_live', 'troke_trace', 'customs_brokerage']
  }
};

// Cargo Types Configuration
export const CARGO_TYPES = {
  GENERAL: { label: 'compareOptions.cargoTypes.general', fields: [] },
  HAZARDOUS: { 
    label: 'compareOptions.cargoTypes.hazardous',
    fields: ['classImo', 'unNumber']
  },
  PERISHABLE: { 
    label: 'compareOptions.cargoTypes.perishable',
    fields: []
  },
  OVERSIZED: { 
    label: 'compareOptions.cargoTypes.oversized',
    fields: ['oversized_dimensions']
  },
  LIQUID: { label: 'compareOptions.cargoTypes.liquid', fields: [] }
};

// Unit Options
export const LENGTH_METRICS = [
  { value: 'inch', label: 'compareOptions.units.inch' },
  { value: 'foot', label: 'compareOptions.units.foot' },
  { value: 'meter', label: 'compareOptions.units.meter' }
];

export const CURRENCIES = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' }
];

// Dummy options for testing
export const DUMMY_COMMODITIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'machinery', label: 'Machinery' },
  { value: 'food', label: 'Food Products' },
  { value: 'chemicals', label: 'Chemicals' }
];

export const DUMMY_PACKAGE_TYPES = [
  { value: 'box', label: 'Box' },
  { value: 'pallet', label: 'Pallet' },
  { value: 'crate', label: 'Crate' },
  { value: 'drum', label: 'Drum' }
];

export const DUMMY_TRUCK_TYPES = [
  { value: 'flatbed', label: 'Flatbed' },
  { value: 'box-truck', label: 'Box Truck' },
  { value: 'refrigerated', label: 'Refrigerated' },
  { value: 'tanker', label: 'Tanker' }
];

export const CARGO_PROBES_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];