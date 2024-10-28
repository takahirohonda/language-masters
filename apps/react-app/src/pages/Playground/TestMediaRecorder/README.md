# Record sound with browser APIs.

## Need to know

### 1. MediaDevices

`navigator.mediaDevices`: returns a `MediaDevices` object, which provides access to connected media input devices like cameras, microphones and screen sharing.

```ts
console.log(navigator.mediaDevice)
```

`navigator.mediaDevices.getUserMedia()` will prompt the user for permission to use a media input and will produce `MediaStream`

[getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
