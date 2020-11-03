var edit_index = -1;
var img = '';
function load() {
    var n = 0;
    var dataProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];
    if (dataProduct) {

        var row = "";
        dataProduct.map((product) => {

            n++
            row += `<tr>
        <td>${n}</td>
        <td><img style="height: 20%" src=${product.img} /></td>
        <td>${product.productName}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.description}</td>
        <td>
        <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"  onclick="editProduct('${product.idProduct}')" >Edit</button> 
        <button type="button" class="btn btn-secondary"  onclick="deleteProduct('${product.idProduct}')"  >Delete</button>
        </td></tr>`
        });

        document.getElementById('tbody-product').innerHTML = row;
    }
}

{/* */ }
function editProduct(id) {
    var dataProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];
    dataProduct.map(e => {
        if (e.idProduct == id) {
            edit_index = id;
            document.getElementById('inputProductName').value = e.productName
            document.getElementById('inputPrice').value = e.price;
            document.getElementById('inputDescription').value = e.description;
            document.getElementById('inputCategory').value = e.category;
            img = e.img;
            document.getElementById("displayImage").innerHTML = `<img style="height: 20%" src=${e.img} />`;

        }
    })

}
function deleteProduct(id) {
    var dataProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];

    // dataProduct.filter(item => item.idProduct !== id);
    alert(id)

}
function chonFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //console.log(e.target.result)
            img = e.target.result;
            document.getElementById("displayImage").innerHTML = `<img style="height: 20%" src=${img} />`;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }


}
function createProduct() {
    var inputProductName = document.getElementById('inputProductName').value;

    var inputPrice = document.getElementById('inputPrice').value;
    var inputDescription = document.getElementById('inputDescription').value;
    var inputCategory = document.getElementById('inputCategory').value;
    var idProduct = new Date().valueOf();
    var product = {
        idProduct: edit_index == -1 ? idProduct : edit_index,
        productName: inputProductName,
        price: inputPrice,
        description: inputDescription,
        category: inputCategory,
        img: img
    }
    var dataProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];
    if (edit_index == -1) {


        dataProduct.push(product);


    }
    else {
        let index = dataProduct.findIndex(p => p.idProduct == edit_index)
        dataProduct[index] = product;

    }
    document.getElementById("form-create-product").reset();


    localStorage.setItem("dataProduct", JSON.stringify(dataProduct));
    load();
}
function cancel() {
    document.getElementById("form-create-product").reset();
}