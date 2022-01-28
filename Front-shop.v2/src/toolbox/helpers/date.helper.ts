import { pad } from './pad.helper'

export function dateFormat (date: string): string {
   const newDate = new Date(date)
   if (!isNaN(newDate.getDate()) && !isNaN(newDate.getMonth()) && !isNaN(newDate.getFullYear())) {
      const day = newDate.getDate()
      const month = newDate.getMonth() + 1
      const year = newDate.getFullYear()
      const abbreviatedYear = year.toString().slice(-2)

      return `${pad(day, 2)}/${pad(month, 2)}/${abbreviatedYear}`
   }
   return '--/--/--'
}

export function dateFormatTime (date: string): string | null {
   const newDate = new Date(date)
   if (!isNaN(newDate.getDate()) && !isNaN(newDate.getMonth()) && !isNaN(newDate.getFullYear())) {
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()

      return `${pad(hours, 2)}:${pad(minutes, 2)}`
   }
   return null
}
