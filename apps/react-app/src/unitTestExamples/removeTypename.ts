type RecursiveOmitTypename<T> = T extends object
  ? T extends Array<infer U>
    ? Array<RecursiveOmitTypename<U>>
    : { [K in Exclude<keyof T, '__typename'>]: RecursiveOmitTypename<T[K]> }
  : T

/**
 * Recursively removes __typename property from an object or array.
 *
 * @param input The object or array to process.
 * @returns A new object or array with __typename properties removed.
 */
export const removeTypename = <T>(input: T): RecursiveOmitTypename<T> => {
  if (Array.isArray(input)) {
    return input.map(removeTypename) as RecursiveOmitTypename<T>
  }

  if (input && typeof input === 'object') {
    const { __typename, ...rest } = input as any
    return Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, removeTypename(value)])
    ) as RecursiveOmitTypename<T>
  }

  return input as RecursiveOmitTypename<T>
}
