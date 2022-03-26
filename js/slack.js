const filterPrice = ( price, data) => {
                if (price === 'от 100000') {
                    for (i = 0; i < data.length; i++) {
                        if (data[i].price >= 100000) {
                            return (data[i])
                        }
                    }
        
                }
            }
            //changeChoosedClass();
            render (filterPrice());

const filterPrice1 = (price, data) => {
    let array = []
    switch (price){
        case '50-70000':
            for (i = 0; i < data.length; i++) {
                if (data[i].price >= 50000 && data[i].price <= 70000) {
                    array.push(data[i])
                }
            }
            return array
    }
}