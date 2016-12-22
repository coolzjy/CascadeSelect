# CascadingSelect

a cascading dropdown list, [demo page](https://ppq1991.github.io/CascadeSelect/).

### basic usage

##### CDN

ES6 (lastest)
`http://unpkg.com/cascading-select/lib/index.js`

ES6 (with version)
`https://unpkg.com/cascading-select@1.0.0-beta.2/lib/index.js`

ES5
`https://unpkg.com/cascading-select@1.0.0-beta.2/lib/index.es5.js`

ES5 + uglifyJS
`http://npm.elemecdn.com/uglifyjs!cascading-select@1.0.0-beta.2/lib/index.es5.js`

##### npm

```
npm i cascading-select
```

```javascript
const CascadingSelect = require('cascading-select')
```

##### quick start

```javascript
const data = [/* data */]

const select = new CascadingSelect({ data }).to(document.body)

select.onChange = arr => { console.log(arr) }

console.log(select.selected)
```

###### data struct

run [seed.js](./mock/seed.js) to generate test data (browser / nodejs)

or directly see [demo page](https://ppq1991.github.io/CascadeSelect/) , this page will use random data in each visit.

```json
[
  {
    "name": "[group name]",
    "struct": ["[level-0-name]", "[level-1-name]"],
    "data": {
      "0": {
        "0": [{ "i": "[id]", "n": "[name]" }]
      },
      "1": {
        "[parent id]": [{ "i": "[id]", "n": "[name]" }]
      }
    }
  }
]

```
