interface SimulateAjaxCallArgs<T> {
  data?: T | string
  delay?: number
  shouldFail?: boolean
}

export const simulateAjaxCall = <T>({
  data = 'success',
  delay = 1000,
  shouldFail = false,
}: SimulateAjaxCallArgs<T>) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(data)
        return
      }
      resolve(data)
    }, delay)
  })
}
