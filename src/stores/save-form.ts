import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { persist, createJSONStorage } from "zustand/middleware"

import { TSchema } from "@/schemas/forms"
import { getRandomShipmentStatus, ShipmentStatus } from "@/lib/statuses"

export const useSaveForm = create(
  persist<IState>(
    () => ({
      forms: [],
    }),
    {
      name: "forms",
      version: 0.2,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const dispatchSaveForm = (form: TSchema) =>
  useSaveForm.setState((state) => {
    const id = uuidv4()
    const createAt = new Date()
    const status = getRandomShipmentStatus()

    const objectData: StateOrder = { id, createAt, status, form }

    return {
      ...state,
      forms: [...state.forms, objectData],
    }
  })

export const dispatchDelete = (id: string) =>
  useSaveForm.setState((state) => {
    return {
      ...state,
      forms: state.forms.filter((item) => item.id != id),
    }
  })

export interface StateOrder {
  id: string
  createAt: Date
  status: ShipmentStatus
  form: TSchema
}

interface IState {
  forms: StateOrder[]
}
