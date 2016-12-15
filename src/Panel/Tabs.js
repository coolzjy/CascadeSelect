import Jinkela from 'jinkela'

class Tabs extends Jinkela {
  get tagName () { return 'ul' }

  get styleSheet () {
    return `:scope {
      display: flex;
      flex: 1;
      border-left: 1px solid #ddd;
      > li {
        padding: 0 10px;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        position: relative;
        background: #eee;
        &.selected {
          background: #fff;
          &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            width: 100%;
            height: 1px;
            background: #fff;
            left: 0;
          }
        }
        &:hover > i { display: block }
        > i {
          display: none;
          content: 'x';
          font-style: normal;
          position: absolute;
          z-index: 9;
          right: -4px;
          top: -4px;
          width: 12px;
          height: 12px;
          text-align: center;
          line-height: 12px;
          background: #ccc;
          color: #eee;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            background: #aaa;
            color: #fff;
          }
        }
        label {
          margin-left: 5px;
          &:before { content: "[" }
          &:after { content: "]" }
        }
      }
    }`
  }

  get types () { return this._types }
  set types (types = []) {
    this._types = types
    this.render()
  }

  render () {
    this.element.innerHTML = ''
    Tab.from(this.types).to(this)
  }
}

class Tab extends Jinkela {
  get template () {
    return `
    <li on-click="{click}">
      <span>{name}</span>
      <label>{count}</label>
      <i on-click="{clear}">x</i>
    </li>`
  }

  init () {
    this.element.className = this.selected ? 'selected' : ''
    this.element.style.display = this.count ? 'block' : 'none'
  }

  click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  }

  clear () {
    this.element.dispatchEvent(new CustomEvent('tab-clear', {
      bubbles: true,
      detail: this.name
    }))
  }
}

module.exports = Tabs
