modern = new ModernHTML();

diaporama = modern.createTag('diaporama');

diaporama.defaultAttr([
    'zoomout'
]);

diaporama.createAttr('zoomout', (elem)=>{
    elem2 = diaporama.replaceTag('div', elem);
    elem.classList.add('modern-diaporama-wrapper');
    childs = elem.children;
});