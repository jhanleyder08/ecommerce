let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;

function updateVisitCounter() {
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    const counter = document.getElementById('visit-counter');
    if (counter) {
        counter.textContent = visitCount;
    }
}

function initializeCounters() {
    updateVisitCounter();
    updateProductCounter();
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                searchProducts(searchTerm);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    searchProducts(searchTerm);
                }
            }
        });
    }
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (category === 'all') {
                displayProducts();
            } else {
                filterProducts(category);
            }
        });
    });
}

function showSuccessNotification(name, email, subject, message) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    
    const subjectText = subject ? `<strong>Asunto:</strong> ${getSubjectText(subject)}<br>` : '';
    
    notification.innerHTML = `
        <div class="notification-icon">✉️</div>
        <h3 class="notification-title">¡Mensaje Enviado Exitosamente!</h3>
        <div class="notification-message">
            <strong>Hola ${name},</strong><br><br>
            Hemos recibido tu mensaje correctamente.<br>
            ${subjectText}
            <strong>Tu mensaje:</strong> "${message}"<br><br>
            Nos pondremos en contacto contigo a través de <strong>${email}</strong> muy pronto.
        </div>
        <button class="notification-close-btn" onclick="closeNotification()">Cerrar</button>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    document.body.style.overflow = 'hidden';
}

function getSubjectText(subjectValue) {
    const subjects = {
        'consulta': 'Consulta General',
        'pedido': 'Información sobre Pedido',
        'producto': 'Consulta sobre Producto',
        'reclamo': 'Reclamo o Sugerencia',
        'mayorista': 'Ventas al Por Mayor'
    };
    return subjects[subjectValue] || subjectValue;
}

function closeNotification() {
    const overlay = document.querySelector('.notification-overlay');
    const notification = document.querySelector('.success-notification');
    
    if (overlay) overlay.remove();
    if (notification) notification.remove();
    
    document.body.style.overflow = 'auto';
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const subject = formData.get('subject');
            
            if (name && email && message) {
                showSuccessNotification(name, email, subject, message);
                contactForm.reset();
            }
        });
    }
}

function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addScrollEffects() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(108, 117, 125, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    const elements = document.querySelectorAll('.product-card, .category-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function setupMobileMenu() {
    const navbar = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
        });
    });
}

function preloadImages() {
    const images = [
        'images/logo.png',
        'images/feature_prod_01.jpg',
        'images/category_img_01.jpg',
        'images/category_img_02.jpg',
        'images/category_img_03.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function initializeApp() {
    initializeCounters();
    setupSearchFunctionality();
    setupCategoryFilters();
    setupContactForm();
    smoothScroll();
    addScrollEffects();
    setupMobileMenu();
    preloadImages();
    
    setTimeout(() => {
        animateOnScroll();
    }, 100);
}

document.addEventListener('DOMContentLoaded', initializeApp);
