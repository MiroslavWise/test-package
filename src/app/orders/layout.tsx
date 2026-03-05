import { Metadata } from "next"
import { PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Список посылок",
  description: "Список посылок",
}

export default ({ children }: PropsWithChildren) => children
