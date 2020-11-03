var edit_index = -1;
var img = '';
function load() {
    var n = 0;
    var dataProduct = JSON.parse(localStorage.getItem("dataProduct")) || [];

    getDataAsync("product").then(dataProduct => {
        if (dataProduct) {
            var row = "";
            Object.keys(dataProduct).map(e => {
                n++
                row += `<tr>
                <td>${n}</td>
                <td><img style="height: 20%" src=${dataProduct[e].img} /></td>
                <td>${dataProduct[e].productName}</td>
                <td>${dataProduct[e].price}</td>
                <td>${dataProduct[e].category}</td>
                <td>${dataProduct[e].description}</td>
                <td>
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"  onclick="editProduct('${e}')" >Edit</button> 
                <button type="button" class="btn btn-danger"  onclick="deleteProduct('${e}')"  >Delete</button>
                </td></tr>`
            })
            document.getElementById('tbody-product').innerHTML = row;

        }

        console.log(dataProduct);


    })


    getDataAsync("category").then(dataCategory => {
        if (dataCategory) {
            var row = "";
            Object.keys(dataCategory).map(e => {

                row += `<option value="${e}-${dataCategory[e].categoryName}">${dataCategory[e].categoryName}</option>`
            });

            document.getElementById('selectCategories').innerHTML = row;

        }
    })
};
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

    for (var i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].idProduct == id) { // nếu là sinh viên cần xóa
            dataProduct.splice(i, 1); // thì xóa
        }
    }
    // console.log(id);
    // // dataProduct.filter(item => item.idProduct !== id);
    // dataProduct.splice(id, 1);
    localStorage.setItem("dataProduct", JSON.stringify(dataProduct));
    load();

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
    var inputCategory = document.getElementById('selectCategories').value;
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


        dbRef.ref().child('product').push(product);


    }
    else {
        

    }
    document.getElementById("form-create-product").reset();
    load();
}
function cancel() {
    document.getElementById("form-create-product").reset();
}