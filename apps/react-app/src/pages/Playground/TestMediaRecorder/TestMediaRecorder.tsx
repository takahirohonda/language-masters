import { Button, Typography } from '@mui/material'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

export const TestMediaRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [mediaRecorderState, setMediaRecorderState] =
    useState<RecordingState>('inactive')

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
        const recordedChunks = []
        if (e.data.size > 0) {
          recordedChunks.push(e.data)
          console.log(`checking the recoded chunks: ${recordedChunks}`)
          const audioBlob = new Blob(recordedChunks, {
            type: mediaRecorder.mimeType,
          })
          console.log(`checking audioBlob: ${audioBlob}`)
          const audioSourceURL = URL.createObjectURL(audioBlob)
          if (audioRef.current) {
            console.log(`checking audioSourceUrl: ${audioSourceURL}`)
            audioRef.current.src = audioSourceURL
            audioRef.current.load()
          }
          setIsAudioReady(true)
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
  }, [mediaRecorder, mediaRecorderState])

  const handleStop = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }

    setMediaRecorderState('inactive')
    mediaRecorder.stop()

    mediaRecorder.onstop = () => {
      setIsAudioReady(true)
      setRecordedChunks([])
    }
  }, [mediaRecorder])

  const handlePause = useCallback(() => {
    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized')
      return
    }
    if (['paused', 'inactive'].includes(mediaRecorderState)) {
      return
    }
    mediaRecorder.pause()
    setMediaRecorderState('paused')
  }, [mediaRecorder, mediaRecorderState])

  return (
    <div className="flex flex-col gap-[24px]">
      <Typography variant="h4">Test Media Recorder</Typography>
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[16px]">
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
            Pause...
          </Button>
        </div>
        <div>
          {mediaRecorderState && (
            <p>Current recording state is: {mediaRecorderState}</p>
          )}
        </div>
        <div>
          <audio
            controls
            ref={audioRef}
            className={clsx(`${isAudioReady ? 'visible' : 'hidden'}`)}
          />
        </div>
      </div>
    </div>
  )
}
