const { Transform } = require('node:stream')

const JSONStream = (opts = {}) => new Transform({
    ...opts,
    writableObjectMode: false,
    readableObjectMode: true,
    transform (data, encoding, done) {
      if (!Buffer.isBuffer(data)) data = Buffer.from(data);
      if (this._buffer) {
        data = Buffer.concat([this._buffer, data]);
      }
      let ptr = 0
      let start = 0

      while (++ptr <= data.length) {
        if (data[ptr] === 10 || ptr === data.length) {
          let line = ''
          try {
            line = JSON.parse(data.slice(start, ptr))
          }
          catch (error) { }
          if (line) {
            this.push(line)
            line = null
          }
          if (data[ptr] === 10) start = ++ptr
        }
      }
      this._buffer = data.slice(start)
      opts?.async ? setImmediate(done) : done()
    }
  })

module.exports = JSONStream
JSONStream.JSONStream = JSONStream