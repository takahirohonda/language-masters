import { removeTypename } from './removeTypename'

describe('removeTypename', () => {
  it('should remove __typename from a simple object', () => {
    const input = { __typename: 'TypeName', key: 'value' }
    const expected = { key: 'value' }

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should remove __typename from nested objects', () => {
    const input = {
      __typename: 'TypeName',
      key: {
        __typename: 'NestedType',
        nestedKey: 'nestedValue',
      },
    }
    const expected = {
      key: {
        nestedKey: 'nestedValue',
      },
    }

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should remove __typename from arrays', () => {
    const input = [
      { __typename: 'Type1', key: 'value1' },
      { __typename: 'Type2', key: 'value2' },
    ]
    const expected = [{ key: 'value1' }, { key: 'value2' }]

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should remove __typename from nested arrays and objects', () => {
    const input = {
      __typename: 'TypeName',
      items: [
        {
          __typename: 'NestedType1',
          nestedKey: { __typename: 'NestedType2', key: 'value' },
        },
      ],
    }
    const expected = {
      items: [
        {
          nestedKey: { key: 'value' },
        },
      ],
    }

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should handle null values', () => {
    const input = {
      __typename: 'TypeName',
      key: null,
    }
    const expected = { key: null }

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should handle primitive values in arrays', () => {
    const input = [1, 2, { __typename: 'TypeName', key: 'value' }]
    const expected = [1, 2, { key: 'value' }]

    expect(removeTypename(input)).toEqual(expected)
  })

  it('should return the same value for primitive types', () => {
    expect(removeTypename(42)).toEqual(42)
    expect(removeTypename('test')).toEqual('test')
    expect(removeTypename(null)).toEqual(null)
  })
})
