import Jinkela from 'jinkela'

class Component extends Jinkela {
  // register components
  get Dropdown () { return require('./Dropdown') }
  get Search () { return require('./Search') }
  get Panel () { return require('./Panel') }

  get template () {
    return `
    <div>
      <div jinkela-search>
        <jkl-dropdown types="{_types}" current="{_currentType}"></jkl-dropdown>
        <jkl-search data="{currentModel}" visible="{modal}" selected="{currentSelected}"></jkl-search>
      </div>
      <div jinkela-panel>
        <jkl-panel types="{_types}" current="{_currentType}" tags="{currentSelected}" selected="{selected}" modal="{modal}"></jkl-panel>
      </div>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      display: flex;
      line-height: 24px;
      font-size: 12px;
      color: #666;
      text-align: center;
      * {
        box-sizing: border-box;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        cursor: default;
        user-select: none;
      }
      li:hover { background: #f8f8f8; }
      li:active { background: #eee; }
      [jinkela-search] {
        display: flex;
        border: 1px solid #ddd;
        height: 26px;
      }
      [jinkela-panel] {
        flex: 1;
        padding-left: 15px;
        line-height: 20px;
      }
      .has-child:after {
        content: ">";
        margin-right: 5px;
        color: #aaa;
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }`
  }

  get data () { return this._data }
  set data (data) {
    if (typeof data !== 'object') {
      throw new Error('invalid data')
    }

    if (!Array.isArray(data)) {
      data = [data]
    }

    // prepare data
    prepare(data)

    this._data = data
    this.types = data.map(d => d.name)
  }

  get types () { return this._types }
  set types (types) {
    this._types = types
    this.currentType = types[0]
  }

  get currentType () { return this._currentType }
  set currentType (type) {
    this._currentType = type
    this.data.forEach(d => {
      if (d.name === type) {
        this.currentModel = d
      }
    })
  }

  init () {
    this.selected = []

    document.body.addEventListener('click', () => { this.modal = false })

    this.element.addEventListener('type-change', this.typeChange.bind(this))
    this.element.addEventListener('item-select', this.addSelect.bind(this))
    this.element.addEventListener('item-remove', this.removeSelect.bind(this))
    this.element.addEventListener('item-clear', this.clearSelect.bind(this))
    this.element.addEventListener('tab-clear', this.clearTab.bind(this))
  }

  typeChange (e) {
    this.currentType = e.detail
    this.refreshCurrentSelected()
  }

  clearTab (e) {
    this.selected = this.selected.filter(s => s.type !== e.detail)
    this.refreshCurrentSelected()
  }

  addSelect (e) {
    const item = e.detail
    item.type = this.currentType
    if (!this.containsSelect(item)) {
      this.selected.push(item)
      this.refreshCurrentSelected()
    }
  }

  removeSelect (e) {
    const item = e.detail
    item.type = this.currentType
    this.selected = this.selected.filter(s => !isEqual(item, s))
    this.refreshCurrentSelected()
  }

  clearSelect () {
    this.selected = []
    this.currentSelected = []
  }

  containsSelect (a) {
    return this.selected.some(b => isEqual(a, b))
  }

  refreshCurrentSelected () {
    this.currentSelected = this.selected.filter(s => s.type === this.currentType)
  }
}

function isEqual (a, b) {
  return a.i === b.i && a.type === b.type && a.level === b.level
}

function prepare (data) {
  data.forEach(raw => {
    raw.flat = []
    raw.struct.forEach((title, level) => {
      for (let id in raw.data[level]) {
        raw.data[level][id].forEach(item => {
          item.level = level
          item.title = title
          item.hasChild = raw.data[level + 1] && raw.data[level + 1][item.i]
          raw.flat.push(item)
        })
      }
    })
  })
}

module.exports = Component
