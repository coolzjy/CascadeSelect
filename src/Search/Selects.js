import Jinkela from 'jinkela'

class Selects extends Jinkela {
  get tagName () { return 'div' }

  get styleSheet () {
    return `:scope {
      background: #fff;
      ul {
        position: absolute;
        border: 1px solid #ddd;
        max-height: 390px;
        overflow: auto;
        background: #fff;
        border-top: none;
        > li {
          border-top: 1px solid #ddd;
          height: 26px;
          display: flex;
          > span {
            color: #999;
            padding: 0 5px;
            background: #f8f8f8;
            border-right: 1px solid #eee;
          }
          > strong {
            flex: 1;
            padding: 0 15px;
          }
          &.selected {
            color: #19d4ae;
          }
        }
      }
    }`
  }

  init () {
    this.element.addEventListener('item-enter', e => {
      const { index, level, i } = e.detail
      const position = e.target.getBoundingClientRect()
      const data = this.getModel(level + 1, i)
      if (!data) {
        if (index === 0) {
          this.remove(1)
        }
        return
      }
      this.show({
        index: index + 1,
        data,
        position: {
          top: position.top + window.pageYOffset + 'px',
          left: position.width + position.left + window.pageXOffset + 'px'
        }
      })
    })
  }

  set visible (b) {
    if (!this._ref) { this._ref = [] }
    if (b) {
      this.showDefault()
    } else {
      this.remove()
    }
  }

  get keyword () { return this._keyword }
  set keyword (k) {
    if (k === this._keyword) { return }
    this._keyword = k
    this.showDefault()
  }

  getModel (level, id) {
    if (level === 0) {
      if (this.keyword) {
        return this.flat.filter(item => item.n.indexOf(this.keyword) >= 0)
      }
      return this.flat
    }
    return this.data[level] && this.data[level][id]
  }

  showDefault () {
    if (!this.data || !this.flat) { return }
    this.remove(0)
    this._ref[0] = new Select({ data: this.getModel(0), index: 0, selected: this.selected }).to(this)
  }

  show ({ index, data, position }) {
    this.remove(index)
    this._ref[index] = new Select({ data, index, position, selected: this.selected }).to(this)
  }

  remove (index) {
    if (!index) {
      this.element.innerHTML = ''
      this._ref = []
    } else {
      for (let i = index; i < this.data.struct.length; i++) {
        if (this._ref[i]) {
          this._ref[i].element.remove()
          delete this._ref[i]
        }
      }
    }
  }
}

const PAGE_SIZE = 200

class Select extends Jinkela {
  get tagName () { return 'ul' }

  init () {
    this.element.addEventListener('item-enter', e => {
      e.detail.index = this.index
    })

    this.page = 0

    if (this.data.length > PAGE_SIZE) {
      this.element.addEventListener('scroll', this.scroll.bind(this))
      this.max = Math.ceil(this.data.length / PAGE_SIZE)
    }

    this.render(this.getPage(0))
  }

  set position (pos) {
    Object.assign(this.element.style, pos)
  }

  scroll () {
    if (!this.scrollHeight || !this.offsetHeight) {
      this.scrollHeight = this.element.scrollHeight
      this.offsetHeight = this.element.offsetHeight
    }
    if (this.element.scrollTop + this.offsetHeight * 2 > this.scrollHeight) {
      this.nextPage()
    }
  }

  nextPage () {
    if (this.page >= this.max - 1) { return }
    this.render(this.getPage(++this.page))
    setTimeout(() => { this.scrollHeight = this.element.scrollHeight }, 0)
  }

  getPage (index) {
    return this.data.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE)
  }

  render (data) {
    if (data) {
      data.forEach(d => {
        d.selected = this.selected && this.selected.some(s => s.i === d.i && s.level === d.level)
        new Item(d).to(this)
      })
    }
  }
}

class Item extends Jinkela {
  get template () {
    return `<li on-click="{click}" on-mouseenter="{mouseenter}"><span>{title}</span><strong>{n}</strong></li>`
  }

  init () {
    const { classList } = this.element
    if (this.hasChild) { classList.add('has-child') }
    if (this.selected) { classList.add('selected') }
  }

  _dispatch (action) {
    this.element.dispatchEvent(new CustomEvent(action, {
      bubbles: true,
      detail: {
        n: this.n,
        i: this.i,
        level: this.level
      }
    }))
  }

  mouseenter () {
    this._dispatch('item-enter')
  }

  click (e) {
    e.stopPropagation()
    const { classList } = this.element
    if (classList.contains('selected')) {
      classList.remove('selected')
      this._dispatch('item-remove')
    } else {
      classList.add('selected')
      this._dispatch('item-select')
    }
  }
}

module.exports = Selects
