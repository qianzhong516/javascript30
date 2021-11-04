# Webcam Fun

## Takeaways

### Web Media
* `getUserMedia()` returns a `MediaStream` object.
* Pump the webcam's data into a video element:
    ```js
    video.srcObject = stream; // stream is a MediaStream object
    video.play();
    ```

### Canvas
* Canvas's resolution depends on the ratio between `canvas.width, canvas.height` and `canvas.style.width, canvas.style.height`.
* `ctx.drawImage()` accepts a video element and paints the video's content into the canvas.
* Modify the pixels within a canvas:
    * Get the pixels of each frame by `ctx.getImageData()`.
    * Modify the pixels of each frame.
    * Put the modified pixels back to the canvas using `ctx.putImageData()`.
* `canvas.toDataURL()` is used to convert a canvas into a base64 string representation of image data. 