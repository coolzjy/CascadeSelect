import ESelect from '../ESelect'

class Tabs extends ESelect {
  get tagName () { return 'div' }

  get styleSheet () {
    return `:scope {
      display: flex;
      position: relative;
      top: 1px;
      cursor: default;
      user-select: none;
    }`
  }

  setTypes (types) {
    this.innerHTML = ''
    this._refs = []
    types.forEach(name => {
      const tab = new Tab({ name, $parent: this }).to(this)
      tab.element.addEventListener('click', () => { this.$root.setType(name) })
      this._refs.push(tab)
    })
  }

  setType (type) {
    this._refs.forEach(tab => {
      tab.selected = tab.name === type
    })
  }
}

class Tab extends ESelect {
  get template () {
    return `<div>{name}</div>`
  }

  get styleSheet () {
    return `:scope {
      padding: 0 15px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #ddd;
      border-right: none;
      color: #999;
      &:last-child {
        border-right: 1px solid #ddd;
      }
      &.selected, &:hover.selected {
        border-bottom-color: #f8f8f8;
        background: #f8f8f8;
        color: #333;
      }
      &:hover {
        color: #333;
      }
    }`
  }

  set selected (b) {
    this.element.className = b ? 'selected' : ''
  }
}

export default Tabs
