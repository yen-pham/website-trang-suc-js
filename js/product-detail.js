function changeArray(data) {
  let result=[];
  Object.keys(data).map((key)=>{
    data[key].id=key;
    result.push(data[key]);
  })
  return result
}
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1.$2");
  return x;
}
function loadProDetail () {
	let proDetail = localStorage.getItem("proDetail")?localStorage.getItem("proDetail"):0;

	getDataAsync(`products/${proDetail}`).then(pro=>{	
		document.getElementById("pro-img").src=pro.image;
	document.getElementById("pro-name").innerHTML=pro.name;
	getDataAsync(`category/${pro.categoryId}`).then(cate=>{	document.getElementById("pro-cate").innerHTML=cate.categoryName;
})
	document.getElementById("pro-price").innerHTML=numberWithCommas(pro.price)+" vnđ";
	document.getElementById("pro-des").innerHTML=pro.description;
	document.getElementById("pro-stock").innerHTML=pro.stock;
})
}
function addCart() {
	let proId = localStorage.getItem("proDetail")?localStorage.getItem("proDetail"):0;
	let cart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
	console.log(cart);
	let qty= parseInt(document.getElementById('qty').value);
	console.log(qty);
  if(localStorage.getItem("user")){
    getDataAsync('products').then(products=>
      {
        let pro= products[proId];
    let product=changeArray(products);
      if(cart.length>0) {
        let proIndex = cart.findIndex(p=> p.product.id == proId);
        if(proIndex==-1) {
          cart.push({product:pro,quantity:qty, total: pro.price});
        }
        else {cart[proIndex].quantity +=qty;
        cart[proIndex].total=cart[proIndex].quantity*cart[proIndex].product.price }
      }
      else cart.push({product:pro,quantity:qty, total: pro.price});
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
  }}