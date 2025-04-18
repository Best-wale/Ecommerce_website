
/*const products1 = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones with 30-hour battery life and superior sound quality. Features comfortable ear cushions and foldable design for easy storage.",
        price: 129.99,
        category: "electronics",
        image: generateProductImage("headphones", "#5D5CDE"),
        rating: 4.5
    },
    {
        id: 2,
        name: "Smartphone Pro Max",
        description: "Flagship smartphone with 6.7-inch OLED display, 12GB RAM, 256GB storage, and quad-camera system. Water-resistant and supports fast charging.",
        price: 999.99,
        category: "electronics",
        image: generateProductImage("smartphone", "#333"),
        rating: 4.8
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        description: "Classic fit cotton t-shirt made from 100% organic cotton. Breathable, comfortable, and available in multiple colors. Machine washable.",
        price: 19.99,
        category: "clothing",
        image: generateProductImage("tshirt", "#3498db"),
        rating: 4.2
    },
    {
        id: 4,
        name: "Designer Jeans",
        description: "Slim-fit designer jeans with stretch denim for comfort. Features classic 5-pocket styling and is made from premium cotton blend.",
        price: 89.99,
        category: "clothing",
        image: generateProductImage("jeans", "#2c3e50"),
        rating: 4.3
    },
    {
        id: 5,
        name: "Smart Coffee Maker",
        description: "Programmable coffee maker with smartphone control. Schedule brewing times, adjust strength, and receive notifications when coffee is ready.",
        price: 149.99,
        category: "home",
        image: generateProductImage("coffeemaker", "#8B4513"),
        rating: 4.7
    },
    {
        id: 6,
        name: "Non-Stick Cookware Set",
        description: "10-piece non-stick cookware set with durable coating and heat-resistant handles. Dishwasher safe and compatible with all stovetops including induction.",
        price: 199.99,
        category: "home",
        image: generateProductImage("cookware", "#C0C0C0"),
        rating: 4.6
    },
    {
        id: 7,
        name: "Vitamin C Serum",
        description: "Brightening serum with 20% Vitamin C and Hyaluronic Acid. Reduces fine lines, dark spots, and improves skin texture. Suitable for all skin types.",
        price: 34.99,
        category: "beauty",
        image: generateProductImage("serum", "#FF69B4"),
        rating: 4.4
    },
    {
        id: 8,
        name: "Hydrating Face Mask Set",
        description: "Pack of 10 sheet masks with various formulations for hydration, brightening, and anti-aging. Made with natural ingredients and free from harmful chemicals.",
        price: 24.99,
        category: "beauty",
        image: generateProductImage("mask", "#E6E6FA"),
        rating: 4.1
    },
    {
        id: 9,
        name: "Bestselling Novel",
        description: "Award-winning fiction novel by a renowned author. This page-turner combines mystery, romance, and adventure in a compelling narrative.",
        price: 14.99,
        category: "books",
        image: generateProductImage("book", "#D2691E"),
        rating: 4.9
    },
    {
        id: 10,
        name: "Cookbook Collection",
        description: "Collection of three cookbooks covering different cuisines. Includes detailed recipes, cooking techniques, and beautiful food photography.",
        price: 39.99,
        category: "books",
        image: generateProductImage("books", "#006400"),
        rating: 4.7
    },
    {
        id: 11,
        name: "Fitness Tracker",
        description: "Water-resistant fitness tracker with heart rate monitoring, sleep tracking, and 7-day battery life. Syncs with smartphone app for detailed fitness insights.",
        price: 79.99,
        category: "electronics",
        image: generateProductImage("tracker", "#FF4500"),
        rating: 4.3
    },
    {
        id: 12,
        name: "Leather Wallet",
        description: "Genuine leather wallet with RFID blocking technology. Features multiple card slots, ID window, and coin pocket. Slim design fits comfortably in pocket.",
        price: 49.99,
        category: "clothing",
        image: generateProductImage("wallet", "#8B4513"),
        rating: 4.5
    }
];
*/


//serach bar
//press enter to search product

$(document).ready(function () {

    ApiCall();
    // Search bar: Press Enter to search product
    // Select all buttons with the class "category-btn"
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Add event listeners to each button
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Access the data-category attribute value
            const category = button.dataset.category;
            // Call a function to filter products based on the category
            ApiCall(category, '');
        });
    });


    $('#searchInput').on('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchQuery = $(this).val().trim(); // Get the search input value
            if (searchQuery) {
                ApiCall('', searchQuery); // Call the API with the search query
            }
        }
    });
});



/* Start Api Calls */

/* End all API Calls */


// Cart functionality

let cart = [];
let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

// DOM Elements


// Display Products

// Add to Cart

// Initialize the app
function init() {
    // Set up event listeners

    // Category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
            });

            button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
            button.classList.add('bg-primary', 'text-white');

            currentCategory = button.dataset.category;
            productHeading.textContent = currentCategory === "" ? "All Products" : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`;
            displayProducts();
        });
    });



    // Sort select
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        displayProducts();
    });

    // Cart buttons
    cartButton.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    startShoppingBtn.addEventListener('click', toggleCart);

    // Checkout
    checkoutButton.addEventListener('click', checkout);
    closeCheckoutButton.addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    // Profile button
    profileButton.addEventListener('click', login);




    document.getElementById('checkoutOverlay').addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    checkoutForm.addEventListener('submit', completeOrder);

    // Confirmation
    continueShoppingBtn.addEventListener('click', () => {
        confirmationModal.classList.add('hidden');
    });

    // Initialize theme
    initTheme();

    // Display products initially
    displayProducts();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);