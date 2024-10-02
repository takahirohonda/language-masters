// instead of .d.ts, we define the file with .ts to be imported explicitly
export {}

declare global {
  interface Window {
    WhateverNew: unknown
  }
}
