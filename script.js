// Fetch and display products dynamically
const productsContainer = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");
const searchBox = document.getElementById("searchBox");

let products = [];

// Fetch products from JSON file
fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }
    return response.json();
  })
  .then((data) => {
    products = data;
    displayCategories();
    displayProducts(products);
  })
  .catch((error) => {
    productsContainer.innerHTML = `<p>${error.message}</p>`;
  });

// Display categories dynamically
function displayCategories() {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  categoriesContainer.innerHTML = uniqueCategories
    .map(
      (category) =>
        `<li onclick="filterProducts('${category}')">${category}</li>`
    )
    .join("");
}

// Display products dynamically with less information
function displayProducts(productsToDisplay) {
  productsContainer.innerHTML = productsToDisplay
    .map((product) => {
      return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" ${
          product.stock > 0 ? "" : "disabled"
        }>Add to Cart</button>
      </div>
      `;
    })
    .join("");
}

// Filter products by category
function filterProducts(category) {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
}

// Search products
searchBox.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});