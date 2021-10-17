# Key Sequence Detection

### Issues Found
* I found it's hard to understand this line from the original solution:
    ```js
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    ```
    To be honest, it works in a such bizarre way which has no readability. When `pressed.length` is less than `secretCode.length`, this line does nothing. Once `pressed.length` is greater than `secretCode.length` by 1 unit, it always splice the first extra letter off the `pressed` array. It's not intuitive at all, is it?

### Thoughts
* Isn't this much easier to understand?

    ```js
    pressed.splice(0, pressed.length - secretCode.length);
    ```