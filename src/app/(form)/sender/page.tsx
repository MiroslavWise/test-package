"use client"

import { Controller, useFormContext } from "react-hook-form"

import Input from "@/components/input"
import Selector from "@/components/selector"

import { getValidName } from "@/lib/form"
import { OPTIONS_CITY } from "@/lib/cities"
import { type TSchema } from "@/schemas/forms"

export default function Home() {
  const { control } = useFormContext<TSchema>()

  return (
    <div className="w-full flex flex-col gap-4">
      <Controller
        name="sender"
        control={control}
        render={({ field, fieldState: { error } }) => <Input label={getValidName(field.name)} error={error?.message} {...field} />}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState: { error } }) => <Input label={getValidName(field.name)} error={error?.message} {...field} />}
      />
      <Controller
        name="departureCity"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Selector<string> label={getValidName(field.name)} error={error?.message} {...field} options={OPTIONS_CITY} />
        )}
      />
    </div>
  )
}
