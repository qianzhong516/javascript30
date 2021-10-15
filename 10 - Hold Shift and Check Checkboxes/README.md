# Hold Shift and Check Checkboxes

### Issues Found
1. Hold down shift key and select the very first item when the application starts, all the items under the selected items will be selected as well. This is because `inBetween` is turned to `true` but is never turned back to `false`.
2. Select the item with index `2`, hold down shift and select the item with index `4`. Unselect the item with index `3`, then hold down shift and select the item with index `0`. The item with index `3` remains unchecked in this case, but the multi-select event triggers on item with index `0` and `1`.

### Thoughts 
1. The first issue can be solved by checking if `lastChecked` is defined.
2. In my opinion, item with index `3` should be checked as well. At least this is how it works in Gmail. In the original solution, the code will never check the last item in the range no matter if it's checked or not. To fix it, we need to know which item index comes the first and which item index comes the last. However, this fact is ignored in the original solution and we are not able to fix it just by adding a small patch. This is why I approached this question with item index based solution. I had a try without looking at the solution first and I do find my solution easier to understand and reproduce.

### What I've learnt
* It's good to know input `onClick` event can detect keyboard events as well. This helps save typing extra code.
* Transform the HTML collection to an array first and use `indexOf` to get the index of a node in a collection.