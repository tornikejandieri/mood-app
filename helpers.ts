export const dateFormatter = (i: string) => {
  const date = new Date(i)
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return date.toLocaleDateString(undefined, options)  
}



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
    const remainingDays = diffInDays % 30;
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`
  } else if (diffInHours > 0) {
    return `${diffInHours} hr`
  } else {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  }
}

