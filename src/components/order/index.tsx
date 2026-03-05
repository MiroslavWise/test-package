"use client"

import IconAt from "@/icons/icon-at"
import IconPlane from "@/icons/icon-plane"
import IconSuitcase from "@/icons/icon-suitcase"
import IconClockwise from "@/icons/icon-clockwise"
import IconAirplaneEnd from "@/icons/icon-airplane-end"
import IconCalendarPlus from "@/icons/icon-calendar-plus"
import IconAirplaneStart from "@/icons/icon-airplane-start"

import { formatISODate } from "@/helpers/date"
import { StateOrder, useSaveForm } from "@/stores/save-form"
import { getStartCity, getStatus, getTypeCase } from "@/helpers/get"
import IconPhone from "@/icons/icon-phone"
import IconBarbell from "@/icons/icon-barbell"

function getOrder(orders: StateOrder[], id: string) {
  return orders.find((item) => item.id === id) || null
}

function Order({ id }: { id: string }) {
  const orders = useSaveForm(({ forms }) => forms)
  if (!id) return "Нет такого заказа"

  const order = getOrder(orders, id)

  if (!order) return "Нет такого заказа"

  const { form, createAt, status } = order ?? {}
  const { sender, departureCity, destinationCity, typeOfCargo, recipient, phone, weight } = form ?? {}

  return (
    <section className="w-full container max-w-140 flex flex-col items-center gap-4 rounded-md border border-black/10 p-3 pb-4 shadow-md">
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
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 justify-between items-center">
        <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
          <div className="w-full h-auto aspect-square relative">
            <IconAt />
          </div>
          <span className="text-sm font-semibold">{sender}</span>
        </div>
        <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
          <div className="w-full h-auto aspect-square relative">
            <IconPlane />
          </div>
          <span className="text-sm font-semibold">{recipient}</span>
        </div>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconPhone />
        </div>
        <span className="text-sm font-semibold">{phone}</span>
      </div>
      <div className="w-full border-t border-black/10" />
      <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center">
        <div className="w-full h-auto aspect-square relative">
          <IconBarbell />
        </div>
        <span className="text-sm font-semibold">{weight} кг</span>
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
    </section>
  )
}

Order.displayName = "Order"
export default Order
