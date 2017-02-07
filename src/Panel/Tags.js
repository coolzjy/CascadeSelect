var Jinkela = require('jinkela')

class Tags extends Jinkela {
  get tagName () { return 'ul' }

  get styleSheet () {
    return `:scope {
      border: 1px solid #ddd;
      text-align: left;
      max-height: 91px;
      overflow-y: auto;
      > li {
        display: inline-block;
        height: 20px;
        background: #eee;
        padding: 0 10px;
        margin: 5px;
        border-radius: 2px;
        color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        transition: all 0.2s ease-out;
        &:hover {
          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
        }
      }
      > li.current-level {
        background: #19d4ae;
      }
    }`
  }

  set data (data) {
    if (data) {
      this.element.innerHTML = ''
      Tag.from(data).to(this)
    }
  }
}

class Tag extends Jinkela {
  get template () {
    return `<li on-click="{click}" jinkela-tag>{n}</li>`
  }

  init () {
    if (!this.restrict || this.isCurrentLevel) {
      this.element.classList.add('current-level')
    }
  }

  click (e) {
    e.stopPropagation()
    this.element.dispatchEvent(new CustomEvent('item-remove', {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  }
}

module.exports = Tags
