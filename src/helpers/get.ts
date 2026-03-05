import { ETypeCargo } from "@/types"
import { OPTIONS_CARGO } from "@/lib/cargo"
import { OPTIONS_CITY } from "@/lib/cities"
import { ShipmentStatus, shipmentStatusLabels } from "@/lib/statuses"

export function getStartCity(id: string) {
  return OPTIONS_CITY.find((item) => item.value === id)?.label ?? null
}

export function getTypeCase(type: ETypeCargo) {
  return OPTIONS_CARGO.find((item) => item.value === type)?.label ?? null
}

export function getStatus(st: ShipmentStatus) {
  return shipmentStatusLabels.hasOwnProperty(st) ? shipmentStatusLabels[st] : null
}
