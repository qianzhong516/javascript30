# JS Clock

### Issues found
1. When three hands overlap each other, `hour-hand` is covered by `min-hand`, and both of them are covered by `second-hand`.
2. When a hand has finished rotating for a full circle, it makes a very quick spin on the screen. There are two causes. One is the "absolute" rotation value. For instance, if we look at `second-hand`:
    ```js
    const secondsDegrees = seconds * 6 + 90;
    ```
    `getSeconds()` only returns 0 - 59. When the number switches from 59 to 0, the `second-hand` will spin for an extra circle to roll back to the initial 90 degrees. The other cause is the `transition`, because we have set up the animation, that's why this mistake is now visible.

### Thoughts
1. The solution for this one is simple. The longest hand should be at the top in the html file and so on so forth. All we need to do is just to change the order of HTML code.
2. Let's continue using `second-hand` as an example. To make the degrees continuous, each time the `seconds` becomes `0`, increase the total degrees by `360`.

### Extended Features
There is an obvious feature we can improve here - In reality, 3 hands should be in different lengths. Once we try to change the width of each hand, they turn out to be off-position again. This can be fixed by `translateX`. However, some simple math needs to be done here to make sure each hand correctly sets in the middle point again. I have found out `calc` works out well for me.