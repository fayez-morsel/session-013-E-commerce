const state = {
  products: [
    { id: 1, name: "product #1", price: 15 },
    { id: 2, name: "product #2", price: 23 },
    { id: 3, name: "product #3", price: 12 },
    { id: 4, name: "product #4", price: 9 },
    { id: 5, name: "product #5", price: 18 },
    { id: 6, name: "product #6", price: 22 },
    { id: 7, name: "product #7", price: 30 },
    { id: 8, name: "product #8", price: 25 },
    { id: 9, name: "product #9", price: 19 },
    { id: 10, name: "product #10", price: 14 }
  ],
  cart: {

  },
};


function addToCart(productId) {
  if (state.cart[productId]) {
    state.cart[productId] += 1;
  } else {
    state.cart[productId] = 1;
  }
  renderCart();
}

function removeFromCart(productId) {
  if (state.cart[productId]) {
    delete state.cart[productId];
    renderCart();
  }
}


function renderProducts() {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";

  state.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;
    card.appendChild(name);
    const btn = document.createElement("button");
    btn.className = "add-btn";
    btn.textContent = "ADD TO CART";
    btn.addEventListener("click", () => addToCart(product.id));
    card.appendChild(btn);

    productsList.appendChild(card);
  });
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartFooter = document.getElementById("cart-footer");

  cartList.innerHTML = "";

  const cartEntries = Object.entries(state.cart);
  if (cartEntries.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.textContent = "CART TOTAL: $0";
    return;
  }

  let total = 0;

  cartEntries.forEach(([productId, qty]) => {
    const prod = state.products.find((p) => p.id == productId);
    if (!prod) return;

    total += prod.price * qty;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = prod.name;
    cartItem.appendChild(name);

    const quantity = document.createElement("span");
    quantity.className = "cart-item-qty";
    quantity.textContent = qty;
    cartItem.appendChild(quantity);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "x";
    removeBtn.title = `Remove ${prod.name} from cart`;
    removeBtn.addEventListener("click", () => removeFromCart(prod.id));
    cartItem.appendChild(removeBtn);

    cartList.appendChild(cartItem);
  });

  cartFooter.textContent = `CART TOTAL: $${total}`;
}

renderProducts();
renderCart();
