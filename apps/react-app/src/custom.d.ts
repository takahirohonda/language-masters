// when extending global types/interfaces like Window, Document, or NodeJS.Global.
// We need this to make it module

export {}

declare global {
  interface Window {
    Cypress?: unknown
  }
}
