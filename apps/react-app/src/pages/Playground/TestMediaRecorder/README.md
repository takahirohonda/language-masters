# Record sound with browser APIs.

## Need to know

### 1. MediaDevices

`navigator.mediaDevices`: returns a `MediaDevices` object, which provides access to connected media input devices like cameras, microphones and screen sharing.

```ts
console.log(navigator.mediaDevice)
```

`navigator.mediaDevices.getUserMedia()` will prompt the user for permission to use a media input and will produce `MediaStream`

[getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### 2. Get MediaDevice

```bash
TestMediaRecorder.tsx:29 Uncaught (in promise) TypeError: Failed to execute 'getUserMedia' on 'MediaDevices': At least one of audio and video must be requested
```

This is because I didn't pass the options to `getUserMedia`.

[Common getUserMedia() errors](https://blog.addpipe.com/common-getusermedia-errors/)

Example of handling different errors.

```js
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(function success(stream) {
    /* do stuff */
  })
  .catch(function (err) {
    //log to console first
    console.log(err) /* handle the error */
    if (err.name == 'NotFoundError' || err.name == 'DevicesNotFoundError') {
      //required track is missing
    } else if (err.name == 'NotReadableError' || err.name == 'TrackStartError') {
      //webcam or mic are already in use
    } else if (err.name == 'OverconstrainedError' || err.name == 'ConstraintNotSatisfiedError') {
      //constraints can not be satisfied by avb. devices
    } else if (err.name == 'NotAllowedError' || err.name == 'PermissionDeniedError') {
      //permission denied in browser
    } else if (err.name == 'TypeError' || err.name == 'TypeError') {
      //empty constraints object
    } else {
      //other errors
    }
  })
```
