let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartStorage();
    updateCartCount();
    showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    updateCartCount();
    displayCartItems();
    calculateTotal();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartStorage();
        updateCartCount();
        displayCartItems();
        calculateTotal();
    }
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = totalItems;
    }
}

function displayCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h3>Tu carrito está vacío</h3>
                <p>¡Explora nuestros productos y encuentra algo especial!</p>
                <a href="../pages/productos.html" class="btn btn-primary">Ver Productos</a>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="../${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join('');
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100000 ? 0 : 8000;
    const total = subtotal + shipping;

    const totalContainer = document.getElementById('cart-total');
    const paymentSection = document.getElementById('payment-section');
    
    if (totalContainer) {
        totalContainer.innerHTML = `
            <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="total-row">
                <span>Envío:</span>
                <span>${shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
            </div>
            <div class="total-row">
                <span class="total-price">Total:</span>
                <span class="total-price">${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary w-100 mt-3" onclick="proceedToPayment()">
                Proceder al Pago
            </button>
        `;
        
        if (cart.length > 0 && paymentSection) {
            paymentSection.style.display = 'block';
            setupPaymentMethods();
        } else if (paymentSection) {
            paymentSection.style.display = 'none';
        }
    }
}

function clearCart() {
    cart = [];
    updateCartStorage();
    updateCartCount();
    displayCartItems();
    calculateTotal();
}

function setupPaymentMethods() {
    const cardPayment = document.getElementById('cardPayment');
    const cashPayment = document.getElementById('cashPayment');
    const cardDetails = document.getElementById('card-details');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');

    if (cardPayment && cashPayment && cardDetails) {
        cardPayment.addEventListener('change', function() {
            if (this.checked) {
                cardDetails.style.display = 'block';
            }
        });

        cashPayment.addEventListener('change', function() {
            if (this.checked) {
                cardDetails.style.display = 'none';
            }
        });
    }

    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            formatCardNumber(this);
            detectCardType(this.value);
        });
    }

    if (cardExpiry) {
        cardExpiry.addEventListener('input', function() {
            formatCardExpiry(this);
        });
    }
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function detectCardType(cardNumber) {
    const cardTypeElement = document.getElementById('card-type');
    if (!cardTypeElement) return;

    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) {
        cardTypeElement.innerHTML = '<span class="visa">💳 Visa</span>';
        cardTypeElement.className = 'card-type visa';
    } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
        cardTypeElement.innerHTML = '<span class="mastercard">💳 MasterCard</span>';
        cardTypeElement.className = 'card-type mastercard';
    } else if (/^3[47]/.test(number)) {
        cardTypeElement.innerHTML = '<span class="amex">💳 American Express</span>';
        cardTypeElement.className = 'card-type amex';
    } else if (/^6/.test(number)) {
        cardTypeElement.innerHTML = '<span class="discover">💳 Discover</span>';
        cardTypeElement.className = 'card-type discover';
    } else if (number.length > 0) {
        cardTypeElement.innerHTML = '💳 Tarjeta';
        cardTypeElement.className = 'card-type';
    } else {
        cardTypeElement.innerHTML = '';
        cardTypeElement.className = 'card-type';
    }
}

function proceedToPayment() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (paymentMethod === 'card') {
        processCardPayment();
    } else {
        processCashPayment();
    }
}

function processCardPayment() {
    const cardNumber = document.getElementById('cardNumber')?.value;
    const cardName = document.getElementById('cardName')?.value;
    const cardExpiry = document.getElementById('cardExpiry')?.value;
    const cardCvv = document.getElementById('cardCvv')?.value;

    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        showNotification('Por favor completa todos los campos de la tarjeta');
        return;
    }

    if (cardNumber.replace(/\s/g, '').length < 13) {
        showNotification('Número de tarjeta inválido');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 100000 ? 0 : 8000;
    const finalTotal = total + shipping;

    showCardPaymentNotification(finalTotal, cardNumber);
    clearCart();
}

function processCashPayment() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 100000 ? 0 : 8000;
    const finalTotal = total + shipping;
    
    showCheckoutNotification(finalTotal);
    clearCart();
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 100000 ? 0 : 8000;
    const finalTotal = total + shipping;
    
    showCheckoutNotification(finalTotal);
    clearCart();
}

function showCheckoutNotification(finalTotal) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    
    const itemsList = cart.map(item => 
        `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>`
    ).join('');
    
    notification.innerHTML = `
        <div class="notification-icon">🛒</div>
        <h3 class="notification-title">¡Pedido Confirmado!</h3>
        <div class="notification-message">
            <strong>Resumen de tu pedido:</strong><br><br>
            ${itemsList}
            <hr style="margin: 15px 0; border-color: var(--medium-gray);">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em;">
                <span>Total:</span>
                <span>${formatPrice(finalTotal)}</span>
            </div>
            <br>
            <strong>💵 Pago Contra Entrega</strong><br>
            En breve nos contactaremos contigo para confirmar el pedido y coordinar la entrega.
        </div>
        <button class="notification-close-btn" onclick="closeNotification()">Cerrar</button>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    document.body.style.overflow = 'hidden';
}

function showCardPaymentNotification(finalTotal, cardNumber) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    
    const lastFourDigits = cardNumber.slice(-4);
    const itemsList = cart.map(item => 
        `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>`
    ).join('');
    
    notification.innerHTML = `
        <div class="notification-icon">✅</div>
        <h3 class="notification-title">¡Pago Exitoso!</h3>
        <div class="notification-message">
            <strong>Tu pago ha sido procesado correctamente</strong><br><br>
            ${itemsList}
            <hr style="margin: 15px 0; border-color: var(--medium-gray);">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em;">
                <span>Total Pagado:</span>
                <span>${formatPrice(finalTotal)}</span>
            </div>
            <br>
            <strong>💳 Tarjeta terminada en ${lastFourDigits}</strong><br>
            Recibirás un email de confirmación y actualizaciones sobre el envío de tu pedido.
        </div>
        <button class="notification-close-btn" onclick="closeNotification()">Cerrar</button>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    document.body.style.overflow = 'hidden';
}

function closeNotification() {
    const overlay = document.querySelector('.notification-overlay');
    const notification = document.querySelector('.success-notification');
    
    if (overlay) overlay.remove();
    if (notification) notification.remove();
    
    document.body.style.overflow = 'auto';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 20px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 300px;
        background-color: var(--light-gray);
        color: var(--secondary-color);
        border: 1px solid var(--primary-color);
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 5px 15px rgba(108, 117, 125, 0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    if (window.location.pathname.includes('carrito.html')) {
        displayCartItems();
        calculateTotal();
    }
});
