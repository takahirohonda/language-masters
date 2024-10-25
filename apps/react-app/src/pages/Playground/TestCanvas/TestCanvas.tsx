import { useEffect, useRef } from 'react'

interface TestCanvasProps {
  width: string
  height: string
}

export const TestCanvas = ({ width, height }: TestCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'red'
        ctx.fillRect(30, 30, 50, 50)
      }
    }
  }, [])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}
