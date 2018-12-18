const is = {
    arr: a => Array.isArray(a),
    obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
    str: a => typeof a === 'string',
    fnc: a => typeof a === 'function',
    und: a => typeof a === 'undefined',
    htc: a => HTMLCollection.prototype.isPrototypeOf(a)
}

function ModernAnimation(){

    function createTag(e){
        tag = document.getElementsByTagName(e);
        attr = [];   
        
        function replaceTag(f, elem){
            if (is.htc(elem)) {
                for (i=elem.length-1; i > -1; i--) {
                    r = document.createElement(f);

                    for (index = elem[i].attributes.length - 1; index >= 0; --index) {
                        r.attributes.setNamedItem(elem[i].attributes[index].cloneNode());
                    }
                    h = elem[i].parentNode.replaceChild(r, elem[i]);
                }                
            } else {
                r = document.createElement(f);

                for (index = elem.attributes.length - 1; index >= 0; --index) {
                    r.attributes.setNamedItem(elem.attributes[index].cloneNode());
                }
                elem.parentNode.replaceChild(r, elem);

                return r;
            }
        }
        
        function createAttr(name, callback){
            if (is.str(name)) {
                attr.push(name);
                for (i=tag.length-1; i > -1; i--) {
                    if (tag[i].hasAttribute(name)) {
                        callback(tag[i]);
                    }
                }
            } else if (is.htc(name)) {
                callback(name);
            }

        }

        function defaultAttr(a) {
            for (i=tag.length-1; i > -1; i--) { //check pour toute les itérations de balise tag
                if (tag[i].attributes.length === 0){
                    setAttr(tag[i], a);
                }
            }
        }

        function setAttr(elem, a) {
            for (i=0; i<a.length;i++) //boucle pour tout les attributs par défaut
                elem.setAttribute(a, "");

        }

        return {
            createAttr : createAttr,
            replaceTag : replaceTag,
            defaultAttr : defaultAttr,
            value : tag
        };
    }

    return {
        createTag : createTag
    };

}



/* ------------ANIMATION TEST CODE--------------------*/

blabla = new ModernAnimation();

b = blabla.createTag('diaporama');

b.defaultAttr([
    'zoomout'
]);


b.createAttr('zoomout', (elem)=>{
    elem2 = b.replaceTag('div', elem);
    elem2.style.height = '100px';
    elem2.style.width = '100px';
    elem2.style.backgroundColor = 'red';
});

b.createAttr('zoomin', (elem)=>{
    elem2 = b.replaceTag('div', elem);
    elem2.style.height = '100px';
    elem2.style.width = '100px';
    elem2.style.backgroundColor = 'green';
});