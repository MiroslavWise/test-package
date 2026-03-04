interface Props {
  label: string
  name?: string
}

type LabelProps = Props & React.LabelHTMLAttributes<HTMLLabelElement>

function Label({ label, ...rest }: LabelProps) {
  return <label htmlFor={rest.name} dangerouslySetInnerHTML={{ __html: label }} className="text-sm font-semibold leading-6 text-black/80" />
}

Label.displayName = "Label"
export default Label
