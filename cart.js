function toggleCartDropdown() {
    const cartDropdown = document.querySelector(".dropdown-menu");
    cartDropdown.classList.toggle("show");
  }

// Initialize the cart as an empty array
let cartItems = [];

// Function to add an item to the cart
function addItemToCart() {
  const selectedSize = document.querySelector('input[name="size"]:checked');
  if (!selectedSize) {
    alert('Please select a size before adding to cart.');
    return;
  }

  const size = selectedSize.value;
  const productTitle = document.getElementById('productTitle').textContent;
  const productPrice = parseFloat(
    document.getElementById('productPrice').textContent.replace('$', '')
  );

  // Check if the item with the same title and size is already in the cart
  const existingItem = cartItems.find(
    (item) => item.title === productTitle && item.size === size
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    // If the item doesn't exist in the cart, add it as a new entry
    cartItems.push({
      title: productTitle,
      size: size,
      price: productPrice,
      quantity: 1,
    });
  }

  updateCartItemCount();
}

// Function to update the cart item count in the header
function updateCartItemCount() {
  const cartItemCountElement = document.getElementById('cart-item-count');
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartItemCountElement.textContent = cartItemCount;
}

// Function to toggle the cart dropdown
function toggleCartDropdown() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.classList.toggle('show');
  displayCartItems();
}

// Function to display cart items in the dropdown
function displayCartItems() {
  const cartDropdown = document.querySelector('.dropdown-menu');
  cartDropdown.innerHTML = '';

  cartItems.forEach((item) => {
    const cartItemRow = document.createElement('li');
    cartItemRow.classList.add('dropdown-item');

    const itemQuantity = document.createElement('span');
    itemQuantity.textContent = `x${item.quantity} ${item.size}`;
    cartItemRow.appendChild(itemQuantity);

    const itemTitle = document.createElement('span');
    itemTitle.textContent = item.title;
    cartItemRow.appendChild(itemTitle);

    cartDropdown.appendChild(cartItemRow);
  });

  // Display "Empty Cart" message if cart is empty
  if (cartItems.length === 0) {
    const emptyCartMsg = document.createElement('li');
    emptyCartMsg.classList.add('dropdown-item');
    emptyCartMsg.textContent = 'Empty Cart';
    cartDropdown.appendChild(emptyCartMsg);
  }
}

// Event listener for adding item to cart
document.getElementById('addToCartButton').addEventListener('click', addItemToCart);

// Event listener for window load to update product details and cart item count
window.onload = () => {
  updateProductDetails();
  updateCartItemCount();
};