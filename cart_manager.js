function addToCart(product) {
    // Create a new cart item with a unique cart ID
    const cartItem = {
        ...product,
        //cartId: `${product.id}-${Date.now()}`
    };
    //addToCartbackend(product.id, 1); // Call the backend API to add the item to the cart
    console.log(cartItem);
    cart.push(cartItem);
    //console.log(cart)
    updateCartBadge();
    updateCartUI();

    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50';
    feedback.textContent = `${product.name} added to cart`;
    document.body.appendChild(feedback);

    // Remove feedback after 2 seconds
    setTimeout(() => {
        feedback.classList.remove('animate-fade-in');
        feedback.classList.add('animate-fade-out');
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// Remove from Cart
function removeFromCart(cartId) {
    const index = cart.findIndex(item => item.cartId === cartId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartBadge();
        updateCartUI();
    }
}

// Update Cart Badge
function updateCartBadge() {
    cartBadge.textContent = cart.length;
}

// Update Cart UI
function updateCartUI() {

    if (cart.length === 0) {
        cartItems.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        cartSubtotal.textContent = "₦0.00";
    } else {
        cartItems.classList.remove('hidden');
        emptyCart.classList.add('hidden');

        // Calculate subtotal
        const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        cartSubtotal.textContent = `₦${subtotal}`;

        // Update cart items
        cartItems.innerHTML = '';

        // Group items by product id to show quantity
        const groupedItems = cart.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = {
                    ...item,
                    quantity: 1
                };
            } else {
                acc[item.id].quantity += 1;
            }
            return acc;
        }, {});

        Object.values(groupedItems).forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'flex items-start pb-4 border-b dark:border-gray-700 animate-fade-in';
            cartItemEl.innerHTML = `
                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain p-2">
                </div>
                <div class="flex-grow">
                    <h4 class="font-medium text-sm">${item.name}</h4>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                            ₦${item.price} × ${item.quantity}
                        </span>
                        <span class="font-medium">₦${(item.price * item.quantity)}</span>
                    </div>
                    <div class="mt-2 flex space-x-2">
                        <button class="remove-item-btn text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400" data-id="${item.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `;

            cartItems.appendChild(cartItemEl);

            // Add event listener to remove button
            cartItemEl.querySelector('.remove-item-btn').addEventListener('click', () => {
                // Remove all instances of this product
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCartBadge();
                updateCartUI();
            });
        });
    }
}

// Toggle Cart
function toggleCart() {
    cartDrawer.classList.toggle('closed');
    cartDrawer.classList.toggle('open');
    overlay.classList.toggle('hidden');
    overlay.classList.toggle('visible');
}

// Checkout
function checkout() {
    // Hide cart
    toggleCart();

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    // Update checkout totals
    checkoutSubtotal.textContent = `₦${subtotal}`;
    checkoutTotal.textContent = `₦${total}`;

    // Show checkout modal
    checkoutModal.classList.remove('hidden');
}

// Complete Order
function completeOrder(e) {
    e.preventDefault();

    // Hide checkout modal
    checkoutModal.classList.add('hidden');

    // Calculate order totals
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    // Group items for summary
    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = {
                ...item,
                quantity: 1
            };
        } else {
            acc[item.id].quantity += 1;
        }
        return acc;
    }, {});

    // Prepare order summary
    let summaryHTML = `
        <div class="text-sm">
            <p class="font-medium mb-2">Order #${Math.floor(10000 + Math.random() * 90000)}</p>
            <div class="space-y-1 mb-3">
    `;

    Object.values(groupedItems).forEach(item => {
        summaryHTML += `
            <div class="flex justify-between">
                <span>${item.quantity} × ${item.name}</span>
                <span>$${(item.price * item.quantity)}</span>
            </div>
        `;
    });

    summaryHTML += `
            </div>
            <div class="border-t dark:border-gray-600 pt-2 space-y-1">
                <div class="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₦${subtotal}</span>
                </div>
                <div class="flex justify-between">
                    <span>Shipping:</span>
                    <span>₦${shipping}</span>
                </div>
                <div class="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₦${total}</span>
                </div>
            </div>
        </div>
    `;

    // Update order summary and show confirmation
    orderSummary.innerHTML = summaryHTML;
    confirmationModal.classList.remove('hidden');

    // Clear cart
    cart = [];
    updateCartBadge();
    updateCartUI();
}
