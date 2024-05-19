import {cart} from './cart.js';
import {products} from '../data/products.js';
let productHTML = '';

//looping products array to get each object and its props in HTML content
products.forEach((product) => {

    const html = `<div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="js-product-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
        Add to Cart
        </button>
        </div>`;
// Adding each object to form a complete HTML structure
    productHTML += html;
})
// displayed items in products array to HTML
document.querySelector('.js-products-grid').innerHTML = productHTML;

//AddtoCart Functionality
// Fetching Add to cart Element Array 
const addToCartElem = document.querySelectorAll('.js-add-to-cart');

// Since its an array, Looping to add event listeners to each Button 
addToCartElem.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', function () {
        // Fetching unique ID from dataset given in data Attribute of Button
        const {productId} = addToCartButton.dataset;
        const quantitySelected = Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value);
        // console.log(productName);
        let matchingFound;
        // check whether item is already present in the cart array
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingFound = item;
            }
        })
 
        if (matchingFound) {
            matchingFound.quantity = matchingFound.quantity + quantitySelected;
            console.log(cart);
        } else {
            // console.log('Pushing Item here');
            cart.push({
                productId: productId,
                quantity: quantitySelected,
            });
            // console.log(cart);
        }

// Calculating Total items in cart 
        let cartQuantity = 0;
        cart.forEach((item) => {
            console.log(cartQuantity,quantitySelected);
            cartQuantity = cartQuantity + item.quantity;
            console.log(cartQuantity, 'Items in cart');
        })
// setting total cart Items to the cart Interface
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        document.querySelector(`.js-added-to-cart-${productId}`).classList.add('showElem');
        setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('showElem');
        },2000);
    })
})




