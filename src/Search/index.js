var Jinkela = require('jinkela')

class Search extends Jinkela {
  get Selects () { return require('./Selects') }

  get template () {
    return `
    <div>
      <input type="search" on-input="{input}" on-click="{click}" />
      <jkl-selects data="{_data}" flat="{_flat}" keyword="{keyword}" visible="{visible}" selected="{selected}"></jkl-selects>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      > input {
        border: none;
        outline: none;
        padding: 0 5px;
      }
    }`
  }

  input ({ target }) {
    this.keyword = target.value.trim()
  }

  click (e) {
    this.visible = true
    e.stopPropagation()
  }

  set data (data) {
    if (data) {
      this._data = data.data
      this._flat = data.flat
    }
  }
}

module.exports = Search
