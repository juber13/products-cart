const products = [
    { id: 0, name: "shirt", price: 100, qty: 0 },
    { id: 1, name: "pants", price: 200, qty: 0 },
    { id: 2, name: "shoes", price: 300, qty: 0 },
  ];

  const cart = [];
  
  
  
  const renderHtml = (data) => {
    console.log(data)
    const html = data.map((product, id) => {
        return `<div class="product">
                    <div class="name">
                        <h3>${product.name}</h3>
                    </div>
                    <div class="price">
                        <h3>${product.price}</h3>
                    </div>
                    <div class="btns">
                        <button onClick="increase(this)" class="btn" id="increase" data-index=${product.id}> + </button>
                        <button  class="btn" id="quentity">${product.qty}</button>
                        <button onClick="decrease(this)" class="btn" id="decrease" data-index=${product.id}> - </button>
                    </div>
                  </div>`;
        }); 

     document.getElementById("products-container").innerHTML = html.join("");

  }

  renderHtml(products);

  const increase = (target) => {
    const index = target.getAttribute('data-index');
     const currentProduct = products[index];
     const isProductExits = cart.some(product => product.id === currentProduct.id)
     if(isProductExits){
        currentProduct.qty += 1;
        renderHtml(products);
        renderCartProducts(cart);
        amountToPay(cart);
      }
        else {
            cart.push(currentProduct);
            renderCartProducts(cart);
     }
  }


  const decrease = (target) => {
     const index = target.getAttribute('data-index');
     const currentProduct = products[index];
     const isProductExits = cart.some(product => product.id === currentProduct.id)
     if(isProductExits){
         
        if(currentProduct.qty <= 1){
          delete cart[index];
          console.log(cart)
          renderHtml(products);
          renderCartProducts(cart);
        }

        currentProduct.qty -= 1;
        renderHtml(products);
        renderCartProducts(cart);
        amountToPay(cart);
      }
       
  }


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


//  window.getAttribute


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
  
  function emptyCart() {
    return (document.getElementById(
      "cart-container"
    ).innerHTML = `<div class="empty-container">
                  <h2>Cart is Empty  </h2>
                  <i class="fa-solid fa-cart-shopping fa-beat" style="color: #4b72b4;"></i>
                  </div>`);
  }
  
emptyCart();

