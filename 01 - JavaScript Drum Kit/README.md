# JS Drum Kit

### Issue found
If consistently hit one key, the `playing` class won't be removed as it should be, so the key always stays highlighted.

### Thoughts
The same issue was found [here](https://stackoverflow.com/questions/43966150/bug-with-transitionend-event-not-correctly-removing-a-css-class). *shaochuancs*'s [answer](https://stackoverflow.com/a/43971687/8893023) inspired me of the way to fix it.

The issue is due to if the keyboard event is triggered too frequently, it will disrupt the transition process and cause the weird bug. The idea is to prevent the keyboard event when a transition is still in action. Here is a snippet from the original answer:
```js
if (underTransitionVal === 2) {
    setTimeout(function() {
        keysUnderTransition[dataKey] = 1;
    }, 50);
} else if (underTransitionVal === 1) {
    keysUnderTransition[dataKey] = 0;
}
```
What I thought can be improved from here is that we should avoid using `setTimeout`. There are two reasons:
1. We always need to adapt the delayed time to the duration of the transition.
2. `setTimeout` always waits for the other "blocking" activities to finish first, hence whatever time value we specify here isn't accurate (the actual waiting time could be larger than that).

This handler is attached to `transitionend` event. If we look up the MDN [docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event), you will find out:

> The transitionend event is fired in both directions - as it finishes transitioning to the transitioned state, 
> and when it fully reverts to the default or non-transitioned state.

According to this, each time a key is hit, the `transitionend` event is fired twice - you can also print logs to verify. The process of the transition is: transition start -> transitioned -> non-transitioned. With this in mind, we can remove the `setTimeout` like this:
```js
let keyCode = e.target.dataset.key;
keysUnderTransition[keyCode]--;

if(keysUnderTransition[keyCode] < 0) {
    keysUnderTransition[keyCode] = 0;
}else if(keysUnderTransition[keyCode] === 0) {
    e.target.classList.remove('playing');
}
```
I have also removed some extra checks from [this fiddle](https://jsfiddle.net/cshao/73qyofzk/1/) provided by shaochuancs. My app works fine without the extra checks.




