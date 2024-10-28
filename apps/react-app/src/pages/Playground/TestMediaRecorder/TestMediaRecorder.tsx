import { Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

export const TestMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  useEffect(() => {
    const mediaDevices = navigator.mediaDevices
    if (!mediaDevices) {
      console.error('getUserMedia is not supported')
      return
    }

    mediaDevices.getUserMedia().then((stream) => {
      const mediaRecorder = new MediaRecorder(stream)
      setMediaRecorder(mediaRecorder)
      mediaRecorder.ondataavailable = (e) => {
        console.log(e.data)
      }
      mediaRecorder.start()
    })
  }, [])

  const handleRecord = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }
    mediaRecorder.ondataavailable = (e) => {
      console.log(e.data)
    }
    mediaRecorder.start()
  }, [])
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleRecord}>
        Record
      </Button>
    </div>
  )
}
