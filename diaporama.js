documentReady(()=>{
    modern = new ModernHTML();

    diaporama = modern.createTag('diaporama');

    diaporama.defaultAttr([
        'zoomout',
        'time'
    ]);

    diaporama.replaceTag('div', diaporama.value)

    diaporama.createAttr('zoomout', (elem)=>{
        
        //Add classes
        elem.classList.add('modern-diaporama-wrapper')
        for (var i=elem.children.length-1; i > -1; i--) {
        elem.children[i].classList.add('modern-diaporama') 
        }    
    })

    diaporama.createAttr(v = 'time', (elem)=>{
        time = elem.getAttribute(v)
        if (time === "") {
            time = 5
        }
        c = 0
        elem.children[c].style.animation = `o-fadein ${time}s linear forwards`
        elem.children[c].classList.add('active')
        for (var i=1; i<elem.children.length;i++) {
            elem.children[c+i].classList.add('init')
        }

        function diaporamaLoop(){
            self.setTimeout(()=>{
                elem.children[c].style.animation = `o-fadein ${time}s linear forwards`
                elem.children[c].classList.add('hidden')
                elem.children[c].style.animation = `o-fadeout ${time/10}s linear forwards`
                elem.children[c].classList.remove('active')
                if (istype.und(elem.children[c+1])){
                    c = 0
                    elem.children[c].style.animation = `o-fadein ${time}s linear forwards`
                    elem.children[c].classList.add('active')
                    elem.children[c].classList.remove('hidden')
                    elem.children[c].classList.remove('init')
                } else {
                    elem.children[c+1].style.animation = `o-fadein ${time}s linear forwards`
                    elem.children[c+1].classList.add('active')
                    elem.children[c+1].classList.remove('hidden')
                    elem.children[c+1].classList.remove('init')
                    c++
                }
                diaporamaLoop()                
            }, time*1000)                
        }
        diaporamaLoop()
    })
    

})
