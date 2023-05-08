export const dateFormatter = (i: string) => {
    const date = new Date(i)
   return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`
}