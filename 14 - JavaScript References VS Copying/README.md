# References VS Copying

### Thoughts
Here is a simpler version of `deepClone`:
```js
function deepClone(obj, copy = {}) {
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            copy[key] = [];
            deepClone(obj[key], copy[key]);
        } else if (typeof obj[key] === 'object') {
            copy[key] = {};
            deepClone(obj[key], copy[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}
```