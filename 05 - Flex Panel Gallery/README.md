# Flex Panel Gallery

### Issues found
1. IMO, clicking to toggle the anmiation on/off offers bad user experience. It came off cumbersome to interact with the gallery.
2. With toggling classes on/off, the `font-size` transition actually doesn't get fully animated. The reason is that after `font-size` transition has completed, the top and bottom text then get back to their positions.

### Thoughts
This project is a good exercise on CSS flexbox. In my solution, I completely avoided using JS to fix the above issues, instead I used CSS (`:hover`) only.