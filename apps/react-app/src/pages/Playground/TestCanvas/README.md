# Testing Canvas in React..

In progress...

Going through Mdn Tutorial

[] Basic usage of canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

# REFERENCE

[Using Canvas in React](https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258)
[Canvas Lib List](https://webdesign.tutsplus.com/best-free-canvas-libraries-in-javascript--cms-37317a)

# Code snippets

## 1. Basic example

```tsx
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
```
