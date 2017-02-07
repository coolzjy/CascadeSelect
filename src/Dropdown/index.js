var Jinkela = require('jinkela')

class Dropdown extends Jinkela {
  get template () {
    return `
    <div>
      <div>{current}</div>
      <ul ref="$list"></ul>
    </div>
    `
  }

  get styleSheet () {
    return `:scope {
      position: relative;
      user-select: none;
      cursor: default;
      > div {
        min-width: 100px;
        border-right: 1px solid #eee;
        background: #f8f8f8;
      }
      &:hover > ul {
        visibility: visible;
        transform: scaleY(1);
      }
      > ul {
        visibility: hidden;
        transform: scaleY(0);
        transform-origin: top;
        transition: all .1s ease .1s;
        position: absolute;
        left: -1px;
        top: 25px;
        width: 100%;
        border-left: 1px solid #ddd;
        box-sizing: content-box;
        li {
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
    }`
  }

  set types (types) {
    if (Array.isArray(types)) {
      types.forEach(name => {
        new Item({ name }).to(this.$list)
      })
    }
  }
}

class Item extends Jinkela {
  get template () {
    return `<li on-click="{click}">{name}</li>`
  }

  click () {
    this.element.dispatchEvent(new CustomEvent('type-change', {
      bubbles: true,
      detail: this.name
    }))
  }
}

module.exports = Dropdown
