import './window'

describe('checking', () => {
  it('should check window object', () => {
    // Property 'WhateverNew' does not exist on type 'Window & typeof globalThis'.
    // without importing a type file
    // Alternatively add files: [..pathToTheTypeFile]
    expect(window.WhateverNew).toBeUndefined()
  })
})
