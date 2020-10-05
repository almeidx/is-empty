# @almeidx/is-empty

Checks if value is an empty object, collection, map, or set.

Objects are considered empty if they have no own enumerable string keyed properties.

Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.

```js
import isEmpty from '@almeidx/is-empty';
// or
const isEmpty = require('@almeidx/is-empty');

isEmpty(null);
// => true

isEmpty(true);
// => true

isEmpty(1);
// => true

isEmpty([1, 2, 3]);
// => false

isEmpty({ 'a': 1 });
// => false
```