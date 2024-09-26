export function getSessionStorageItem<T>(key: string): T | undefined {
  const item = sessionStorage.getItem(key)

  try {
    return item && item !== 'undefined'
      ? (JSON.parse(item.replace(/undefined/g, 'null')) as T)
      : undefined
  } catch (error) {
    return undefined
  }
}

export function setSessionStorageItem<T>(key: string, payload: T): void {
  const parsedItem = JSON.stringify(payload)

  sessionStorage.setItem(key, parsedItem)
}
