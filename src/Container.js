import ESelect from './ESelect'

import Search from './Search'
import Panel from './Panel'

class Container extends ESelect {
  get Search () { return Search }
  get Panel () { return Panel }

  get template () {
    return `
    <div>
      <jkl-search $ref></jkl-search>
      <jkl-panel types="{types}" $ref></jkl-panel>
    </div>
    `
  }

  get styleSheet () {
    return `:scope {
      display: flex;
      color: #666;
      line-height: 26px;
      font-size: 12px;
      text-align: center;
      * {
        box-sizing: border-box;
      }
    }`
  }

  set option (v) {
    if (Array.isArray(v)) {
      v = { data: v }
    }
    if (!v || !v.data) {
      throw new Error('invalid option', v)
    }
    this._option = v
    this.setData(v.data)
    this.setTypes(v.data.map(d => d.name))
  }

  init () {
    this.selected = []

    document.body.addEventListener('click', this.backgroundClick.bind(this))
  }

  destroy () {
    document.body.removeEventListener(this.backgroundClick)
  }

  backgroundClick () {
    this.$search.backgroundClick()
  }

  itemSelect (item) {
    console.log('item select', item)
    // item.type = this.currentType
    // item.selected = true
    // item.node.classList.add('selected')
    // this.$panel.addTag(item)
    // this.selected.push(item)
  }

  itemRemove (item) {
    console.log('item remove', item)
    // item.selected = false
    // item.node.classList.remove('selected')
    // item.tag && item.tag.element.remove()
    // delete item.tag
    // this.selected = this.selected.filter(s => s.i === item.i && s.level === item.level)
  }

  setData (data) {
    this.$search.setData(data)
  }

  setTypes (types) {
    this.$search.setTypes(types)
    this.$panel.setTypes(types)
    this.setType(types[0])
  }

  setType (type) {
    this.currentType = type
    this.$search.setType(type)
    this.$panel.setType(type)
  }
}

export default Container
