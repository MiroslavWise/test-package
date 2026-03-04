import { TSchema } from "@/schemas/forms"
import { ENamePath } from "@/types"
import { UrlObject } from "url"

export type Rr = keyof TSchema

export const NAME: Record<Rr, string> = {
  sender: "Имя отправителя",
  phone: "Телефон отправителя",
  departureCity: "Город отправления",
  recipient: "Имя получателя",
  destinationCity: "Город назначения",
  typeOfCargo: "Тип груза", // документы / хрупкое / обычное
  weight: "Вес, кг",
}

export function getValidName(name: string) {
  if (NAME.hasOwnProperty(name)) {
    return NAME[name as Rr]
  }

  return ""
}

interface IToError {
  path: ENamePath
  id: Rr
}

export const OBJECT_TO_ERROR: Record<Rr, IToError> = {
  sender: { path: ENamePath.SENDER, id: "sender" },
  phone: { path: ENamePath.SENDER, id: "phone" },
  departureCity: { path: ENamePath.SENDER, id: "departureCity" },
  recipient: { path: ENamePath.RECIPIENT, id: "recipient" },
  destinationCity: { path: ENamePath.RECIPIENT, id: "destinationCity" },
  typeOfCargo: { path: ENamePath.RECIPIENT, id: "typeOfCargo" },
  weight: { path: ENamePath.RECIPIENT, id: "weight" },
}

export function getPathTo(name: string): UrlObject | string {
  if (OBJECT_TO_ERROR.hasOwnProperty(name)) {
    return {
      pathname: OBJECT_TO_ERROR[name as Rr].path,
      hash: OBJECT_TO_ERROR[name as Rr].id,
    }
  }

  return "#"
}
