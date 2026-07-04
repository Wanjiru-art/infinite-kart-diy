// ===== FORM VALIDATION =====
function validateForm() {
    let isValid = true;

    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    if (name === '') {
        document.getElementById('nameError').textContent = 'Please enter your full name';
        isValid = false;
    }

    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email address';
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Please enter your phone number';
        isValid = false;
    }

    if (subject === '') {
        document.getElementById('subjectError').textContent = 'Please enter a subject';
        isValid = false;
    }

    if (message === '') {
        document.getElementById('messageError').textContent = 'Please enter your message';
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('successMsg');
        successMsg.textContent = '✅ Thank you! Your message has been sent successfully.';
        successMsg.style.display = 'block';
        document.getElementById('contactForm').reset();
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// ===== SHOPPING CART =====
let cart = [];

function addToCart(productName, price, image) {
    // Check if product already in cart
    const existing = cart.find(item => item.name === productName);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Update cart count
    updateCartCount();

    // Show notification
    showCartNotification(productName);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function showCartNotification(productName) {
    // Remove existing notification if any
    const existing = document.getElementById('cartNotification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.id = 'cartNotification';
    notification.innerHTML = '🛒 ' + productName + ' added to cart!';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #2c3e50;
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1rem;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(function() {
        notification.remove();
    }, 3000);
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItemsDiv.innerHTML = '';
        return;
    }

    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';

    let html = '';
    let subtotal = 0;

    cart.forEach(function(item, index) {
        subtotal += item.price * item.quantity;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>KES ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = html;

    // Update totals
    document.getElementById('cartSubtotal').textContent = 'KES ' + subtotal.toLocaleString();
    document.getElementById('cartTotal').textContent = 'KES ' + (subtotal + 200).toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

function clearCart() {
    cart = [];
    updateCartCount();
    displayCart();
}

function checkout() {
    alert('✅ Thank you for your order! We will contact you shortly to confirm.');
    clearCart();
}

// Display cart when on cart page
window.addEventListener('load', function() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
        displayCart();
    }
});

// ===== BACK TO TOP BUTTON =====
window.onscroll = function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (document.documentElement.scrollTop > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== LOGIN VALIDATION =====
function validateLogin() {
    let isValid = true;

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    if (email === '') {
        document.getElementById('loginEmailError').textContent = 'Please enter your email';
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('loginPasswordError').textContent = 'Please enter your password';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('loginSuccess');
        successMsg.textContent = '✅ Login successful! Welcome back!';
        successMsg.style.display = 'block';
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);
    }
}

// ===== REGISTER VALIDATION =====
function validateRegister() {
    let isValid = true;

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('regConfirm').value.trim();

    document.getElementById('regNameError').textContent = '';
    document.getElementById('regEmailError').textContent = '';
    document.getElementById('regPhoneError').textContent = '';
    document.getElementById('regPasswordError').textContent = '';
    document.getElementById('regConfirmError').textContent = '';

    if (name === '') {
        document.getElementById('regNameError').textContent = 'Please enter your full name';
        isValid = false;
    }

    if (email === '') {
        document.getElementById('regEmailError').textContent = 'Please enter your email';
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('regEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (phone === '') {
        document.getElementById('regPhoneError').textContent = 'Please enter your phone number';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('regPasswordError').textContent = 'Please enter a password';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (confirm === '') {
        document.getElementById('regConfirmError').textContent = 'Please confirm your password';
        isValid = false;
    } else if (password !== confirm) {
        document.getElementById('regConfirmError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('registerSuccess');
        successMsg.textContent = '✅ Account created successfully! Welcome to Infinite Kart DIY!';
        successMsg.style.display = 'block';
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPhone').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirm').value = '';
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);
    }
}

// ===== DARK MODE =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggle = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Remember dark mode preference
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});