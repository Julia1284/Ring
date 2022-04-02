//получаем данные из базы

const getData = () => {

    const list = document.querySelector('.catalog_list'); //получаем список товаров
    const showItem = document.querySelector('.show_select'); // получаем select
    const priceBtns = document.querySelectorAll('.btn_price'); // получаем кнопки  цены
    const catalogList = document.querySelector('.catalog_list');
    console.log (catalogList)
    
    catalogList.addEventListener('click', (event) => {
        console.log (event.target)
        if (event.target.classList.contains ('foto')){
            document.location.href = './goodscart.html'
        }
    })
    console.log(priceBtns)

    //функция, которая добавляет класс к выбранному элементу и удаляет у всех остальных
    const changeChoosedClass = (e) => {
        //let price = e.target.textContent
        for (let i = 0; i < priceBtns.length; i++) {
            const item = priceBtns[i];
            item.classList.remove('choosed');
        }
        e.target.classList.add('choosed');
    }
    priceBtns.forEach(item => {
        item.addEventListener('click', changeChoosedClass)
    })
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
                <img class = "foto" src="./${item.image}" alt="art019">
            </div>
            <div class="item_like_price">
                <div class="item_like">

                </div>
                <div class="item_price">
                    ${item.price} ₽
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
    let array = [];
    const filterPrice = (data, price) => {
        array = []; //очищаем массив
        if (price === 'от 100000') {
            for (i = 0; i < data.length; i++) {
                if (data[i].price >= 100000) {
                    array.push(data[i])
                }
            }
            return array
        } else if (price === '50-70000') {
            for (i = 0; i < data.length; i++) {
                if (data[i].price >= 50000 && data[i].price <= 70000) {
                    array.push(data[i])
                }
            }
            return array
        } else if (price === '70-100000') {
            for (i = 0; i < data.length; i++) {
                if (data[i].price >= 70000 && data[i].price <= 100000) {
                    array.push(data[i])
                }
            }
            console.log(array)
            return array
        } else  if (price === 'от 50000') {
            for (i = 0; i < data.length; i++) {
                if (data[i].price >= 50000 ) {
                    array.push(data[i])
                }
            }
            return array
        }
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

                let shownumber = 3 // по умолчанию shownumber  = 3
                let price = 50000 // по умолчанию  price = 50000
                const changeData = (data) => {
                    render(sliceArray(data, shownumber))
                }
                changeData(data) // выполняем функцию при загрузке страницы
                showItem.addEventListener('change', () => {
                    shownumber = showItem.value;
                    //let price = '';
                    priceBtns.forEach(item => {
                        if (item.classList[2]) {
                            price = item.innerHTML
                        }
                    })
                    filterPrice(data, price)
                    console.log(price)
                    changeData(array) // выполняем функцию  при определенном shownumber 
                })

                priceBtns.forEach(item => {
                    item.addEventListener('click', (event) => {
                        price = event.target.textContent;
                        filterPrice(data, price) //фильтруем по цене
                        shownumber = showItem.value;
                        changeData(array) // то, что получилось, отрисовываем в соответствии с количеством
                    })
                })

            })

    }
    getGoods()
}

getData()