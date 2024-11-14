// Product details
const products = [
    { name: "Apples", price: 1.00, img: "images/apple.jpg" },
    { name: "Bananas", price: 0.50, img: "images/banana.jpg" },
    { name: "Oranges", price: 0.75, img: "images/orange.jpg" },
    { name: "Milk", price: 2.00, img: "images/milk.jpg" },
    { name: "Eggs", price: 3.00, img: "images/eggs.jpg" },
    { name: "Bread", price: 1.50, img: "images/bread.jpg" },
    { name: "Chicken", price: 5.00, img: "images/chicken.jpg" },
    { name: "Beef", price: 6.00, img: "images/beef.jpg" },
    { name: "Fish", price: 7.00, img: "images/fish.jpg" },
    { name: "Rice", price: 1.25, img: "images/rice.jpg" },
    { name: "Pasta", price: 1.75, img: "images/pasta.jpg" },
    { name: "Cheese", price: 4.00, img: "images/cheese.jpg" },
];

// Cart array and discount visitor
let cart = [];
let selectedPaymentMethod = null;

// Discount Visitor Pattern
class DiscountVisitor {
    constructor(discountRate) {
        this.discountRate = discountRate;
    }
    applyDiscount(total) {
        return total - (total * this.discountRate);
    }
}

// Cart Builder Pattern
class CartBuilder {
    constructor() {
        this.cart = [];
        this.totalAmount = 0;
    }
    addProduct(product) {
        this.cart.push(product);
        this.totalAmount += product.price;
        return this; 
    }
    build() {
        return {
            cart: this.cart,
            totalAmount: this.totalAmount
        };
    }
}

function login() {
    const password = document.getElementById('password').value;
    if (password.length >= 6) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('catalogPage').style.display = 'block';
        displayProducts();
    } else {
        alert("Password must be at least 6 characters.");
    }
}

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${(product.price * 80).toFixed(2)}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    alert(productName + " added to cart.");
}

function viewCart() {
    document.getElementById('catalogPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - ₹${(item.price * 80).toFixed(2)}</p>`;
    });
    document.getElementById('totalAmount').innerText = (total * 80).toFixed(2);

    const discountVisitor = new DiscountVisitor(0.1); // 10% discount
    const discountedTotal = discountVisitor.applyDiscount(total * 80);
    document.getElementById('discountedTotal').innerText = discountedTotal.toFixed(2);
}

function proceedToPayment() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'block';
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0) * 80;
    const discountVisitor = new DiscountVisitor(0.1);
    const discountedTotal = discountVisitor.applyDiscount(totalAmount);
    document.getElementById('finalAmount').innerText = discountedTotal.toFixed(2);
}

function selectPayment(method) {
    selectedPaymentMethod = method;
    document.getElementById('paymentMethod').innerText = method;
    document.getElementById('paymentConfirmation').style.display = 'block';
}

function payNow() {
    if (selectedPaymentMethod) {
        document.getElementById('paymentPage').innerHTML = `
            <h2>Payment Successful</h2>
            <p>You selected: ${selectedPaymentMethod}</p>
            <p>Total Amount: ₹${document.getElementById('finalAmount').innerText}</p>
            <button onclick="backToCatalog()">Back to Catalog</button>
        `;
    } else {
        alert("Please select a payment method before proceeding.");
    }
}

function backToCatalog() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'none';
    document.getElementById('catalogPage').style.display = 'block';
}
