import Link from "next/link"

import { ENamePath, EPath } from "@/types"

export default () => {
  return (
    <main className="w-full min-h-dvh flex flex-col gap-3 items-center justify-center py-4 px-4 md:px-6 lg:px-8">
      <section className="w-full container max-w-70 flex flex-col items-center gap-1.5">
        <h1 className="text-lg font-semibold">Добро пожаловать</h1>
        <p className="text-center text-sm">
          Выберите, что вам делать дальше: посмотреть список уже отправленных посылок или создать новый запрос
        </p>
        <div className="flex flex-row gap-4 mt-6">
          {LINKS.map((item) => (
            <Link
              key={`::${item.path}-path::`}
              href={item.path}
              className="w-fit h-10 px-4.5 flex items-center justify-center text-center text-sm font-semibold rounded-md border border-black/10"
              dangerouslySetInnerHTML={{ __html: item.label }}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

const LINKS = [
  {
    label: "Создать",
    path: ENamePath.SENDER,
  },
  {
    label: "Список",
    path: EPath.ORDERS,
  },
]
