const navBar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navBar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navBar.classList.remove('active');
    cartItem.classList.remove('active');
}

const cartItem = document.querySelector('.cart__items__container');
const activeNotification = document.querySelector('.notification');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navBar.classList.remove('active');
    searchForm.classList.remove('active');
    activeNotification.classList.remove('notification-active');
}

window.onscroll = () =>{
    navBar.classList.remove('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

// carrito
const shopingCartItemContainer = document.querySelector('.item__container');
const activeOpen = document.querySelector('.open');
const activeItem = document.querySelector('.item__total');


const addToCarts = document.querySelectorAll('.addcart');

addToCarts.forEach(addToCart =>{
    addToCart.addEventListener('click', addToCartCliked)
});

const comprarButton = document.querySelector('.buy-btn');
comprarButton.addEventListener('click', comprarButtonClicked)


function addToCartCliked(event){
    const button = event.target;
    const item = button.closest('.box-item');
    const itemTitle = item.querySelector('.box-title').textContent;
    const itemPrice = item.querySelector('.price__item').textContent;
    const itemImage = item.querySelector('.box-img').src;
    
    addItemToShopingCart(itemTitle,itemPrice,itemImage);

    activeOpen.classList.add('open-desactive');
    activeItem.classList.add('item__total-active');
    activeNotification.classList.add('notification-active');
}

function addItemToShopingCart(itemTitle, itemPrice, itemImage){
    const elementTitle = shopingCartItemContainer.getElementsByClassName('content__title');
    
    for(let i = 0; i < elementTitle.length; i++){
        if(elementTitle[i].innerText === itemTitle){
            let elementQuantity = elementTitle[i].parentElement.parentElement.querySelector('.quantity-number');
            elementQuantity.value++;
            updateShopingCartTotal();
            return;
        }
        
    }

    const shopingCartRow = document.createElement('div');
    const shopingCartContent = `
        <div class="cart__item">
            <i class='bx bx-x item__close'></i>
            <img src=${itemImage} class="cart__item--img" alt="">
            <div class="content">
                <h3 class="content__title">${itemTitle}</h3>
                <div class="quantity"><p>Quantity</p><input class="quantity-number" type="number" value="1"></div>
                <div class="price">${itemPrice}</div>
            </div>
        </div>
    `;

    shopingCartRow.innerHTML = shopingCartContent;
    shopingCartItemContainer.append(shopingCartRow);

    shopingCartRow.querySelector('.item__close').addEventListener('click', removeShopingCartItem);

    shopingCartRow.querySelector('.quantity-number').addEventListener('change', quantityChange);

    updateShopingCartTotal();
}

function updateShopingCartTotal(){
    let total = 0;
    const shopingCartTotal = document.querySelector('.total');
    const shopingCartItem = document.querySelectorAll('.cart__item');
    
    shopingCartItem.forEach(shopingCartItem => {
        const shopingCartItemPriceElement = shopingCartItem.querySelector('.price');
        const shopingCartItemPrice = Number(shopingCartItemPriceElement.textContent.replace('$', ''));
        const shopingCartItemQuantityElement = document.querySelector('.quantity-number');
        const shopingCartItemQuantity = Number(shopingCartItemQuantityElement.value);

        total = total + shopingCartItemPrice * shopingCartItemQuantity;
    });

    shopingCartTotal.innerHTML = `${total.toFixed(3)}$`
}

function removeShopingCartItem(event){
    const buttonCliked = event.target;
    buttonCliked.closest('.cart__item').remove();
    updateShopingCartTotal();
}
function quantityChange(event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShopingCartTotal();
}

function comprarButtonClicked(){
    shopingCartItemContainer.innerHTML = '';
    updateShopingCartTotal();
    activeItem.classList.remove('item__total-active');
    activeOpen.classList.remove('open-desactive');
}
