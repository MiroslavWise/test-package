import Label from "@/components/label"

import { cx } from "@/helpers/cx"

interface Props {
  label: string
  error?: string
}

type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>

function Input({ className, label, error, ...rest }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label label={label} name={rest.name} />
      <input
        className={cx(
          "w-full h-10 rounded-md text-sm font-normal text-black/80 placeholder:text-black/50 border flex items-center pl-4 outline-none",
          !!error ? "bg-red-100 border-red-600" : "bg-white border-gray-500 focus:border-black/80",
          className,
        )}
        {...rest}
        id={rest.name}
      />
      <span className={cx("text-xs text-red-600", !!error ? "block" : "hidden")}>{error}</span>
    </div>
  )
}

Input.displayName = "Input"
export default Input
