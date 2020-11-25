let userlocal = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

function loadProfile() {
  if (userlocal) {
    getDataAsync(`users/${userlocal.key}`).then((user) => {
      document.getElementById("fullname-tt").innerHTML = user.fullname;
      document.getElementById("username").value = user.username;
      document.getElementById("fullname").value = user.fullname;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;
      document.getElementById("avata").src = user.avata;
      if (user.role == "admin") {
        document.getElementById("showAdmin").style.display = "inline-block";
      }
      showBill();
    });
  } else
    document.getElementsByClassName(
      "user-profile"
    )[0].innerHTML = `<h4><a href="login.html">You are not logged in, click here to login</a></h4>`;
}
function inputImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      let img = e.target.result;
      document.getElementById("avata").src = img;
    };

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
function editUser(username, fullname, email, phone, avata) {
  console.log(avata);

  getDataAsync(`users/${user.key}`).then((u) => {
    dbRef
      .ref()
      .child(`users/${user.key}`)
      .set({
        ...u,
        username,
        fullname,
        email,
        phone,
        avata,
      })
      .then(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...u,
            username,
            fullname,
            email,
            phone,
            avata,
            key: userlocal.key,
          })
        );
        alert("Cập nhập thành công!!");

        location.reload();
      });
  });
}
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
}
function showBill() {
  getDataAsync(`users/${userlocal.key}/bills`).then((bills) => {
    if (bills) {
      let html = "";
      Object.keys(bills).map((key) => {
        console.log(key);
        html += `<li >${key} 
        <span id="down-${key}" onclick="showDetailBill('${key}')" class="btn-downup"><i class="fa fa-angle-down" aria-hidden="true" ></i></span>
        <span id="up-${key}" onclick="hiddenDetailBill('${key}')" style="display:none" class="btn-downup" onClick=""><i class="fa fa-angle-up" aria-hidden="true"></i>
        </span>
        <div class="container" id="detail-${key}" style="display:none">
       <div class="bg-light p-5">
           <div class="row pt-3 mb-2">
               <div class="col-md-6 pull-left">
                   <p class="text-muted mb-0"><i>${key} </i></p>
               </div>
               <div class="col-md-6 text-right">
                   <p class="text-muted mb-0"><i>Due to: ${
                     bills[key].informationBill.createAt
                   }</i></p>
               </div>
           </div>
           <div class="row b-t pt-5" style="
           padding-top: 0!important;
       ">
               <div class="col-md-12 pt-3 center">
                   <h5 >Client Information</h5>
                   <div class="row">
                       <div class="col-md-6">
                           <label>Username</label>
                       </div>
                       <div class="col-md-6">
                           <p id="username-bill">${
                             bills[key].informationBill.username
                           }</p>  
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-md-6">
                           <label>Full name</label>
                       </div>
                       <div class="col-md-6">
                           <p id="fullname-bill">${
                             bills[key].informationBill.fullname
                           }</p>  
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-md-6">
                           <label>Email</label>
                       </div>
                       <div class="col-md-6">
                           <p id="email-bill">${
                             bills[key].informationBill.email
                           }</p>  
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-md-6">
                           <label>Phone</label>
                       </div>
                       <div class="col-md-6">
                           <p id="phone-bill">${
                             bills[key].informationBill.phone
                           }</p>  
                       </div>
                   </div>
               </div>
               <!-- col-md-6 text-right -->
               <!-- <div class="col-md-6 pt-3 center">
                   <h5>Payment Details</h5>
                   <p>VAT: 1425782</p>
                   <p>VAT ID: 10253642</p>
                   <p>Payment Type: Root</p>
                   <p>Name: John Doe</p>
               </div> -->
           </div>
           <table class="table">
               <tbody>
                   <tr>
                   </tr>
               </tbody>
               <thead>
                   <tr>
                       <td>Name</td>
                       <td>Quantity</td>
                       <td>Price</td>
                       <td>Total</td>
                   </tr>
               </thead>

               <tbody>
                   ${loadProBill(bills[key].products)}
               </tbody>
           </table>
       </div>
       <div class="bg-dark text-white p-5" style="text-align: right;">
           <div class="row">
               <!-- <div class="col-md-2 ">
                   
               </div>
               <div class="col-md-9 "> -->

               <div class="col-md-12 ">
                   <p class="text-muted mb-0" style="
                    color: white!important;
                ">Sub - Total :<i> ${numberWithCommas(
                  bills[key].total - 30000
                )} VNĐ</i></p>
               </div>



               <div class="col-md-12 pull-left">
                   <p class="text-muted mb-0" style="
                   color: white!important;
               ">ship :<i> 30.000 VNĐ</i></p>
               </div>
               <div class="col-md-12 pull-left">
                   <p style="
                   color: white!important;
               " class="text-muted mb-0">Total :<i> ${numberWithCommas(
                 bills[key].total
               )} VNĐ</i></p>
               </div>
               <!-- </div> -->
           </div>
       </div>
   </div>
       </li>`;
      });
      document.getElementById("list-bill").innerHTML = html;
    }
  });
}

loadProBill = (pros) => {
  let html = "";
  pros.map((val) => {
    html += `
      <tr>
                       <td><span class="product-name" data-toggle="modal" data-target="#productImg-${
                         val.product.id
                       }">${val.product.name}</span>
                       <div class="modal fade" id="productImg-${
                        val.product.id
                      }" role="dialog">
                       <div class="modal-dialog">
                       
                         <!-- Modal content-->
                         <div class="modal-content">
                           <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal">&times;</button>
                           </div>
                           <div class="modal-body">
                           <img style="width:100%" src="${val.product.image}"/>
                           </div>
                           <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                           </div>
                         </div>
                         
                       </div>
                     </div>
                       </td>
                       <td>${val.quantity}</td>
                       <td>${numberWithCommas(val.product.price)}</td>
                       <td>${numberWithCommas(val.total)}</td>
       </tr>
      
      `;
  });
  return html;
};
function showDetailBill(id) {
  document.getElementById(`detail-${id}`).style.display = "block";
  document.getElementById(`down-${id}`).style.display = "none";
  document.getElementById(`up-${id}`).style.display = "inline-block";
}
function hiddenDetailBill(id) {
  document.getElementById(`detail-${id}`).style.display = "none";
  document.getElementById(`up-${id}`).style.display = "none";
  document.getElementById(`down-${id}`).style.display = "inline-block";
}
