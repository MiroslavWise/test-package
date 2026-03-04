import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { ETypeCargo, valuesCargo } from "@/types"

const fullname = yup.string().required("Поле обязательно").min(2, "Не менее 2-х символов").default("")
const city = yup.string().required("Поле обязательно").min(1, "Выберите город").default("")

const sender = yup.object({
  sender: fullname,
  phone: yup
    .string()
    .required("Введите номер телефона")
    .matches(
      /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
      "Введите номер в формате +7 (XXX) XXX-XX-XX или 8XXXXXXXXXX",
    )
    .default(""),
  departureCity: city,
})

const recipient = yup.object({
  recipient: fullname,
  destinationCity: city,
  typeOfCargo: yup.mixed<ETypeCargo>().oneOf(valuesCargo).default(ETypeCargo.DOCUMENTS),
  weight: yup.number().required().min(0.1).max(30, "Не более 30 кг").default(0.1),
})

const schema = yup
  .object({})
  .concat(sender)
  .concat(recipient)
  .test("cities", "Проверка совпадения", function ({ departureCity, destinationCity }) {
    if (departureCity) {
      if (destinationCity) {
        if (departureCity === destinationCity) {
          return this.createError({ path: "destinationCity", message: "Город получателя совпадает с городом отправителя" })
        }
      }
    }
    return true
  })

export type TSchema = yup.InferType<typeof schema>
export const resolver = yupResolver(schema)
