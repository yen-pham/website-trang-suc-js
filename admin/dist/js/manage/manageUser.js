function load() {


    getDataAsync("users").then(dataUser => {
        // console.log(dataUser);
        if (dataUser) {
            //console.log(dataUser);
            var row = "";
            Object.keys(dataUser).map((e, key) => {
                // console.log(dataUser[e].pasword);
                row += `<tr>
                <td>${key+1}</td>
                <td><img style="height: 20%"  src=${dataUser[e].avata}></td>
                <td>${dataUser[e].fullname}</td>
                <td>${dataUser[e].address}</td>
                <td>${dataUser[e].phone}</td>
                <td>${dataUser[e].email}</td>
                <td>
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#userBillDetails" onclick="showBills('${e}')" >Details</button>
                </td>
                <td>${dataUser[e].username}</td>
                <td  >
                <input value="${dataUser[e].role}" id="role-${e}"/>
                <button type="button" class="btn btn-primary"  onclick="saveRole('${e}', '${dataUser[e].username}')" >Save</button>
                </td>
                <td>
                <button type="button" class="btn btn-danger"  onclick="deleteUser('${e}', '${dataUser[e].fullname}')">Delete</button>
                </td>
                </tr>`
            });

            document.getElementById('tbody-user').innerHTML = row;

        }
    })





}

function saveRole(e, name) {
    console.log(e);
    let roles = document.getElementById(`role-${e}`).value;
    console.log(roles);
    dbRef.ref('users/' + e+'/role').set(roles);

    myFunction(`Change roles of ${name} successfully`);
}

function deleteUser(e, name) {

    dbRef.ref('users/' + e).remove();

    myFunction(`Delete ${name.toUpperCase()} successfully`);
}
function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}

function myFunction(string) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = string;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    setTimeout(function() {location.reload()}, 2000)

    // location.reload();
}
function showBills(e) {
    getDataAsync(`users/${e}`).then(data => {
        let dataBill = data.bills;
        //console.log(data.bills);

        var row = `<h5 class="modal-title" id="exampleModalLongTitle">CUSTOMER: <strong>${data.fullname}</strong></h5>`;
        if (dataBill) {
            //console.log(dataBill);
            let dataBills = Object.values(dataBill);
            

           dataBills.map(e => {

                //console.log(dataBill[e].total);
                let array = Object.values(e.products);
                console.log(array);
                

                row += `
                
                <form id="form-show-Bills">
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1">Name: <strong>${e.informationBill.fullname}</strong></label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="inputImage" class="small mb-1">Phone: <strong>${e.informationBill.phone}</strong></label>

                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputLastName">Address: <strong>${e.informationBill.address}</strong>
                              </label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputLastName">Time: <strong>${e.informationBill.time}</strong></label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputCategory">Product</label>
                            <div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody id="showProductOrder" >`;
                                    array.map((value, key) => {
                                        console.log(value);
                                            row+=`<tr>
                                        <td>${key+1}</td>
                                        <td><img src=${value.product.image} style="width: 20%" /></td>
                                        <td>${value.product.name}</td>
                                        <td>${value.quantity}</td>
                                        <td>  ${formatPrice( `${value.total}` )} VNĐ
                                        </td>
                                        `})
                                    
                                row += `</tbody>
                                </table>

                            </div>


                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1">Total: <strong>${formatPrice(`${e.total}`)}
                                    VNĐ</strong></label>
                        </div>
                    </div>
                </div>
            </form>`
            });


        }
        else {
            row += `<p>This customer has no order yet</p>`;
        }


        document.getElementById('showBillContent').innerHTML = row;
    })
}
