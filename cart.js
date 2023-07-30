

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
    const productImageURL = document.getElementById('productImage').src; // Get the product image URL
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
            imageURL: productImageURL,
            quantity: 1,
        });
    }
    updateCartItemCount();
}

// Function to update the cart item count in the header
function updateCartItemCount() {
    const cartItemCountElements = document.querySelectorAll('.cart-item-count');
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartItemCountElements.forEach((element) => {
      element.textContent = cartItemCount;
    });
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
        cartItemRow.classList.add('dropdown-item', 'cart-item');

        // Create a div to hold the item image
        const itemImageDiv = document.createElement('div');
        itemImageDiv.classList.add('item-image');
        const itemImage = document.createElement('img');
        itemImage.src = item.imageURL;
        itemImage.alt = item.title;
        itemImageDiv.appendChild(itemImage);

        // Create a div to hold the item details
        const itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('item-details');

        // Item title
        const itemTitle = document.createElement('div');
        itemTitle.classList.add('item-title');
        itemTitle.textContent = item.title;
        itemDetailsDiv.appendChild(itemTitle);

        // Create a div to hold the item quantity and price
        const itemQuantityPrice = document.createElement('div');
        itemQuantityPrice.classList.add('item-quantity-price'); 

        // Item quantity
        const itemQuantity = document.createElement('span');
        itemQuantity.classList.add('item-quantity'); 
        itemQuantity.textContent = `${item.quantity}x `;
        itemQuantityPrice.appendChild(itemQuantity);

        // Item price
        const itemPrice = document.createElement('span');
        itemPrice.classList.add('item-price'); 
        itemPrice.textContent = `$${(item.price).toFixed(2)}`;
        itemQuantityPrice.appendChild(itemPrice);
        itemDetailsDiv.appendChild(itemQuantityPrice);

        // Item size
        const itemSize = document.createElement('div');
        itemSize.classList.add('item-size'); 
        itemSize.textContent = `Size: ${item.size}`;
        itemDetailsDiv.appendChild(itemSize);

        // Append the image div and item details div to the cart item row
        cartItemRow.appendChild(itemImageDiv);
        cartItemRow.appendChild(itemDetailsDiv);
        cartDropdown.appendChild(cartItemRow);
    });

    // Display "Empty Cart" message if cart is empty
    if (cartItems.length === 0) {
        const emptyCartMsg = document.createElement('li');
        emptyCartMsg.classList.add('dropdown-item');
        emptyCartMsg.textContent = 'Your cart is empty';
        cartDropdown.appendChild(emptyCartMsg);
    }
}

// Event listener for window load to update product details and cart item count
window.onload = () => {
    updateProductDetails();
    updateCartItemCount();
};