# Custom Video Player

### Issues Found
* Keep dragging the progress bar while leaving the progress bar area, in this way `mouseup` event wouldn't be triggered with the progress bar. This causes a problem where if we move the cursor back to the progress bar, `mouseMove` state remains `true` and we are still able to scrub the progress bar, which seems a bit unreasonable to me. (*)

### Thoughts
* This can be fixed by disabling `mouseMove` in `mouseleave` event. However, it triggers some weird bugs if we reproduce the test (*), `mouseup` and `mousemove` event will not be triggered properly. This is because when we dragging and leaving the progress bar, some elements are selected, that's why when we move the cursor back to the progress bar, mouse events aren't triggered properly. I fixed this issue by adding `user-select:none` onto all elements. This seems to be a common issue with drag-and-drops, which is worth knowing.

### Extended Features
* Added fullscreen button.