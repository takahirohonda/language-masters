import { Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

export const TestMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [mediaRecorderState, setMediaRecorderState] =
    useState<RecordingState>('inactive')

  useEffect(() => {
    const mediaDevices = navigator.mediaDevices
    if (!mediaDevices) {
      console.error('getUserMedia is not supported')
      return
    }
    mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream)
      setMediaRecorder(mediaRecorder)
    })
  }, [])

  const handleRecord = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }

    if (mediaRecorderState === 'inactive') {
      mediaRecorder.start()
      setMediaRecorderState('recording')
      mediaRecorder.ondataavailable = (e) => {
        console.log(e.data)
      }
      return
    }

    if (mediaRecorderState === 'paused') {
      mediaRecorder.resume()
      setMediaRecorderState('recording')
      return
    }

    if (mediaRecorderState === 'recording') {
      return
    }
  }, [mediaRecorder, mediaRecorderState])

  const handleStop = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }
    mediaRecorder.stop()
    setMediaRecorderState('inactive')
  }, [mediaRecorder])

  const handlePause = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }
    mediaRecorder.pause()
    setMediaRecorderState('paused')
  }, [mediaRecorder])

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRecord}
        disabled={mediaRecorderState === 'recording'}
      >
        {mediaRecorderState === 'paused' ? <p>Resume</p> : <p>Record</p>}
      </Button>
      <Button variant="contained" color="error" onClick={handleStop}>
        Stop
      </Button>
      <Button variant="contained" color="warning" onClick={handlePause}>
        Pause
      </Button>
      <div>
        {mediaRecorderState && (
          <p>Current recording state is: {mediaRecorderState}</p>
        )}
      </div>
    </div>
  )
}
