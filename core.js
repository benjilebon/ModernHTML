const istype = {
  arr: a => Array.isArray(a),
  obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
  str: a => typeof a === 'string',
  fnc: a => typeof a === 'function',
  und: a => typeof a === 'undefined',
  htc: a => HTMLCollection.prototype.isPrototypeOf(a)
}

function ModernHTML () {

    function createTag(e){
        if (!istype.str(e)) return
        tag = document.getElementsByTagName(e)
        attr = []  
        
        function replaceTag(f, elem){
          if (istype.htc(elem)) return
          else {
             r = document.createElement(f)

             for (index = elem.attributes.length - 1; index >= 0; --index) {
                 r.attributes.setNamedItem(elem.attributes[index].cloneNode())
             }
             elem.parentNode.replaceChild(r, elem)

             return r
         }
     }
    
    function createAttr (name, callback) {
      if (!(istype.str(name) && istype.fnc(callback))) return
      if (istype.str(name)) {
        attr.push(name)
        for (var i = tag.length - 1; i > -1; i--) {
          if (tag[i].hasAttribute(name)) {
            callback(tag[i])
          }
        }
      } else if (istype.htc(name)) {
        callback(name)
      }
    }

    function defaultAttr (a) {
      if (!istype.arr(a)) return
      for (var i = tag.length - 1; i > -1; i--) { // Check pour toute les itérations de balise tag
        if (tag[i].attributes.length === 0) {
          setAttr(tag[i], a)
        }
      }
    }

    function setAttr (elem, a) {
      for (var i = 0; i < a.length; i++) { // Boucle pour tout les attributs par défaut
        elem.setAttribute(a, '')
      }
    }

    return {
      createAttr: createAttr,
      replaceTag: replaceTag,
      defaultAttr: defaultAttr,
      value: tag
    }
  }

  return {
    createTag: createTag
  }
}



/* ------------HTML TEST CODE--------------------*/

requirejs(['diaporama']);
