import { render, screen } from '@testing-library/react'
import { TestWindowObject } from './TestWindowObject'

describe('TestWindowObject', () => {
  afterEach(() => {
    // otherwise this will leak between tests as
    // jest runs tests in a global environment by default
    delete window.Cypress
  })
  it('should render the window object', () => {
    window.Cypress = true
    render(<TestWindowObject />)

    expect(screen.getByText('true')).toBeVisible()
  })
  it('should render false if there is no cy.Cypress', () => {
    render(<TestWindowObject />)

    expect(screen.getByText('false')).toBeVisible()
  })
})
