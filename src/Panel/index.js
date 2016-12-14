import Jinkela from 'jinkela'
import Tabs from './Tabs'
import Tags from './Tags'

class Panel extends Jinkela {
  get Tabs () { return Tabs }
  get Tags () { return Tags }

  get template () {
    return `
    <div on-item-remove="{click}">
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
          visibility: hidden;
          cursor: pointer;
          width: 80px;
          transition: color .3s;
          &:hover {
            color: #03a9f4;
          }
        }
      }
      &.edit-mode [jinkela-tag] {
        animation: shake .2s infinite;
        position: relative;
        cursor: pointer;
        &:after {
          content: 'x';
          position: absolute;
          right: -4px;
          top: -4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          line-height: 12px;
          text-align: center;
          background: #17bf9d;
        }
      }
      &.edit-mode [jinkela-clear] {
        visibility: visible;
      } 
    }
    @keyframes shake {
      0 { transform: rotate(0) }
      25% { transform: rotate(-1deg) }
      50% { transform: rotate(0) }
      75% { transform: rotate(1deg) }
      100% { transform: rotate(0) }
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

  set modal (modal) {
    this.element.classList.remove('edit-mode')
  }

  clear () {
    this.element.dispatchEvent(new CustomEvent('item-clear', { bubbles: true }))
  }

  click (e) {
    if (!this.element.classList.contains('edit-mode')) {
      this.element.classList.add('edit-mode')
      e.stopPropagation()
    }
  }
}

module.exports = Panel
