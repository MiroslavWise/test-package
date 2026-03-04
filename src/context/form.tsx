import { FormProvider, useForm } from "react-hook-form"
import { PropsWithChildren, useEffect, useState } from "react"

import { ETypeCargo } from "@/types"
import { resolver, TSchema } from "@/schemas/forms"
import { dispatchSaveForm } from "@/stores/save-form"

function ProviderForm({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false)

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
    <FormProvider
      {...methods}
      children={
        <form className="w-full flex flex-col" onSubmit={onSubmit}>
          {children}
        </form>
      }
    />
  )
}

ProviderForm.displayName = "ProviderForm"
export default ProviderForm
