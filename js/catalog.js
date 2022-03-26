//получаем данные из базы

const getData = () => {

    const list = document.querySelector('.catalog_list'); //получаем список товаров
    const showItem = document.querySelector('.show_select'); // получаем select
    let number = 3;
    let shownumber = showItem.value;
    //функция, которая отрисовывает данные в карточки
    const render = (data) => {
        list.innerHTML = '' //очищаем список
        data.forEach(item => {
            list.insertAdjacentHTML('beforeend', `
            <div class="catalog_item">
            <div class="items_art_rating">
                <div class="item_art">
                    ${item.article}
                </div>
                <div class="item_rating">
                    <img src="./img/wedding/rating.svg" alt="rating">
                </div>
            </div>
            <div class="item_foto">
                <img src="./${item.image}" alt="art019">
            </div>
            <div class="item_like_price">
                <div class="item_like">

                </div>
                <div class="item_price">
                    ${item.price}
                </div>
            </div>
        </div>
            `)
        })
    }
    // функция, которая обрезает массив данных с нулевого элемента до index
    const sliceArray = (data, index) => {
        return (data.slice(0, index));
    }

    const getGoods = () => {
        fetch('./json/catalog.json')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Данные были получены с ошибкой!')
                }
            })
            .then((data) => {
                let shownumber = 3// по умолчанию shownumber  = 3
                const changeData = (data) => {
                    render(sliceArray(data, shownumber))   
                }
                changeData(data)// выполняем функцию при загрузке страницы
                showItem.addEventListener('change', () => {
                    shownumber = showItem.value;
                    changeData(data) // выполняем функцию  при определенном shownumber 
                })

            })
    }


    getGoods()

}
getData()