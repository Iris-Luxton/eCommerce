
async function fetchProductInfo() {
    try {
        const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product information:', error);
    }
}

async function updateProductDetails() {
    const productInfo = await fetchProductInfo();

    if (productInfo) {
        document.getElementById('productImage').src = productInfo.imageURL;
        document.getElementById('productTitle').textContent = productInfo.title;
        document.getElementById('productDescription').textContent = productInfo.description;
        document.getElementById('productPrice').textContent = '$' + productInfo.price.toFixed(2);

        const sizeSelectionDiv = document.getElementById('sizeSelection');
        sizeSelectionDiv.innerHTML = '';

        const selectedSizeDisplay = document.querySelector('.selected-size');


        productInfo.sizeOptions.forEach((option) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            const sizeBox = document.createElement('div');

            input.type = 'radio';
            input.name = 'size';
            input.value = option.label;

            sizeBox.classList.add('size-box');
            sizeBox.textContent = option.label;

            label.appendChild(input);
            label.appendChild(sizeBox);
            sizeSelectionDiv.appendChild(label);
        });
        const radioButtons = document.querySelectorAll('input[name="size"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('click', () => {
                selectedSizeDisplay.textContent = radio.value;
            });
        });
    }
}

window.onload = updateProductDetails;