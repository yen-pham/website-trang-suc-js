var cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1.$2");
  return x;
}
function showCart() {
  var html="";
  for (i in cart) {
    var n=i ;
    n++;
    html += `
    <li class="items even">
    <div class="infoWrap"> 
     <div class="cartSection info">
          
     <img src=${cart[i].product.image} alt="" class="itemImg" />
       <p class="itemNumber">#${cart[i].product.id}</p>
       <h3>${cart[i].product.name}</h3>
     
       <p> <input type="text"  class="qty" onkeyup="changeQuantity(${cart[i].product.id},this.value)"  value=${cart[i].quantity} > x ${numberWithCommas(cart[i].product.price)} vnđ</p> 
       <p id="valid-${cart[i].product.id}" style="color:red;"></p>      
     </div>  
 
     
     <div class="prodTotal cartSection"  >
       <p id="total-${cart[i].product.id}">${numberWithCommas(cart[i].total)} vnđ</p>
     </div>
 
         <div class="cartSection removeWrap">
        <a class="remove" onclick="delProCart(${cart[i].product.id})">x</a>
     </div>
      </div>
   </li>
   `
   document.getElementById("showCart").innerHTML= html;
   document.getElementById("subtotal").innerHTML =numberWithCommas(totalCart())+" vnđ";
   document.getElementById("totalFinal").innerHTML=numberWithCommas(totalCart()+30000)+" vnđ";
   document.getElementById("cart").innerHTML= `Cart(${cart.length})`;

  }
}
function totalCart() {
  let total = 0;
  cart.map(val=>{
      total+=Number.parseInt(val.total)
  })
  return total;
}
function changeQuantity(proId,qty) {
  // console.log(/^[0-9]*$/.test(qty));
  if( !/^[0-9]*$/.test(qty) || qty==""){
    if(qty!="") {document.getElementById("valid-"+proId).innerHTML="Vui lòng nhập số!!!"}
    else {document.getElementById("valid-"+proId).innerHTML=""};

  }
  else {
    if(Number.parseInt(qty)==0){
      if(confirm("Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng!!!")){
        cart = cart.filter(p=>p.product.id !=proId);
        localStorage.setItem("cart",JSON.stringify(cart));
        document.getElementById("cart").innerHTML= `Cart(${cart.length})`;
        showCart();
      }
      else showCart();
      
    }
    else 
     {let proIndex =cart.findIndex(p=>p.product.id==proId);
  cart[proIndex].quantity=   Number.parseInt(qty)  ;
  cart[proIndex].total=   Number.parseInt(qty)  *cart[proIndex].product.price;
  localStorage.setItem("cart",JSON.stringify(cart));

  
  document.getElementById("cart").innerHTML= `Cart(${cart.length})`;
  document.getElementById("valid-"+proId).innerHTML=""
  // showCart();
  document.getElementById("total-"+proId).innerHTML=numberWithCommas(cart[proIndex].total)+" vnđ";
  document.getElementById("subtotal").innerHTML =numberWithCommas(totalCart())+" vnđ";
  document.getElementById("totalFinal").innerHTML=numberWithCommas(totalCart()+30000)+" vnđ";
}
  }
 
}
function delProCart(proId) {
  if(confirm("Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng!!!")){
    cart = cart.filter(p=>p.product.id !=proId);
    localStorage.setItem("cart",JSON.stringify(cart));
    document.getElementById("cart").innerHTML= `Cart(${cart.length})`;
    showCart();
  }
  else showCart();
}