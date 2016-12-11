import ESelect from '../ESelect'

import Tabs from './Tabs'
import Tags from './Tags'

class Panel extends ESelect {
  get Tabs () { return Tabs }

  get template () {
    return `
    <div>
      <jkl-tabs $ref></jkl-tabs>
      <section ref="box"></section>
    </div>`
  }

  get styleSheet () {
    return `:scope {
      flex: 1;
      margin-left: 15px;
      max-width: 600px;
      > section {
        border: 1px solid #ddd;
        background: #f8f8f8;
      }
    }`
  }

  setType (type) {
    this.type = type
    this._refs.forEach(tags => {
      tags.element.style.display = tags.type === type ? 'block' : 'none'
    })
    this.$tabs.setType(type)
  }

  setTypes (types) {
    const data = types.map(type => {
      type
      $parent: this
    })
    this._refs = Tags.from(data).to(this.box)
    this.$tabs.setTypes(types)
  }

  addTag (data) {
    this._tagsRef.forEach(tags => {
      if (tags.type === this.type) {
        tags.add(data)
      }
    })
  }
}

export default Panel
