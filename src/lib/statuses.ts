export enum ShipmentStatus {
  Created = "created",
  InTransit = "in_transit",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export function getRandomShipmentStatus(): ShipmentStatus {
  const statusValues = Object.values(ShipmentStatus)
  const randomIndex = Math.floor(Math.random() * statusValues.length)
  return statusValues[randomIndex]
}

export const shipmentStatusLabels: Record<ShipmentStatus, string> = {
  [ShipmentStatus.Created]: "Создана",
  [ShipmentStatus.InTransit]: "В пути",
  [ShipmentStatus.Delivered]: "Доставлена",
  [ShipmentStatus.Cancelled]: "Отменена",
}
