"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cx } from "@/helpers/cx"
import { useContextCheck } from "@/context/form"
import { ENamePath, IndexPath, NumberPath } from "@/types"

function getIndexActivePrev(path: string) {
  if ((Object.keys(IndexPath) as ENamePath[]).includes(path as ENamePath)) {
    const indexPath = IndexPath[path as ENamePath]

    if (indexPath > 0) {
      return NumberPath[(indexPath - 1) as 1 | 2]
    }
  }

  return path
}

function getIndexActiveNext(path: string) {
  if ((Object.keys(IndexPath) as ENamePath[]).includes(path as ENamePath)) {
    const indexPath = IndexPath[path as ENamePath]

    if (indexPath < Object.entries(IndexPath).length - 1) {
      return NumberPath[(indexPath + 1) as 0 | 1]
    }
  }

  return path
}

function FooterButtons() {
  const { check } = useContextCheck()
  const path = usePathname()
  const prev = getIndexActivePrev(path)
  const next = getIndexActiveNext(path)

  return (
    <footer className="w-full pt-5 md:pt-10 flex flex-row gap-4 justify-between">
      <Link
        href={prev}
        className={cx(
          "w-full max-w-31 h-10 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-[#111827] transition-opacity",
          prev != path ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed",
        )}
        dangerouslySetInnerHTML={{ __html: "Назад" }}
      />
      <>
        <Link
          href={next}
          className={cx(
            "w-full max-w-31 h-10 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-[#111827] transition-opacity",
            next != path ? "opacity-100 cursor-pointer" : "hidden",
          )}
          dangerouslySetInnerHTML={{ __html: "Далее" }}
        />
        <button
          type="submit"
          disabled={!check}
          className={cx(
            "w-full max-w-31 h-10 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-[#111827] transition-opacity disabled:opacity-50 cursor-not-allowed",
            next == path ? "opacity-100 cursor-pointer" : "hidden",
          )}
          dangerouslySetInnerHTML={{ __html: "Отправить" }}
        />
      </>
    </footer>
  )
}

FooterButtons.displayName = "FooterButtons"
export default FooterButtons
