import Jinkela from 'jinkela'
import Tabs from './Tabs'
import Tags from './Tags'

class Panel extends Jinkela {
  get Tabs () { return Tabs }
  get Tags () { return Tags }

  get template () {
    return `
    <div>
      <div>
        <jkl-tabs types="{_types}"></jkl-tabs>
        <div jinkela-clear on-click="{clear}">清除全部</div>
      </div>
      <jkl-tags data="{_tags}"></jkl-tags>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      border: 1px solid #ddd;
      visibility: hidden;
      > div {
        display: flex;
        [jinkela-clear] {
          cursor: pointer;
          width: 80px;
        }
      }
    }`
  }

  set tags (tags) {
    if (tags) {
      this._tags = tags
      this._types = this.types.map(name => {
        return {
          name,
          selected: name === this.current,
          count: this.selected.filter(s => s.type === name).length
        }
      })
      this.element.style.visibility = this.selected && this.selected.length ? 'visible' : 'hidden'
    }
  }

  clear () {
    this.element.dispatchEvent(new CustomEvent('item-clear', { bubbles: true }))
  }
}

module.exports = Panel