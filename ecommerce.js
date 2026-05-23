const products = [
    { id: 1, name: "Shoes", price: 2000, image: "shoes.png" },
    { id: 2, name: "Watch", price: 1500, image: "watches.png" },
    { id: 3, name: "Bag", price: 1000, image: "bag.png" }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const cartDiv = document.getElementById("cart");

function displayProducts() {
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);

    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <button onclick="removeItem(${item.id})">X</button>
        `;

        cartItems.appendChild(div);
    });

    totalPrice.innerText = total;
    cartCount.innerText = cart.length;
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

document.getElementById("cart-btn").addEventListener("click", () => {
    cartDiv.classList.remove("hidden");
});

function closeCart() {
    cartDiv.classList.add("hidden");
}

displayProducts();
