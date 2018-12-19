const istype = {
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

function documentReady(fnc) {
  var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid )      
    fnc()
  }, 100 )  
}


function ModernHTML () {

    function createTag(e){
        if (!istype.str(e)) return
        tag = document.getElementsByTagName(e)
        attr = []  
        
        function replaceTag(f, elem){
          if (istype.htc(elem)){
            log(elem)
            for (i=elem.length-1; i > -1; i--) {
                  r = document.createElement(f);
                  r.classList.add('_wrapNodeList')
                  for (index = elem[i].attributes.length - 1; index >= 0; --index) {
                      r.attributes.setNamedItem(elem[i].attributes[index].cloneNode());
                  }
                  h = elem[i].parentNode.replaceChild(r, elem[i]);
                  for (var c=h.children.length-1; c > -1 ;c--) {
                    r.appendChild(h.children[c])
                  }          
                    var k = r.childNodes;   
                    var nk = k.length; 
                    for(var i = nk-1; i >= 0; i--) {  
                        var c = r.removeChild(k[i]);    
                        r.appendChild(c);                  
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
            for (index = elem.attributes.length - 1; index >= 0; --index) {
                r.attributes.setNamedItem(elem.attributes[index].cloneNode())
            }
            h = elem.parentNode.replaceChild(r, elem)
            for (var c=elem.children.length-1; c > -1 ;c--) {
              r.appendChild(elem.children[c])
            }          
              var k = r.childNodes;   
              var nk = k.length; 
              for(var i = nk-1; i >= 0; i--) {  
                  var c = r.removeChild(k[i]);    
                  r.appendChild(c);                  
              }        
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
          }
        }

        function defaultAttr (a) {
          if (!istype.arr(a)) return
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
          } else return
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
*/

/* ------------HTML TEST CODE--------------------*/

requirejs(['diaporama']);
