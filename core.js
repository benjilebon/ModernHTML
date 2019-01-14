var istype = {
  arr: a => Array.isArray(a),
  obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
  str: a => typeof a === 'string',
  fnc: a => typeof a === 'function',
  und: a => typeof a === 'undefined',
  htc: a => HTMLCollection.prototype.isPrototypeOf(a)
}
function log(t) {
  console.log(t)
}
function warn(t) {
  console.warn('ModernHTML Core: '+t)
}
function error(t) {
  console.error('ModernHTML Core: '+t)
}
function documentReady(fnc) {
  var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return
    clearInterval( tid )      
    fnc()
  }, 100 )  
}
function ModernHTML () {

    function createTag(e){
        if (!istype.str(e)) return error('createTag: Argument must be a string')
        tag = document.getElementsByTagName(e)
        attr = []  
        
        function replaceTag(f, elem){
          if (!istype.str(f)) return error('replaceTag: Argument1 must be a string')
            if (istype.htc(elem)){
              for (i=elem.length-1; i > -1; i--) {
                    r = document.createElement(f)
                    elem[i].classList.add('_wrapNodeList')
                    for (index = elem[i].attributes.length - 1; index >= 0; --index) {
                        r.attributes.setNamedItem(elem[i].attributes[index].cloneNode())
                    }
                    h = elem[i].parentNode.replaceChild(r, elem[i])
                    for (var c=h.children.length-1; c > -1 ;c--) {
                      r.appendChild(h.children[c])
                    }          
                      var k = r.childNodes   
                      var nk = k.length; 
                      for(var i = nk-1; i >= 0; i--) {  
                          var c = r.removeChild(k[i])    
                          r.appendChild(c)                  
                      }
                }
              n = document.querySelectorAll('._wrapNodeList')
              for (i=n.length-1; i > -1; i--) {
                n[i].classList.remove('_wrapNodeList')
              }
              tag = n
              return tag 
            }
            else {
              r = document.createElement(f)
              try {
                if (elem.attributes === undefined) warn('replaceTag: Argument2 is invalid, maybe you forgot to add the ".value" ?')
                for (index = elem.attributes.length - 1; index >= 0; --index) {
                    r.attributes.setNamedItem(elem.attributes[index].cloneNode())
                }                
              }
              catch(e) {
                try {return replaceTag(f, elem.value)}
                catch(e) {return error('replaceTag: Argument2 is incorrect')}
              }

              h = elem.parentNode.replaceChild(r, elem)
              for (var c=elem.children.length-1; c > -1 ;c--) {
                r.appendChild(elem.children[c])
              }          
                var k = r.childNodes   
                var nk = k.length 
                for(var i = nk-1; i >= 0; i--) {  
                    var c = r.removeChild(k[i])    
                    r.appendChild(c)                  
                }        
              return r
            } 
          }
    
        function createAttr (name, callback) {
          if (!(istype.str(name) && istype.fnc(callback))) 
          {
            if(!istype.str(name)) error('createAttr: Argument1 must be a string')
            if(!istype.fnc(callback)) error('createAttr: Argument2 must be a function')
            return
          }
          attr.push(name)
          for (var i = tag.length - 1; i > -1; i--) {
            if (tag[i].hasAttribute(name)) {
              callback(tag[i])
            }
          }
        }

        function defaultAttr (a) {
          if (!istype.arr(a)) return error('defaultAttr: Argument must be an array')
          for (var i = tag.length - 1; i > -1; i--) {
            if (tag[i].attributes.length === 0) {
              for (var j = a.length - 1; j > -1; j--) {
                setAttr(tag[i], a[j])
              }              
            }
          }
        }

        function setAttr (elem, a) {
          if (istype.str(a)) {
            for (var i = 0; i < a.length; i++) {
              elem.setAttribute(a, '')
            }             
          } else return warn('Core error')
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
setTimeout(()=>{document.body.style.display = 'block'}, 200)

/* TODO:
-Add default attribute value
?Fix default attribute missing when at least 1 is present
*/

/* ------------TAGS IMPORT-------------------*/

requirejs(['diaporama'])
