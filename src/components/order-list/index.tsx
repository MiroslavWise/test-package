"use client"

import ItemOrder from "./ItemOrder"

import { ETypeCargo } from "@/types"
import { useFilterOrders } from "@/stores/filter-orders"
import { StateOrder, useSaveForm } from "@/stores/save-form"

function getFilter(orders: StateOrder[], name: string, city: string | null, cargo: ETypeCargo | null) {
  const array: StateOrder[] = []

  for (const item of orders) {
    let bool = true

    if (!!name.trim()) {
      if (!item.form.recipient.toLowerCase().includes(name.trim().toLowerCase())) {
        bool = false
        continue
      }
    }

    if (!!city) {
      if (item.form.destinationCity !== city) {
        bool = false
        continue
      }
    }

    if (!!cargo) {
      if (item.form.typeOfCargo !== cargo) {
        bool = false
        continue
      }
    }

    if (bool) array.push(item)
  }

  return array
}

function OrderList() {
  const orders = useSaveForm(({ forms }) => forms)
  const name = useFilterOrders(({ name }) => name)
  const city = useFilterOrders(({ city }) => city)
  const cargo = useFilterOrders(({ cargo }) => cargo)

  const filter = getFilter(orders, name, city, cargo)

  if (filter.length === 0) return <div className="">Список пуст</div>

  return (
    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
      {filter.map((item) => (
        <ItemOrder key={`::${item.id}::`} {...item} />
      ))}
    </ul>
  )
}

export default OrderList
