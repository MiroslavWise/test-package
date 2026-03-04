import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { persist, createJSONStorage } from "zustand/middleware"

import { TSchema } from "@/schemas/forms"

export const useSaveForm = create(
  persist<IState>(
    () => ({
      forms: [],
    }),
    {
      name: "forms",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const dispatchSaveForm = (form: TSchema) =>
  useSaveForm.setState((state) => {
    const id = uuidv4()

    const objectData: State = { id, form }

    return {
      ...state,
      forms: [...state.forms, objectData],
    }
  })

interface State {
  id: string
  form: TSchema
}

interface IState {
  forms: State[]
}
