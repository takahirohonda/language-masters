import { useEffect, useState } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWindowObject } from './TestWindowObject'

describe('TestWindowObject', () => {
  beforeEach(() => {
    window.Cypress = undefined
  })
  it('should render the window object', () => {
    window.Cypress = true
    render(<TestWindowObject />)

    screen.getByText('true')
  })
  it('should render false if there is no cy.Cypress', () => {
    render(<TestWindowObject />)

    screen.getByText('false')
  })
})
