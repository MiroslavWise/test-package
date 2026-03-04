import { ControllerRenderProps } from "react-hook-form"

import Label from "../label"

import { cx } from "@/helpers/cx"
import { IOption } from "@/types/option"
import { TSchema } from "@/schemas/forms"
import { useOutsideClickEvent } from "@/hooks/useOutsideClickEvent"

interface Props<T> {
  label: string
  error?: string
  options: IOption<T>[]
}

type TProps<T> = Props<T> & ControllerRenderProps<TSchema>

function getActive<T>(options: IOption<T>[], value: T) {
  const find = options.find((item) => item.value === value)

  return find || false
}

function Selector<T>({ label, error, options, ...rest }: TProps<T>) {
  const [open, setOpen, ref] = useOutsideClickEvent()

  const active = getActive(options, rest.value as T)

  return (
    <div className="w-full flex flex-col gap-1">
      <Label label={label} name={rest.name} />
      <div
        className={cx(
          "w-full h-10 rounded-md border flex items-center pl-4 relative",
          !!error ? "bg-red-100 border-red-600" : "bg-white border-black/80",
        )}
        ref={ref}
        onClick={(event) => {
          event.stopPropagation()
          setOpen((state) => !state)
        }}
      >
        <span className={cx("text-sm font-normal", typeof active === "boolean" ? "text-gray-600" : "text-black/80")}>
          {typeof active === "boolean" ? "Выберите" : active.label}
        </span>
        <div
          className={cx(
            "absolute top-11 left-0 right-0 bg-white p-2 rounded-md shadow-md transition-all duration-300 z-50 flex flex-col",
            open ? "opacity-100 visible pointer-events-auto translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-3",
          )}
        >
          {options.map((item) => (
            <a
              key={`::${item.value}-${label}::`}
              className={cx(
                "w-full h-10 flex items-center pl-4 text-sm font-normal rounded-md  cursor-pointer",
                typeof active !== "boolean" && active?.value === item.value ? "bg-gray-300" : "bg-white hover:bg-gray-200",
              )}
              dangerouslySetInnerHTML={{ __html: item.label }}
              onClick={(event) => {
                event.stopPropagation()
                setOpen(false)
                rest.onChange(item.value)
              }}
            />
          ))}
        </div>
      </div>
      <span className={cx("text-xs text-red-600", !!error ? "block" : "hidden")}>{error}</span>
    </div>
  )
}

Selector.displayName = "Selector"
export default Selector
