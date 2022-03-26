// скрипт для тегов, чтобы при нажатии на кнопку показываись все, или убирались.
const tagshowall = ()=> {
const tags = document.querySelectorAll('.catalog_tag-hidden');
const btnshowall = document.querySelector('.tags_showall');
btnshowall.addEventListener ('click', ()=>{
    tags.forEach(tag=> {
        if (tag.classList.contains ('open')){
            tag.classList.remove ('open')
        }
        else{
            tag.classList.add ('open');
        }
    })
    btnshowall.classList.toggle ('active');
})

}

tagshowall()