import '@language-masters/design-system-styles'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { VoiceRecorder } from './VoiceRecorder/VoiceRecorder'
import { Layout } from './Layout/Layout'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.MODE === 'development' ? '/' : 'voice-recorder'}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<VoiceRecorder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
