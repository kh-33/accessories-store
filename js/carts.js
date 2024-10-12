let removeBtn = document.querySelector("remove-item");
let ProductsInCart = localStorage.getItem("ProductsInCart");
let allProducts = document.querySelector(".products");
let totalValue = document.getElementById("total-value");

if (ProductsInCart) {
  let item = JSON.parse(ProductsInCart);
  drawCartProducts(item);
}

let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

function drawCartProducts(products) {
  if (products.length === 0) {
    allProducts.innerHTML = `<h2>Cart is empty :( <h2>
        <a href="index.html" class='a'>Continue Shopping</a>`;
    totalValue.innerHTML = calcTotal([]);
    return;
  }
  let y = products.map((item) => {
    return `
            <div class="product_item">
                <img class="product_item_img img-fluid" src="${item.imageUrl}" alt="">
                <div class="product_item_desc">
                    <h3>${item.title}</h3>
                    <p>price: ${item.price}</p>
                    <span>${item.color}</span>
                    
                    
                </div>
                <div class="product_item_action">
                    <button class="add_to_cart remove-item" onClick="removeFromCart(${item.id})">Remove Item</button>
                </div>
            </div>
        `;
  });
  allProducts.innerHTML = y.join("");

  totalValue.innerHTML = `Total: $${calcTotal(products)}`;
  checkoutButton();
}

function removeFromCart(id) {
  let choosenItemIndex = addedItem.findIndex((item) => item.id === id);
  if (choosenItemIndex !== -1) {
    addedItem.splice(choosenItemIndex, 1);
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCartProducts(addedItem);
  }
}

function calcTotal(products) {
  if (products.length === 0) return 0;

  return products.reduce((total, product) => {
    let price =
      typeof product.price === "object" ? product.price.value : product.price;
    return total + parseFloat(price);
  }, 0);
}

function checkoutButton() {
  const totalBox = document.querySelector(".total");

  const checkout = document.querySelector(".checkout");
  checkout.innerText = "Checkout";

  checkout.onclick = () => alert("Proceeding to checkout...");

  totalBox.innerHTML = "";
  totalBox.appendChild(totalValue);
  totalBox.appendChild(checkout);
}

drawCartProducts(addedItem);
