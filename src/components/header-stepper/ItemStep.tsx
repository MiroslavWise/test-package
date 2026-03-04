import Link from "next/link"
import { usePathname } from "next/navigation"

import IconMessage from "@/icons/icon-message"

import { cx } from "@/helpers/cx"
import { ENamePath, IndexPath, IPropsStep } from "@/types"

interface IProps extends IPropsStep {}

function activePath(pathname: ENamePath, path: string) {
  const index = IndexPath[pathname]

  if ((Object.keys(IndexPath) as ENamePath[]).includes(path as ENamePath)) {
    const indexPath = IndexPath[path as ENamePath]

    if (index <= indexPath) return true
  }

  return false
}

function ItemStep({ title, description, pathname }: IProps) {
  const path = usePathname()

  const active = activePath(pathname, path)
  return (
    <div className={cx("w-full flex flex-col gap-2 md:gap-3", active ? "text-black/80" : "text-black/25 opacity-60")}>
      <Link href={pathname} className="relative w-4 md:w-6 h-auto aspect-square cursor-pointer">
        <IconMessage />
      </Link>
      <div className="w-full flex flex-col text-black/80">
        <h3 className="text-xs md:text-sm font-semibold" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="text-xs md:text-sm font-normal" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  )
}

ItemStep.displayName = "ItemStep"
export default ItemStep
