


export const minutesHoursAndDays = (i: string) => {
  const now = new Date()
  const start = new Date(i)
  const diffInMs = now.getTime() - start.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMonths > 0) {
    const remainingDays = diffInDays % 30
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`
  } else if (diffInHours > 0) {
    return `${diffInHours} hr`
  } else if (diffInMinutes < 1) {
    return "just now"
  } else {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  }
}


export const formatDate = (dateStr: string): string => {
  const now = new Date()
  let date = new Date(now)
  if (dateStr.includes("day")) {
    const daysAgo = parseInt(dateStr.split(" ")[0])
    date.setDate(date.getDate() - daysAgo)
  } else if (dateStr.includes("week")) {
    const weeksAgo = parseInt(dateStr.split(" ")[0])
    date.setDate(date.getDate() - weeksAgo * 7)
  } else if (dateStr.includes("month")) {
    const monthsAgo = parseInt(dateStr.split(" ")[0])
    date.setMonth(date.getMonth() - monthsAgo)
  }
  const day = date.getDate().toString().padStart(2, "0")
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const monthIndex = date.getMonth()
  const monthName = monthNames[monthIndex]
  const year = date.getFullYear().toString()
  return `${day}/${monthName}/${year}`
}

