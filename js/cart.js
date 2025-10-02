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
                <span>${item.productName} - ₦${item.price} x ${item.quantity}</span>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        if (cartTotal) {
            cartTotal.innerText = `Total: ₦${total.toFixed(2)}`;
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
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        // If user info is not available, show the modal.
        const modal = document.getElementById('user-info-modal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            // Fallback if modal is not on the current page
            alert('Please provide your information before checking out.');
        }
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let cartSummary = cart.map(item => `${item.quantity}x ${item.productName} (₦${item.price})`).join(', ');

    let handler = PaystackPop.setup({
        key: 'pk_test_472fcef3f33a8e93ad95fd25bdf05d21352b66ea', // Replace with your Paystack public key
        email: userInfo.email,
        amount: totalAmount * 100, // Convert to kobo
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Cart Items",
                    variable_name: "cart_items",
                    value: cartSummary
                },
                {
                    display_name: "Delivery Address",
                    variable_name: "delivery_address",
                    value: userInfo.address
                },
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: userInfo.name
                }
            ]
        },
        callback: function(response) {
            alert('Payment successful! Reference: ' + response.reference);
            clearCart(); // Optional: clear cart after successful payment
        },
        onClose: function() {
            alert('Transaction was not completed.');
        }
    });

    handler.openIframe();
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