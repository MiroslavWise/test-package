"use client"

import { Controller, useFormContext } from "react-hook-form"

import Input from "@/components/input"
import Selector from "@/components/selector"

import { ETypeCargo } from "@/types"
import { getValidName } from "@/lib/form"
import { OPTIONS_CARGO } from "@/lib/cargo"
import { OPTIONS_CITY } from "@/lib/cities"
import { type TSchema } from "@/schemas/forms"

export default () => {
  const { control } = useFormContext<TSchema>()

  return (
    <div className="w-full flex flex-col gap-4">
      <Controller
        name="recipient"
        control={control}
        render={({ field, fieldState: { error } }) => <Input label={getValidName(field.name)} error={error?.message} {...field} />}
      />
      <Controller
        name="destinationCity"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Selector<string> label={getValidName(field.name)} error={error?.message} {...field} options={OPTIONS_CITY} />
        )}
      />
      <Controller
        name="typeOfCargo"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Selector<ETypeCargo> label={getValidName(field.name)} error={error?.message} {...field} options={OPTIONS_CARGO} />
        )}
      />
      <Controller
        name="weight"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            inputMode="numeric"
            label={getValidName(field.name)}
            error={error?.message}
            {...field}
            min={0.1}
            step={0.1}
            max={30}
            onChange={(e) => field.onChange(Number(e.target.value))}
            pattern="/^[0-9]*\.?[0-9]*$/"
          />
        )}
      />
    </div>
  )
}
