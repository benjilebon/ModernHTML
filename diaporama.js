documentReady(()=>{
    modern = new ModernHTML();

    diaporama = modern.createTag('diaporama');

    diaporama.defaultAttr([
        'zoomout'
    ]);

    diaporama.createAttr('zoomout', (elem)=>{
        elem2 = diaporama.replaceTag('div', elem)
        //Add classes
        elem2.classList.add('modern-diaporama-wrapper')
        for (var i=elem2.children.length-1; i > -1; i--) {
        elem2.children[i].classList.add('modern-diaporama') 
        }
        c = 0
        elem2.children[c].classList.add('active')
        for (var i=1; i<elem2.children.length;i++) {
            elem2.children[c+i].classList.add('init')
        }

        function diaporamaLoop(){
            self.setTimeout(()=>{
                elem2.children[c].classList.add('hidden')
                elem2.children[c].classList.remove('active')
                if (istype.und(elem2.children[c+1])){
                    c = 0
                    elem2.children[c].classList.add('active')
                    elem2.children[c].classList.remove('hidden')
                    elem2.children[c].classList.remove('init')
                } else {
                    elem2.children[c+1].classList.add('active')
                    elem2.children[c+1].classList.remove('hidden')
                    elem2.children[c+1].classList.remove('init')
                    c++
                }
                diaporamaLoop()                
            }, 10000)                
        }
        diaporamaLoop()
            
    });    
})
