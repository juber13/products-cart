const products = [
  { id: 0, name: "shirt", price: 100, qty: 0 },
  { id: 1, name: "pants", price: 200, qty: 0 },
  { id: 2, name: "shoes", price: 300, qty: 0 },
];

// let totalAmount = document.getElementById('total-container');
const cart = [];

function getProducts(data) {
  console.log("Enter in the pro");
  let html = data.map((product, id) => {
    return `<div class="product">
                <div class="name">
                    <h3>${product.name}</h3>
                </div>
                <div class="price">
                    <h3>${product.price}</h3>
                </div>
                <div class="btns">
                    <button class="btn" id="increase" data-index=${product.id}> + </button>
                    <button class="btn" id="quentity">${product.qty}</button>
                    <button class="btn" id="decrease" data-index=${product.id}> - </button>
                </div>
            </div>`;
  });

  document.getElementById("products-container").innerHTML = html.join("");

  return html;
}

getProducts(products);


// console.log(document.get)

let isQuentityUpdated = false;

let btns = document.querySelectorAll(".btns");
btns.forEach(btn =>
  btn.addEventListener("click", function (e) {
    if (e.target.id == "increase") {
      // get the btn id
      const productId = e.target.dataset.index;
      const productName = products[productId].name;
      let isProductsAdded = cart.some(product => product.id == productId);
      if (isProductsAdded) {
        cart[e.target.dataset.index].qty += 1;
        // products[e.target.dataset.index].qty += 1;
        // getProducts(products);
        renderCartProducts(cart);
        amountToPay(cart);
      } else {
        const createProduct = {};
        createProduct["name"] = productName;
        createProduct["id"] = productId;
        createProduct["price"] = products[productId].price;
        createProduct["qty"] = products[productId].qty += 1;
        cart.push(createProduct);
        renderCartProducts(cart);
        amountToPay(cart);
      }
    }

    if (e.target.id == "decrease") {
      const id = e.target.dataset.index;
      let isProductsAdded = cart.some(product => product.id == id);

      if (isProductsAdded) {
        const currProducts = cart[id];
        if (currProducts.qty <= 1) {
          delete cart[id];
          renderCartProducts(cart);
          amountToPay(cart);
        } else {
          cart[id].qty -= 1;
          renderCartProducts(cart);
          amountToPay(cart);
        }
      }
    }
  })
);

function renderCartProducts(data) {
  const cartHtml = data.map(item => {
    return `<div class="product cart-product">
                <div class="name">
                <h3>${item.name}</h3>
                </div>
                <div class="name">
                <h3>${item.qty} X ${item.price}</h3>
                </div>
                
                <div class="price">
                <h3>${item.qty * item.price}</h3>
                </div>
           </div>
           `;
  });

  if (cart.length >= 1) {
    document.getElementById("cart-container").innerHTML = cartHtml.join("");
  } else emptyCart();
}

function emptyCart() {
  return (document.getElementById(
    "cart-container"
  ).innerHTML = `<div class="empty-container">
                <h2>Cart is Empty  </h2>
                <i class="fa-solid fa-cart-shopping fa-beat" style="color: #4b72b4;"></i>
                </div>`);
}

function amountToPay(data) {
  const totalContainer = document.getElementById("total-container");
  console.log(totalContainer);
  const total = data.reduce(
    (acc, curr) => acc + Number(curr.price) * curr.qty,
    0
  );
  if (total == 0) {
    emptyCart();
    totalContainer.classList.add("remove");
  }
  totalContainer.classList.add("active");
  const amountContainer = document.getElementById("total");
  amountContainer.innerText = total;
}



emptyCart();
