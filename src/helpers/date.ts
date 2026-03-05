export function formatISODate(isoString: Date, timeZone: string = "UTC"): string {
  if (typeof isoString !== "string") {
    return "Некорректная дата"
  }

  const date = new Date(isoString)
  if (isNaN(date.getTime())) {
    return "Некорректная дата"
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
    timeZone: timeZone,
  })

  const parts = formatter.formatToParts(date)

  const getPart = (type: Intl.DateTimeFormatPartTypes): string => {
    const part = parts.find((p) => p.type === type)
    return part ? part.value : ""
  }

  const hour = getPart("hour")
  const minute = getPart("minute")
  const day = getPart("day")
  const month = getPart("month")
  const year = getPart("year")

  return `${hour}:${minute} ${day}/${month}/${year}`
}
