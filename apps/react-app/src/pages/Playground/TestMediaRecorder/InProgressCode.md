```tsx
import { Button } from '@mui/material'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

export const TestMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [mediaRecorderState, setMediaRecorderState] = useState<RecordingState>('inactive')

  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [isAudioReady, setIsAudioReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
  useEffect(() => {
    console.log('Recorded chunks updated:', recordedChunks)
  }, [recordedChunks])

  const handleRecord = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }

    if (mediaRecorderState === 'inactive') {
      setIsAudioReady(false)
      mediaRecorder.start()
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => {
            const updatedChunks = [...prev, e.data]
            console.log(`Updated recorded chunks:`, updatedChunks)
            return updatedChunks
          })
          console.log(`checking the recorder data size: ${e.data.size}`)
          console.log(`checking the recorder data type: ${typeof e.data}`)
          console.log(`checking the recoded chunks: ${recordedChunks}`)
        }
      }
      setMediaRecorderState('recording')

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
  }, [mediaRecorder, mediaRecorderState, recordedChunks])

  const handleStop = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }

    setMediaRecorderState('inactive')
    mediaRecorder.stop()

    mediaRecorder.onstop = () => {
      const mimeType = mediaRecorder.mimeType
      console.log(mimeType)
      // Create a Blob only after stopping the recording and finalizing all chunks
      console.log(`checking recordedChunks size: ${recordedChunks.length}`)
      const audioBlob = new Blob(recordedChunks, { type: mimeType })
      console.log(`checking audioBlob: ${audioBlob}`)
      const audioSourceURL = URL.createObjectURL(audioBlob)
      if (audioRef.current) {
        console.log(`checking audioSourceUrl: ${audioSourceURL}`)
        // const link = document.createElement('a')
        // link.href = audioSourceURL
        // link.download = 'recording.wav'
        // link.click()
        audioRef.current.src = audioSourceURL
        // audioRef.current.currentTime = 0
        audioRef.current.load()
      }
      setIsAudioReady(true)
      setRecordedChunks([])
    }
  }, [mediaRecorder, recordedChunks])

  const handlePause = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }
    mediaRecorder.pause()
    setMediaRecorderState('paused')
  }, [mediaRecorder])

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex gap=[16px]">
        <Button variant="contained" color="primary" onClick={handleRecord} disabled={mediaRecorderState === 'recording'}>
          {mediaRecorderState === 'paused' ? <p>Resume</p> : <p>Record</p>}
        </Button>
        <Button variant="contained" color="error" onClick={handleStop}>
          Stop
        </Button>
        <Button variant="contained" color="warning" onClick={handlePause}>
          Pause
        </Button>
      </div>
      <div>{mediaRecorderState && <p>Current recording state is: {mediaRecorderState}</p>}</div>
      <div>
        <audio controls ref={audioRef} className={clsx(`${isAudioReady ? 'visible' : 'hidden'}`)} />
      </div>
    </div>
  )
}
```
