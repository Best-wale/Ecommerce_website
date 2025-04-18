function ApiCall(category = "", search = "") {
    // Construct query string dynamically
    const para = [];
    if (category) para.push(`category=${category}`);
    if (search) para.push(`search=${search}`);
    const queryString = para.length > 0 ? `?${para.join('&')}` : "";
    console.log(queryString);
    // API Endpoint
    const apiEndpoint = `https://bestwale.pythonanywhere.com/ecommerce/products/${queryString}`;

    // AJAX Call
    $.ajax({
        url: apiEndpoint,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data); // Log the API response
            displayProducts(data); // Display products
        },
        error: function (error) {
            console.error("Error fetching products:", error);
            displayProducts(); // Fallback to local products
        }
    });
}





function cartFunc(product) {
    // Construct query string dynamically
    const productId = product.id;
    const quantity = 1;
    // API Endpoint
    const apiEndpoint = `https://bestwale.pythonanywhere.com/ecommerce/cart/`;
    // AJAX Call
    $.ajax({
        url: apiEndpoint,
        method: "POST",
        data: JSON.stringify(
            {
                product: productId,
                quantity: quantity

            },
        ),
        headers: {
            'Content-Type': 'application/json'
        },
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log(response); // Log the API response

        },
        error: function (error) {
            console.error("Error fetching products:", error);

        }
    });
}
