"use client"

import { useState } from "react"

import IconXClose from "@/icons/icon-x-close"

import { cx } from "@/helpers/cx"
import { ETypeCargo } from "@/types"
import { OPTIONS_CARGO } from "@/lib/cargo"
import { OPTIONS_CITY } from "@/lib/cities"
import { useOutsideClickEvent } from "@/hooks/useOutsideClickEvent"
import { dispatchValueCargo, dispatchValueCity, dispatchValueName, useFilterOrders } from "@/stores/filter-orders"

function getCargo(c: ETypeCargo | null) {
  if (!c) return null

  return OPTIONS_CARGO.find((item) => item.value === c) || null
}

function getCity(c: string | null) {
  if (!c) return null

  return OPTIONS_CITY.find((item) => item.value === c) || null
}

function HeaderFilter() {
  const cargo = useFilterOrders(({ cargo }) => cargo)
  const city = useFilterOrders(({ city }) => city)
  const name = useFilterOrders(({ name }) => name)

  const [openCity, setOpenCity, refCity] = useOutsideClickEvent()
  const [openCargo, setOpenCargo, refCargo] = useOutsideClickEvent()

  const activeCargo = getCargo(cargo)
  const activeCity = getCity(city)

  return (
    <header className="w-full container max-w-230 p-4 rounded-xl bg-gray-500/25">
      <section className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_11rem_11rem] gap-2 md:gap-3 md:items-center">
        <input
          value={name}
          onChange={(e) => dispatchValueName(e.target.value)}
          placeholder="Поиск по имени получателя"
          className="w-full bg-white h-10 rounded-md text-sm font-normal text-black/80 placeholder:text-black/50 border border-gray-500 focus:border-black/80 flex items-center pl-4 outline-none"
        />
        <div
          className="w-full h-10 rounded-md border flex items-center pl-4 relative bg-white border-black/80"
          ref={refCity}
          onClick={(event) => {
            event.stopPropagation()
            setOpenCity((state) => !state)
          }}
        >
          <span className={cx("text-sm font-normal", !activeCity ? "text-gray-600" : "text-black/80")}>
            {!activeCity ? "Город" : activeCity?.label}
          </span>
          <button
            type="button"
            className={cx("absolute w-4 h-auto aspect-square top-1/2 right-4 -translate-y-1/2", !!city ? "flex" : "hidden")}
            onClick={(e) => {
              e.stopPropagation()
              dispatchValueCity(null)
            }}
          >
            <IconXClose />
          </button>
          <div
            className={cx(
              "absolute top-11 left-0 right-0 bg-white p-2 rounded-md shadow-md transition-all duration-300 z-50 flex flex-col",
              openCity ? "opacity-100 visible pointer-events-auto translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-3",
            )}
          >
            {OPTIONS_CITY.map((item) => (
              <a
                key={`::${item.value}-cargo::`}
                className={cx(
                  "w-full h-10 flex items-center pl-4 text-sm font-normal rounded-md  cursor-pointer",
                  !!activeCity && activeCity?.value === item.value ? "bg-gray-300" : "bg-white hover:bg-gray-200",
                )}
                dangerouslySetInnerHTML={{ __html: item.label }}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpenCity(false)
                  dispatchValueCity(item.value)
                }}
              />
            ))}
          </div>
        </div>
        <div
          className="w-full h-10 rounded-md border flex items-center pl-4 relative bg-white border-black/80"
          ref={refCargo}
          onClick={(event) => {
            event.stopPropagation()
            setOpenCargo((state) => !state)
          }}
        >
          <span className={cx("text-sm font-normal", !activeCargo ? "text-gray-600" : "text-black/80")}>
            {!activeCargo ? "Тип груза" : activeCargo?.label}
          </span>
          <button
            type="button"
            className={cx("absolute w-4 h-auto aspect-square top-1/2 right-4 -translate-y-1/2", !!cargo ? "flex" : "hidden")}
            onClick={(e) => {
              e.stopPropagation()
              dispatchValueCargo(null)
            }}
          >
            <IconXClose />
          </button>
          <div
            className={cx(
              "absolute top-11 left-0 right-0 bg-white p-2 rounded-md shadow-md transition-all duration-300 z-50 flex flex-col",
              openCargo
                ? "opacity-100 visible pointer-events-auto translate-y-0"
                : "opacity-0 invisible pointer-events-none -translate-y-3",
            )}
          >
            {OPTIONS_CARGO.map((item) => (
              <a
                key={`::${item.value}-cargo::`}
                className={cx(
                  "w-full h-10 flex items-center pl-4 text-sm font-normal rounded-md  cursor-pointer",
                  !!activeCargo && activeCargo?.value === item.value ? "bg-gray-300" : "bg-white hover:bg-gray-200",
                )}
                dangerouslySetInnerHTML={{ __html: item.label }}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpenCargo(false)
                  dispatchValueCargo(item.value)
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </header>
  )
}

HeaderFilter.displayName = "HeaderFilter"
export default HeaderFilter
