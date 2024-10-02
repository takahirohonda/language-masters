import { render } from '@testing-library/react'

import ComponentSentenses from './component-sentenses'

describe('ComponentSentenses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentSentenses />)
    expect(baseElement).toBeTruthy()
  })
})
