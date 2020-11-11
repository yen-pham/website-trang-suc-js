function changeArray(data) {
  let result=[];
  Object.keys(data).map((key)=>{
    data[key].id=key;
    result.push(data[key]);
  })
  return result
}

var cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1.$2");
  return x;
}
function showpro(category,products) {
  var html="";
  Object.keys(category).map(cate=>{
    html+=`<h3 id="${cate}">${category[cate].categoryName}</h3>`;
    Object.keys(products).map((i)=>{
    if(products[i].categoryId==cate){
        var n=i ;
      n++;
      html += `
      <div class="col-sm-4 itemPro"  style="margin-bottom: 20px">
       
      <!-- normal -->
      <div class="ih-item square effect13 left_to_right"><a>
          <div class="img"><img src=${products[i].image} alt="img"></div>
          <div class="info">
            <h3 onClick="productDetail('${i}')">${products[i].name}</h3>
            <h5>Giá: ${numberWithCommas(products[i].price)} vnđ</h5>
            <button type="button"  class="btn btn-outline-light" onclick="addCart('${i}')"><i class="fa fa-cart-plus" aria-hidden="true"></i> Thêm vào giỏ hàng</button>
          </div></a></div>
      <!-- end normal -->
   
    </div>
      `;
      }
      
    })
  });
  
  
  document.getElementById('show').innerHTML= html;
  
}
function showcate(category) {
  var htmlCate="";
  Object.keys(category).map(i=>{
    var n=i ;
    n++;
    htmlCate +=`
    <li class="list-group-item cateItem"> <a href="#${i}"> <i class="fa fa-angle-right" aria-hidden="true"></i>
    ${category[i].categoryName}</a></li>
    `
})
document.getElementById('cateList').innerHTML=htmlCate;
}
function show() {

  getDataAsync('').then(data => {showcate(data.category);showpro(data.category,data.products)});  

}
function addCart(proId) {
  console.log(proId);
  if(localStorage.getItem("user")){
    getDataAsync('products').then(products=>
      {
        let pro= products[proId];
    let product=changeArray(products);
    console.log(product);
      if(cart.length>0) {
        let proIndex = cart.findIndex(p=> p.product.id == proId);
        console.log(proIndex);
        if(proIndex==-1) {
          cart.push({product:pro,quantity:1, total: pro.price});
        }
        else {cart[proIndex].quantity +=1;
        cart[proIndex].total=cart[proIndex].quantity*cart[proIndex].product.price }
      }
      else cart.push({product:pro,quantity:1, total: pro.price});
      localStorage.setItem("cart",JSON.stringify(cart));
      document.getElementById("cart").innerHTML= `Cart(${cart.length})`;
      document.getElementsByClassName("alert")[0].style.display="block";
      setTimeout(() => {
         document.getElementsByClassName("alert")[0].style.display = "none";
      }, 2000);
  }
      )}
    
  else {
    alert("bạn cần đăng nhập để mua hàng!!")
    window.location="login.html";
  }
  

}
function closeAlert() {
  document.getElementsByClassName("alert")[0].style.display = "none";
}
function productDetail(id) {
  localStorage.setItem("proDetail",id);
  window.location="product-detail.html"
    }