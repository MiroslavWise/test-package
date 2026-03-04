import { ETypeCargo } from "@/types"
import { IOption } from "@/types/option"

export const OPTIONS_CARGO: IOption<ETypeCargo>[] = [
  {
    value: ETypeCargo.DOCUMENTS,
    label: "Документы",
  },
  {
    value: ETypeCargo.FRAGILE,
    label: "Хрупкое",
  },
  {
    value: ETypeCargo.ORDINARY,
    label: "Обычное",
  },
]
