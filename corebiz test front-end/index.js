
window.onload= function(){
    showCounter();
}
const url = 'https://corebiz-test.herokuapp.com/api/v1/products/';
let products = document.querySelector('.products-items');

function getProducts(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            cardTemplate(responseData);
            
        })
        .catch((err) => {
            console.log(err);
        });
}
getProducts(url);



function cardTemplate(data) {
    for (let x = 0; x < data.length; x++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', data[x].productId);
        let template = `
        <div class="card">
        <div class="card-image">
            <img src="${data[x].imageUrl}" alt="">
        </div>
        <div class="description">
            <h3 class='card-title'>
                ${data[x].productName}
            </h3>
            <div class="rating">
            <span class="material-icons-outlined">
                star_border
            </span>

            <span class="material-icons-outlined">
                star_border
            </span>
            <span class="material-icons-outlined">
                star_border
            </span>
            <span class="material-icons-outlined">
                star_border
            </span>
            <span class="material-icons-outlined">
                star_border
            </span>
            </div>
            <div class="list-price">
                <h3>${formatNumber(data[x].listPrice)}</h3>
            </div>
            <div class="price">
                <h3>${formatNumber(data[x].price)}</h3>
            </div>
            <div class="installments">
                <h3>${verifyInstallments(data[x].installments)}</h3>
            </div>
            <div class="buy">
                <button class="buy-btn" onclick="addToStorage()"">comprar</button>
            </div>
            
        </div>
    </div>
        `;
        card.innerHTML = template;
        products.append(card);
    }
}

function verifyInstallments(installments) {
    if (Object.keys(installments).length > 0) {
        for (let x = 0; x < installments.length; x++) {
            return `ou em ${installments[x].quantity} de R$ ${formatNumber(installments[x].value)}`;
        }

    } else {
        return ''
    }

}


function formatNumber(price) {
    if (price == null) {
        return '400.00'
    } else {
        let str = price.toString();
        let decimal = str.slice(-2);
        let integer = str.substring(0, str.length - 2);
        return `${integer}.${decimal}`
    }
}


function addToStorage(){
    let value;
    if(localStorage.getItem('add')==null){
        localStorage.setItem('add', 1);
    }else{
        value= Number.parseInt(localStorage.getItem('add'));
        localStorage.setItem('add', value+1);
    }
    showCounter();
}

function showCounter(){
    let counter= document.querySelector('.count');
    if(localStorage.getItem('add')){
        counter.innerHTML= localStorage.getItem('add');
    }
    
}


