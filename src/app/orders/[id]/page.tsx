import Link from "next/link"

import Order from "@/components/order"

import { ENamePath, EPath } from "@/types"

interface IProps {
  params: Promise<{ id: string }>
}

export default async ({ params }: IProps) => {
  const { id } = await params

  return (
    <main className="w-full min-h-dvh flex flex-col gap-3 items-center py-4 px-4 md:px-6 lg:px-8">
      <Order id={id} />
      <div className="w-full container max-w-140 flex items-center justify-between gap-2">
        <Link
          href={EPath.ORDERS}
          className="w-full max-w-51 h-10 flex items-center justify-center text-sm font-semibold text-black/80 rounded-md bg-white border border-[#111827] transition-opacity"
          dangerouslySetInnerHTML={{ __html: "К списку" }}
        />
        <Link
          href={ENamePath.SENDER}
          className="w-full max-w-51 h-10 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-[#111827] transition-opacity"
          dangerouslySetInnerHTML={{ __html: "Создать заявку" }}
        />
      </div>
    </main>
  )
}
