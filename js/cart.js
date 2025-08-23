let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, image) {
    const existingProduct = cart.find(item => item.productName === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ productName, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification(`${productName} has been added to your cart.`);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.productName}" class="cart-item-image">
                <span>${item.productName} - $${item.price} x ${item.quantity}</span>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        if (cartTotal) {
            cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        }
    }

    if (cartCount) {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalQuantity;
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification('Cart has been cleared.');
}

function proceedToCheckout() {
    alert('Proceeding to checkout!');
    // Here you would typically redirect to a checkout page or process the order.
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});