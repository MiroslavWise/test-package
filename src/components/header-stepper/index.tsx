"use client"

import ItemStep from "./ItemStep"
import { ENamePath, IPropsStep } from "@/types"

function HeaderStepper() {
  return (
    <header className="w-full container max-w-230 p-4 rounded-xl bg-gray-500/25">
      <nav className="w-full grid grid-cols-3 gap-3 items-start">
        {ITEMS.map((item) => (
          <ItemStep key={`::${item}::`} {...item} />
        ))}
      </nav>
    </header>
  )
}

export default HeaderStepper

const ITEMS: IPropsStep[] = [
  {
    title: "Отправитель",
    description: "Форма заполнения данных отправителя",
    pathname: ENamePath.SENDER,
  },
  {
    title: "Получатель и посылка",
    description: "Данные о получателе и посылке",
    pathname: ENamePath.RECIPIENT,
  },
  {
    title: "Подтверждение",
    description: "Проверка и отправка информации",
    pathname: ENamePath.SUBMIT,
  },
]
