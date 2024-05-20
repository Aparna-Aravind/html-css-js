export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,quantitySelected) {
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
            cart.push({
                productId: productId,
                quantity: quantitySelected,
            });
        }
        saveToLocalStorage();
}

export function removeCartItem(productId) {
    const newCart = [];
    cart.forEach((cartItem)=> {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToLocalStorage();
}

