import { ETypeCargo } from "@/types"
import { create } from "zustand"

export const useFilterOrders = create<IState>(() => ({
  name: "",
  city: null,
  cargo: null,
}))

export const dispatchValueName = (value: string) =>
  useFilterOrders.setState((state) => ({
    ...state,
    name: value,
  }))
export const dispatchValueCity = (value: string | null) =>
  useFilterOrders.setState((state) => ({
    ...state,
    city: value,
  }))
export const dispatchValueCargo = (value: ETypeCargo | null) =>
  useFilterOrders.setState((state) => ({
    ...state,
    cargo: value,
  }))

interface IState {
  name: string
  city: string | null
  cargo: ETypeCargo | null
}
