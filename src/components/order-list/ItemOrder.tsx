import Link from "next/link"

import IconAt from "@/icons/icon-at"
import IconFileX from "@/icons/icon-file-x"
import IconSuitcase from "@/icons/icon-suitcase"
import IconClockwise from "@/icons/icon-clockwise"
import IconAirplaneEnd from "@/icons/icon-airplane-end"
import IconCalendarPlus from "@/icons/icon-calendar-plus"
import IconAirplaneStart from "@/icons/icon-airplane-start"

import { EPath } from "@/types"
import { cx } from "@/helpers/cx"
import { formatISODate } from "@/helpers/date"
import { dispatchDelete, StateOrder } from "@/stores/save-form"
import { useOutsideClickEvent } from "@/hooks/useOutsideClickEvent"
import { getStartCity, getStatus, getTypeCase } from "@/helpers/get"

interface IProps extends StateOrder {}

function ItemOrder({ id, form, createAt, status }: IProps) {
  const { departureCity, destinationCity, sender, typeOfCargo } = form ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent()

  return (
    <Link
      href={`${EPath.ORDERS}/${id}`}
      prefetch
      className="relative w-full rounded-md border border-black/10 p-3 pb-4 flex flex-col gap-4 cursor-pointer transition-all hover:border-black/30 shadow-none hover:shadow-md"
    >
      <div className="z-20 absolute top-4 right-4 h-auto w-5 aspect-square" ref={ref}>
        <button
          type="button"
          className="w-5 h-auto aspect-square"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setOpen((_) => !_)
          }}
        >
          <IconFileX />
        </button>
        <div
          className={cx(
            "absolute top-5 right-0 p-2 rounded-md flex flex-col bg-white z-30 w-50 border border-black/10 shadow-md transition-all",
            open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none",
          )}
        >
          <span className="text-base font-medium text-red-700 text-center">Удалить?</span>
          <div className="mt-6 grid grid-cols-2 gap-2 items-center">
            <button
              type="button"
              className="w-full h-8 flex items-center justify-center text-sm font-semibold text-red-600 rounded-md bg-red-100 border border-red-500"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setOpen(false)
                dispatchDelete(id)
              }}
            >
              Удалить
            </button>
            <button
              type="button"
              className="w-full h-8 flex items-center justify-center text-sm font-semibold text-black/80 rounded-md bg-white border border-black"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setOpen(false)
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 justify-between items-center">
        <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
          <div className="w-full h-auto aspect-square relative">
            <IconAirplaneStart />
          </div>
          <span className="text-sm font-semibold">{getStartCity(departureCity)}</span>
        </div>
        <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
          <div className="w-full h-auto aspect-square relative">
            <IconAirplaneEnd />
          </div>
          <span className="text-sm font-semibold">{getStartCity(destinationCity)}</span>
        </div>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconAt />
        </div>
        <span className="text-sm font-semibold">{sender}</span>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconSuitcase />
        </div>
        <span className="text-sm font-semibold">{getTypeCase(typeOfCargo)}</span>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconCalendarPlus />
        </div>
        <span className="text-sm font-semibold">{formatISODate(createAt)}</span>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconClockwise />
        </div>
        <span className="text-sm font-semibold">{getStatus(status)}</span>
      </div>
    </Link>
  )
}

export default ItemOrder
