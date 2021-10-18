# Slide in on Scroll

### Thoughts
* `debounce` is a function wrapper which delays calling the wrapped function if a follow-up call is triggered within `wait` peroid. This is why `scroll` event gets called much less often than usual. `immediate` can be set to `false`, this means going to the `wait` status immediately without triggering a starting call.
* It's a lot easier in math if use `getBoundingClientRect` to calculate the scroll height.