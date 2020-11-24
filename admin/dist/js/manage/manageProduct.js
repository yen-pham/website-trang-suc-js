var edit_index = -1;
var img = '';

function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}
function load() {

    getDataAsync("").then(data => {
        let dataProduct = data.products;
        let dataCategory = data.category;

        if (dataProduct) {
            console.log(dataProduct);

            //console.log(dataProduct);
            var row = "";



            Object.keys(dataProduct).map((e, key) => {

                row += `<tr>
                <td>${key + 1}</td>
                <td><img style="height: 20%" src=${dataProduct[e].image} /></td>
                <td>${dataProduct[e].name}</td>
                <td>${formatPrice(`${dataProduct[e].price}`)} VNĐ</td>
                <td>${dataCategory[dataProduct[e].categoryId].categoryName}</td>
                <td>${dataProduct[e].description}</td>
                <td>
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"  onclick="editProduct('${e}')" >Edit</button> 
                <button type="button" class="btn btn-danger" onclick="deleteProduct('${e}', '${dataProduct[e].name}')"  >Delete</button>
                </td></tr>`
            })
            document.getElementById('tbody-product').innerHTML = row;

        }

        // console.log(dataProduct);


    })
    //${dataCategory[dataProduct[e].categoryId].categoryName}

    getDataAsync("category").then(dataCategory => {
        if (dataCategory) {
            var row = "";
            Object.keys(dataCategory).map(e => {

                row += `<option value="${e}">${dataCategory[e].categoryName}</option>`
            });

            document.getElementById('selectCategories').innerHTML = row;

        }
    })
};

function myFunction(string) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = string;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    setTimeout(function() {location.reload()}, 2000)

    // location.reload();
}

function editProduct(id) {
    getDataAsync(`products/${id}`).then(data => {
        //console.log(data);
        if (data) {
            //console.log(data.image);
            edit_index = id;
            document.getElementById('inputProductName').value = data.name;
            document.getElementById('inputPrice').value = data.price;
            document.getElementById('inputDescription').value = data.description;
            document.getElementById('selectCategories').value = data.categoryId;
            img = data.image;
            document.getElementById("displayImage").innerHTML = `<img style="width: 20%" src=${data.image} />`;
            //console.log(document.getElementById("displayImage"));
        }
    })


}



function deleteProduct(id, name) {

    console.log(name);

    // dbRef.ref('products/' + id).remove();

    myFunction(`Delete ${name.toUpperCase()} successfully`);
    // location.reload();
}
function chonFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //console.log(e.target.result)
            img = e.target.result;
            document.getElementById("displayImage").innerHTML = `<img style="width: 20%" src=${img} />`;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }


}
function createProduct() {
    var inputProductName = document.getElementById('inputProductName').value;

    var inputPrice = document.getElementById('inputPrice').value;
    var inputDescription = document.getElementById('inputDescription').value;
    var inputCategory = document.getElementById('selectCategories').value;
    var product = {
        name: inputProductName,
        price: inputPrice,
        description: inputDescription,
        categoryId: inputCategory,
        image: img
    }
    if (edit_index == -1) {


        dbRef.ref().child('products').push(product);
        myFunction(`Add ${product.name.toUpperCase()} successfully`)


    }
    else {

        dbRef.ref('products/' + edit_index).set(product);
        edit_index = -1;

        myFunction(`Edit ${product.name.toUpperCase()} successfully`)



    }
    //   setTimeout( load(), 3000);
    // location.reload();

    document.getElementById("form-create-product").reset();
    document.getElementById("displayImage").innerHTML = "";
}
function cancel() {
    document.getElementById("form-create-product").reset();
    document.getElementById("displayImage").innerHTML = "";
}