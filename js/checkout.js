// document.getElementById
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
}
var carts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
function loadCart() {
  let html = "";
  let total = 0;

  document.getElementById("checkout-all").innerHTML =
    carts.length == 0
      ? `no products`
      : ` <li>Subtotal <span id="sub"></span></li>
  <li>Ship <span id="ship">30.000 vnđ</span></li>
  <li>Total <span id="total"></span></li>`;
  if (cart.length) {
    carts.forEach((p, key) => {
      html += `                  <li><samp>${key + 1}.</samp> ${
        p.product.name
      } <span>${numberWithCommas(p.product.price)} x ${p.quantity} </span></li>
    `;
      total += p.product.price * p.quantity;
    });
    document.getElementById("cartPro").innerHTML = html;
    document.getElementById("sub").innerHTML = numberWithCommas(total) + " vnđ";
    document.getElementById("total").innerHTML =
      numberWithCommas(total + 30000) + " vnđ";
  }
}
function loadInf() {
  user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("fullname").value = user.fullname;
  document.getElementById("username").value = user.username;
  document.getElementById("address").value = user.address;
  document.getElementById("phone").value = user.phone;
  document.getElementById("email").value = user.email;
}

function load() {
  if (localStorage.getItem("user")) {
    loadCart();
    loadInf();
  } else {
    alert("bạn cần đăng nhập để mua hàng!!");
    window.location = "login.html";
  }
}

function checkout() {
  let products = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
  if(products.length) {
    let key = JSON.parse(localStorage.getItem("user")).key;
  let username = document.getElementById("username").value;
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let note = document.getElementById("note").value;
  let total = 30000;
  products.map((p) => (total += p.product.price * p.quantity));
  let bill = {
    products,
    informationBill: { username, fullname, email, address, phone, note },
    total,
  };
  dbRef.ref().child(`users/${key}/bills`).push(bill);
  alert("Cảm ơn bạn đã mua hàng!!!");
  localStorage.removeItem("cart");
  window.location = "home.html";
  } else alert("Vui lòng chọn sản phẩm để mua !!!")
  
}
