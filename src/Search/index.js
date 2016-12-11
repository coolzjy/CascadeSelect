import ESelect from '../ESelect'

import Dropdown from './Dropdown'
import Input from './Input'
import Selects from './Selects'

class Search extends ESelect {
  get Dropdown () { return Dropdown }
  get Input () { return Input }

  get template () {
    return `
    <div on-input="{search}">
      <jkl-dropdown $ref></jkl-dropdown>
      <jkl-input $ref on-click="{inputClick}"></jkl-input>
    </div>
    `
  }

  get styleSheet () {
    return `:scope {
      width: 300px;
      height: 26px;
      display: flex;
      border: 1px solid #ddd;
    }`
  }

  get model () { return this._model[this.type] }
  set model (v) { this._model[this.type] = v }

  get flat () { return this._flat[this.type] }
  set flat (v) { this._flat[this.type] = v }

  init () {
    this.$selects = new Selects({ $parent: this }).to(document.body)
  }

  setData (data) {
    // TODO: init $selects status
    this._model = {}
    this._flat = {}

    data.forEach(d => {
      this._model[d.name] = d
      const flat = []
      d.struct.forEach((title, index) => {
        for (let id in d.data[index]) {
          d.data[index][id].forEach(item => {
            item.title = title
            item.level = index
            flat.push(item)
          })
        }
      })
      this._flat[d.name] = flat
    })
  }

  setTypes (data) {
    this.$dropdown.data = data
    this.$dropdown.text = data[0]
  }

  setType (type) {
    this.type = type
    this.$dropdown.text = type
  }

  inputClick (e) {
    e.stopPropagation()

    const { top, left, height } = this.$input.element.getBoundingClientRect()
    const position = {
      top: top + height + window.pageYOffset,
      left: left + window.pageXOffset
    }

    this.$selects.show({ position, index: 0, data: this.flat })
  }

  itemHover ({ target, detail }) {
    if (detail.level >= this.model.struct.length - 1) {
      if (detail.index === 0) { this.$selects.removeBy(1) }
      return
    }

    const data = this.model.data[detail.level + 1][detail.i]
    if (!data || !data.length) { return }

    const { top, left, width } = target.getBoundingClientRect()
    this.$selects.show({
      data,
      index: detail.index + 1,
      position: {
        top: top + window.pageYOffset,
        left: left + width + window.pageXOffset
      }
    })
  }

  search ({ target }) {
    // TODO: debounce
    const data = this.flat.filter(d => d.n.indexOf(target.value) >= 0)
    this.$selects.set(0, data)
  }

  backgroundClick () {
    this.$selects.removeBy(0)
    this.$dropdown.show = false
  }
}

export default Search
