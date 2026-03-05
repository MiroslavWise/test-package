"use client"

import Link from "next/link"
import { useFormContext, UseFormWatch } from "react-hook-form"

import IconError from "@/icons/icon-error"
import IconEnvelope from "@/icons/icon-envelope"

import { OPTIONS_CITY } from "@/lib/cities"
import { OPTIONS_CARGO } from "@/lib/cargo"
import { type TSchema } from "@/schemas/forms"
import { getPathTo, getValidName, NAME, type Rr } from "@/lib/form"
import { cx } from "@/helpers/cx"
import { useContextCheck } from "@/context/form"

function arrayData(watch: UseFormWatch<TSchema>) {
  return (Object.keys(NAME) as Rr[]).map((item) => {
    if (["sender", "phone", "recipient", "weight"].includes(item))
      return {
        label: NAME[item],
        data: watch(item),
      }

    if (["departureCity", "destinationCity"].includes(item)) {
      const find = OPTIONS_CITY.find((city) => city.value === watch(item))?.label || "Выберите город!!!"

      return {
        label: NAME[item],
        data: find,
      }
    }

    if (item === "typeOfCargo") {
      const data = OPTIONS_CARGO.find((c) => c.value === watch(item))

      return {
        label: NAME[item],
        data: data?.label,
      }
    }

    return {
      label: NAME[item],
      data: "",
    }
  })
}

export default () => {
  const { check, setCheck } = useContextCheck()
  const {
    watch,
    formState: { errors },
  } = useFormContext<TSchema>()

  const valuesError = Object.entries(errors)

  const array = arrayData(watch)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full p-3 pb-4 rounded-sm border border-[#86EFAC] bg-[#F0FDF4] grid grid-cols-[1rem_minmax(0,1fr)] gap-2 items-start">
        <div className="w-4 h-4 aspect-square relative">
          <IconEnvelope />
        </div>
        <div className="w-full flex flex-col gap-2.5">
          <label className="text-sm text-black/80 font-semibold" dangerouslySetInnerHTML={{ __html: "Проверьте данные:" }} />
          <div className="w-full flex flex-col gap-1.5">
            {array.map(({ label, data }) => (
              <p className="text-xs text-black/80 font-normal" key={`${label}--`}>
                <span className="font-semibold">{label}</span>: {data}
              </p>
            ))}
          </div>
        </div>
      </div>
      {valuesError.length > 0 ? (
        <div className="w-full p-3 pb-4 rounded-sm border border-[#FCA5A5] bg-[#FEF2F2] grid grid-cols-[1rem_minmax(0,1fr)] gap-2 items-start">
          <div className="w-4 h-4 aspect-square relative">
            <IconError />
          </div>
          <div className="w-full flex flex-col gap-2.5">
            <label className="text-sm text-black/80 font-semibold" dangerouslySetInnerHTML={{ __html: "Исправте следующие ошибки:" }} />
            <div className="w-full flex flex-col gap-1.5">
              {valuesError.map(([name, item]) => (
                <div key={`::${name}::`} className="w-full">
                  <p className="text-xs font-normal text-black/80">
                    <span className="font-semibold">{getValidName(name)}:</span> {item?.message ?? ""}{" "}
                    <Link
                      href={getPathTo(name)}
                      className="text-xs text-[#B30032] font-normal"
                      dangerouslySetInnerHTML={{ __html: "Перейти" }}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 cursor-pointer" onClick={() => setCheck((_) => !_)}>
        <div className={cx("w-full h-auto rounded-sm aspect-square border-2 border-black/80", check ? "bg-black/80" : "bg-gray-100")} />
        <span className="text-base font-medium">Потвердите нажатием, что вы готовы отправить свои данные куда-то там...</span>
      </div>
    </div>
  )
}
