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

// ===== ADD TO CART =====
function addToCart(productName) {
    alert('✅ ' + productName + ' has been added to your cart!');
}

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