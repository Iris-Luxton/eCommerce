
const cartButton = document.querySelector(".my-cart-button");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemCount = document.getElementById("cart-item-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartEmptyMessage = document.getElementById("cart-empty-message");

let cart = [];

function toggleCartDropdown() {
    console.log("Button work")
    if (cart.length === 0) {
        cartEmptyMessage.style.display = "block";
        cartItemsList.style.display = "none";
    } else {
        // If cart has items, toggle the "show" class to display the cart
        cartEmptyMessage.style.display = "none";
        cartItemsList.style.display = "block";
        cartDropdown.classList.toggle("show");
    }
}

function updateCart() {
    cartItemCount.textContent = cart.length;

    // Clear the cart items list before updating
    cartItemsList.innerHTML = "";

    // If the cart is empty, show "Cart Empty" message
    if (cart.length === 0) {
        const cartEmptyItem = document.createElement("li");
        cartEmptyItem.textContent = "Cart Empty";
        cartItemsList.appendChild(cartEmptyItem);
        cartTotal.textContent = "0.00";
        return;
    }

    // If the cart is not empty, update the cart items and total
    let total = 0;
    cart.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.textContent = item.title + " - $" + item.price.toFixed(2);
        cartItemsList.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}
// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    updateCart();
}

