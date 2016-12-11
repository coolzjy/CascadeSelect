/* 预留，以后可能会扩展原型 */
import Jinkela from 'jinkela'

Jinkela.register('$ref', function(that, node, ownerElement) {
  Object.defineProperty(ownerElement.component, '$parent', {
    configurable: true,
    enumerable: false,
    get: function() {
      return that
    }
  })

  ownerElement.setAttribute('ref', node.ownerElement.tagName.toLowerCase().replace(/^jkl-(.+)$/, '$$$1'))
});

const prefix = 'ES-'

class ESelect extends Jinkela {
  get $root () {
    let ref = this
    while(ref['$parent']) {
      ref = ref['$parent']
    }
    return ref
  }
}

export default ESelect
