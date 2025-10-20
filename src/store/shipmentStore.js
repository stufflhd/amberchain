import { create } from 'zustand'

export const useShipmentStore = create((set) => ({
  data: {
    mode: '',
    shipmentType: '',
    packageType: '',
    pol: '',
    pod: '',
    plor: '',
    plod: '',
    cargoType: '',
  },
  setField: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
  reset: () => set({ data: {} }),
}))
