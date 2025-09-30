const products = [
    {
        id: 1,
        name: "Bolso Artesanal Clásico",
        price: 45000,
        image: "images/bolso1.jpg",
        category: "bolso",
        description: "Hermoso bolso hecho a mano con materiales naturales"
    },
    {
        id: 2,
        name: "Bolso Tradicional",
        price: 52000,
        image: "images/bolso2.jpg",
        category: "bolso",
        description: "Bolso con diseño tradicional y acabados únicos"
    },
    {
        id: 3,
        name: "Bolso Elegante",
        price: 48000,
        image: "images/bolso3.jpg",
        category: "bolso",
        description: "Elegante bolso perfecto para ocasiones especiales"
    },
    {
        id: 4,
        name: "Mochila Aventurera",
        price: 65000,
        image: "images/mochila1.jpg",
        category: "mochila",
        description: "Mochila resistente para tus aventuras diarias"
    },
    {
        id: 5,
        name: "Mochila Urbana",
        price: 58000,
        image: "images/mochila2.jpg",
        category: "mochila",
        description: "Perfecta para la ciudad con estilo único"
    },
    {
        id: 6,
        name: "Mochila Clásica",
        price: 62000,
        image: "images/mochila3.jpg",
        category: "mochila",
        description: "Diseño clásico con comodidad moderna"
    },
    {
        id: 7,
        name: "Sombrero Tradicional",
        price: 35000,
        image: "images/sombrero1.jpg",
        category: "sombrero",
        description: "Sombrero artesanal con técnicas ancestrales"
    },
    {
        id: 8,
        name: "Sombrero Elegante",
        price: 42000,
        image: "images/sombrero2.jpg",
        category: "sombrero",
        description: "Elegancia y protección en una sola pieza"
    },
    {
        id: 9,
        name: "Sombrero Casual",
        price: 38000,
        image: "images/sombrero3.jpg",
        category: "sombrero",
        description: "Perfecto para el uso diario con estilo"
    },
    {
        id: 10,
        name: "Sombrero Premium",
        price: 55000,
        image: "images/sombrero4.jpg",
        category: "sombrero",
        description: "Sombrero de alta calidad con acabados especiales"
    }
];

function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

function createProductCard(product) {
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const imagePath = isInSubfolder ? `../${product.image}` : product.image;
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card">
                <img src="${imagePath}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container') || document.getElementById('featured-products-container');
    if (container) {
        container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
}

function displayFeaturedProducts() {
    const featured = products.slice(0, 6);
    const container = document.getElementById('featured-products-container');
    if (container) {
        container.innerHTML = featured.map(product => createProductCard(product)).join('');
    }
}

function filterProducts(category) {
    if (window.location.pathname.includes('productos.html')) {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    } else {
        window.location.href = `pages/productos.html?category=${category}`;
    }
}

function searchProducts(searchTerm) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filtered);
}

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

document.addEventListener('DOMContentLoaded', function() {
    updateProductCounter();
    
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        displayFeaturedProducts();
    } else if (window.location.pathname.includes('productos.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            filterProducts(category);
        } else {
            displayProducts();
        }
    }
});

function updateProductCounter() {
    const counter = document.getElementById('product-counter');
    if (counter) {
        counter.textContent = products.length;
    }
}
