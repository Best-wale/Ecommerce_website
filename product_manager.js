function displayProducts(products) {
    // Filter products based on category and search
    let filteredProducts = products;

    // Sort products
    if (currentSort === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "name-desc") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Check if there are any products
    if (filteredProducts.length === 0) {
        productsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        productsContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');

        // Generate HTML for products
        productsContainer.innerHTML = "";

        filteredProducts.forEach(product => {
            // Create product card



            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in';
            productCard.innerHTML = `
                <div class="product-image-container bg-gray-200 dark:bg-gray-700">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain p-4">
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-lg mb-1 truncate-2 h-14">${product.name}</h3>
                    <div class="flex items-center mb-2">
                        ${generateStarRating(4)}
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">(${product.rating})</span>
                    </div>
                    <p class="font-bold text-lg text-primary dark:text-primary-light">$${product.price}</p>
                    <button class="add-to-cart-btn mt-3 w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            `;

            // Add click event to show product details
            productCard.querySelector('.product-image-container').addEventListener('click', () => {
                showProductDetails(product);
            });

            productCard.querySelector('h3').addEventListener('click', () => {
                showProductDetails(product);
            });

            // Add click event for add to cart button
            productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                addToCart(product);
            });

            productsContainer.appendChild(productCard);

        });
    }
}


// Show product details
function showProductDetails(product) {
    modalContent.innerHTML = `
        <div class="flex justify-between items-start">
            <h2 class="text-xl font-bold">${product.name}</h2>
            <button id="closeProductModal" class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div class="mt-4">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        </div>
        
        <div class="mt-4">
            <div class="flex items-center mb-2">
                ${generateStarRating(product.rating)}
                <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">(${product.rating})</span>
            </div>
            <p class="font-bold text-xl text-primary dark:text-primary-light">$${product.price}</p>
            <p class="text-gray-700 dark:text-gray-300 my-3">${product.description}</p>
            
            <div class="mt-6 flex items-center">
                <div class="mr-4">
                    <label for="quantity" class="block text-sm font-medium mb-1">Quantity</label>
                    <div class="flex items-center">
                        <button id="decreaseQuantity" class="p-2 bg-gray-200 dark:bg-gray-700 rounded-l-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <input type="number" id="quantity" min="1" value="1" class="w-12 text-center py-2 border-y border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none text-base">
                        <button id="increaseQuantity" class="p-2 bg-gray-200 dark:bg-gray-700 rounded-r-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <button id="addToCartModal" class="flex-grow py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    // Show modal
    productModal.classList.remove('hidden');

    // Event listeners
    document.getElementById('closeProductModal').addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    modalOverlay.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    document.getElementById('decreaseQuantity').addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    document.getElementById('increaseQuantity').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    // Add to cart
    document.getElementById('addToCartModal').addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        productModal.classList.add('hidden');
    });
}
