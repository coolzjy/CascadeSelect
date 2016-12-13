import Jinkela from 'jinkela'

class Tabs extends Jinkela {
  get tagName () { return 'ul' }

  get styleSheet () {
    return `:scope {
      display: flex;
      flex: 1;
      > li {
        padding: 0 10px;
        border-right: 1px solid #ddd;
        > i {
          font-style: normal;
          display: inline-block;
          margin-left: 5px;
          background: #999;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          color: #fff;
          border-radius: 50%;
          line-height: 18px;
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
    return `<li on-click="{click}"><span>{name}</span><i>{count}</i></li>`
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
}

module.exports = Tabs
