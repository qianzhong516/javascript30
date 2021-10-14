# Console Tricks
Code | Notes
----- | ------
`console.warn` | Displays a warning message.
`console.error` | Displays an error message.
`console.info` | Displays an info message.
`console.assert(arg1, arg2)` | <ul><li>`arg1` - boolean expression</li> <li>`arg2` - error message</li></ul>
`console.dir` | Displays all the properties of an object.
`console.groupCollapsed(arg);` & `console.groupEnd(arg);` | Group logs altogether.
`console.count` | Displays the count of the same value.
`console.time(arg);` & `console.timeEnd(arg);`  | Evaluate time of executing some snippet of code. The same effect can be achieved by `performance.now()`.
`console.table` | Display an array of objects with the same properties in a table.