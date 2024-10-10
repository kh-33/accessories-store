document
  .getElementById("searchButton")
  .addEventListener("click", performSearch);

let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");
let shoppingCartIcon = document.querySelector(".shopping_cart");
let cartsProducts = document.querySelector(".carts_products");

let allProducts = document.querySelector(".products");
let products = [
  {
    id: 1,
    title: "Sinaala",
    color: "Rose gold",
    price: "40$",
    imageUrl: "./images/prod1.webp",
  },
  {
    id: 2,
    title: "Sininaa",
    color: "Silver",
    price: "45$",
    imageUrl: "./images/prod2.webp",
  },
  {
    id: 3,
    title: "Senatta",
    color: "Silver",
    price: "30$",
    imageUrl: "./images/prod3.webp",
  },
  {
    id: 4,
    title: "Neenia",
    color: "Rose gold",
    price: "25$",
    imageUrl: "./images/prod4.webp",
  },
  {
    id: 5,
    title: "Beksia",
    color: "Floral",
    price: "23$",
    imageUrl: "./images/prod5.webp",
  },
  {
    id: 6,
    title: "Brendy",
    color: "Pale green",
    price: "23$",
    imageUrl: "./images/prod6.webp",
  },
];

// Check if the user is logged in
if (localStorage.getItem("username")) {
  links.style.display = "none";
  userInfo.style.display = "flex";
  userD.innerHTML = localStorage.getItem("username");
} else {
  window.location = "login.html";
}

// Event listener for logout button
let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1000);
});

// Function to draw product items
function drawItems(productsToDraw) {
  let y = productsToDraw
    .map((item) => {
      return `
            <div class="product_item">
                <img class="product_item_img" src="${item.imageUrl}" alt="item">
                <div class="product_item_desc">
                    <h2>${item.title}</h2>
                    <p>High quality accessories</p>
                    <span>${item.color}</span> <br/>
                    <span>${item.price}</span>
                   
                </div>
                <div class="product_item_action">
                   
                    <button class="add_to_cart" onClick="addToCart(${item.id})">Add To Cart</button>
                </div>
            </div>
        `;
    })
    .join("");
  allProducts.innerHTML = y;
}

// Initial draw
drawItems(products);

function performSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(query) ||
      product.color?.toLowerCase().includes(query) ||
      product.price?.toLowerCase().includes(query)
  );

  drawItems(filteredProducts);
}

let cartProductDiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".badge");

let addedItem = localStorage.getItem("ProductsInCart")
  ? JSON.parse(localStorage.getItem("ProductsInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductDiv.innerHTML += `<p>${item.title} <span> ${item.price}</span></p>`;
  });
  badge.style.display = "block";
  badge.innerHTML = addedItem.length;
}

if (localStorage.getItem("username")) {
  function addToCart(id) {
    let choosenItem = products.find((item) => item.id === id);
    cartProductDiv.innerHTML += `<p>${choosenItem.title}</p>`;

    addedItem = [...addedItem, choosenItem];
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    let cartProductsLength = document.querySelectorAll(".carts_products div p");
    badge.style.display = "block";
    badge.innerHTML = cartProductsLength.length;
  }
} else {
  window.location = "login.html";
}

// Shopping cart icon

shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
  if (cartProductDiv.innerHTML != "") {
    if (cartsProducts.style.display == "block") {
      cartsProducts.style.display = "none";
    } else {
      cartsProducts.style.display = "block";
    }
  }
}
