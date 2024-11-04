# Record sound with browser APIs.

## Need to know

### 1. Media capture and streams API (Media Stream)

[Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API)

### 2. MediaDevices

`navigator.mediaDevices`: returns a `MediaDevices` object, which provides access to connected media input devices like cameras, microphones and screen sharing.

```ts
console.log(navigator.mediaDevice)
```

`navigator.mediaDevices.getUserMedia()` will prompt the user for permission to use a media input and will produce `MediaStream`

[getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### 3. Get MediaDevice

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

### 4. Using the recorded data

The recording is captured as [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob). `new Blob(arrayObj)` will create a blob containing a concatenation of all of the data in the array.

[`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

```js
let mediaRecorder: MediaRecorder;
const recordedChunks: BlobPart[] = [];

navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    mediaRecorder = new MediaRecorder(stream);

    // Capture data as it becomes available
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Start recording
    mediaRecorder.start();
    console.log("Recording started");

    // Optional: Stop recording after a certain time
    setTimeout(() => {
      mediaRecorder.stop();
      console.log("Recording stopped");
    }, 5000); // Stop after 5 seconds, for example
  })
  .catch((error) => {
    console.error("Error accessing media devices:", error);
  });

// Step 2: Listen for the 'stop' event to create a Blob and play the audio
mediaRecorder.onstop = () => {
  // Create a Blob from the recorded audio chunks
  const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' }); // or 'audio/ogg' if supported

  // Generate a URL for the Blob
  const audioUrl = URL.createObjectURL(audioBlob);

  // Step 3: Create an audio element and play the audio
  // new Audio creates and returns anew HTMLAudioElement (https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio)
  const audio = new Audio(audioUrl);
  audio.play().then(() => {
    console.log("Playing recorded audio");
  }).catch((error) => {
    console.error("Error playing audio:", error);
  });
};
```

### 5. In React

Using `mediaRecorder.onStop()` with recorded data in the local state doesn't work because the data becomes out of sync (see ![this](./TestMediaRecorder__onStop_doesNotWork.tsx)).
