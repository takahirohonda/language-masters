import { Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

export const TestMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [mediaRecorderState, setMediaRecorderState] =
    useState<RecordingState>('inactive')

  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [audioSource, setAudioSource] = useState<string | null>()
  const [isAudioReady, setIsAudioReady] = useState(false)

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
      setRecordedChunks([])
      setIsAudioReady(false)
      mediaRecorder.start()

      setMediaRecorderState('recording')

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data])
        }
      }
      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType
        console.log(mimeType)
        // Create a Blob only after stopping the recording and finalizing all chunks
        const audioBlob = new Blob(recordedChunks, { type: mimeType })
        const audioSourceURL = URL.createObjectURL(audioBlob)
        setAudioSource(audioSourceURL)
        setIsAudioReady(true)
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
  }, [mediaRecorder, mediaRecorderState, recordedChunks])

  const handleStop = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }

    setMediaRecorderState('inactive')
    mediaRecorder.stop()
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
    <div className="flex flex-col gap-[24px]">
      <div className="flex gap=[16px]">
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
      </div>
      <div>
        {mediaRecorderState && (
          <p>Current recording state is: {mediaRecorderState}</p>
        )}
      </div>
      <div>
        {isAudioReady && <audio controls src={audioSource ?? undefined} />}
      </div>
    </div>
  )
}
