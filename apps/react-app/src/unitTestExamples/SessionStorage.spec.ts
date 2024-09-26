import { getSessionStorageItem, setSessionStorageItem } from './SessionStorage'

describe('SessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  describe('getSessionStorageItem', () => {
    it('should return parsed JSON when a valid value is stored', () => {
      const key = 'testKey'
      const value = { name: 'John', age: 30 }
      sessionStorage.setItem(key, JSON.stringify(value))

      const result = getSessionStorageItem(key)
      expect(result).toEqual(value)
    })

    it('should return undefined if the item does not exist in sessionStorage', () => {
      const result = getSessionStorageItem('nonExistentKey')
      expect(result).toBeUndefined()
    })

    it('should return undefined if the stored value is "undefined"', () => {
      const key = 'testKey'
      sessionStorage.setItem(key, 'undefined')

      const result = getSessionStorageItem(key)
      expect(result).toBeUndefined()
    })

    it('should return undefined if the stored value is invalid JSON', () => {
      const key = 'testKey'
      sessionStorage.setItem(key, 'invalid json string')

      const result = getSessionStorageItem(key)
      expect(result).toBeUndefined()
    })

    it('should replace occurrences of "undefined" in the stored value with "null"', () => {
      const key = 'testKey'
      const valueWithUndefined = '{"name":"John","age":undefined}'
      const expectedValue = { name: 'John', age: null }
      sessionStorage.setItem(key, valueWithUndefined)

      const result = getSessionStorageItem(key)
      expect(result).toEqual(expectedValue)
    })
  })

  describe('setSessionStorageItem', () => {
    it('should store a stringified object in sessionStorage', () => {
      const key = 'testKey'
      const value = { name: 'John', age: 30 }

      setSessionStorageItem(key, value)

      const storedValue = sessionStorage.getItem(key)
      expect(storedValue).toEqual(JSON.stringify(value))
    })

    it('should store a stringified primitive value in sessionStorage', () => {
      const key = 'testKey'
      const value = 123

      setSessionStorageItem(key, value)

      const storedValue = sessionStorage.getItem(key)
      expect(storedValue).toEqual(JSON.stringify(value))
    })

    it('should store a stringified array in sessionStorage', () => {
      const key = 'testArray'
      const value = [1, 2, 3, 4]

      setSessionStorageItem(key, value)

      const storedValue = sessionStorage.getItem(key)
      expect(storedValue).toEqual(JSON.stringify(value))
    })

    it('should handle storing null correctly', () => {
      const key = 'testKey'

      setSessionStorageItem(key, null)

      const storedValue = sessionStorage.getItem(key)
      expect(storedValue).toEqual('null')
    })
  })
})
