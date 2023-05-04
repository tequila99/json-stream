# json-stream


New line-delimeted JSON parser with a stream interface.

(some minor improvements for this package: https://github.com/mmalecki/json-stream)
## Installation

    npm install json-stream

## Usage
```js
const JSONStream = require('@tequila99/json-stream');

const stream = JSONStream();

stream.on('data', function (chunk) {
  console.dir(chunk);
});
stream.write('{"a":');
stream.write('42}\n');
stream.write('{"hel');
stream.write('lo": "world"}\n');
```

Will output:
```
{ a: 42 }
{ hello: 'world' }
```

If invalid JSON gets written, it's silently ignored.