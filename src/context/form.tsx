"use client"

import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"

import { EPath, ETypeCargo } from "@/types"
import { resolver, TSchema } from "@/schemas/forms"
import { dispatchSaveForm } from "@/stores/save-form"

const create = createContext<IContext>({ check: false, setCheck: () => {} })

interface IContext {
  check: boolean
  setCheck: Dispatch<SetStateAction<boolean>>
}

function ProviderForm({ children }: PropsWithChildren) {
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const methods = useForm<TSchema>({
    defaultValues: {
      sender: "",
      phone: "",
      departureCity: "",
      recipient: "",
      destinationCity: "",
      typeOfCargo: ETypeCargo.DOCUMENTS,
      weight: 0.1,
    },
    resolver: resolver,
  })

  const onSubmit = methods.handleSubmit(async (values) => {
    if (loading) return
    setLoading(true)

    try {
      dispatchSaveForm(values)
      requestAnimationFrame(() => {
        methods.reset()
        push(EPath.ORDERS)
      })
    } catch (e) {
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2_500)
    }
  })

  useEffect(() => {
    if (!!methods.formState.errors) {
      console.log("methods: errors ", methods.formState.errors)
    }
  }, [methods.formState.errors])

  return (
    <create.Provider
      value={{ check, setCheck }}
      children={
        <FormProvider
          {...methods}
          children={
            <form className="w-full flex flex-col" onSubmit={onSubmit}>
              {children}
            </form>
          }
        />
      }
    />
  )
}

export const useContextCheck = () => useContext(create)

ProviderForm.displayName = "ProviderForm"
export default ProviderForm
