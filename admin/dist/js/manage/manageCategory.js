
var edit_index = -1;

var image = '';
function load() {
    getDataAsync("category").then(dataCategory => {

        //console.log(dataCategory);

        if (dataCategory) {
            var row = "";
            Object.keys(dataCategory).map((e, key) => {

                row += `<tr>
                <td>${key + 1}</td>
                <td>${dataCategory[e].categoryName}</td>
                <td>
                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"
                      onclick="editCategories('${e}')" >Edit</button> 
                    <button type="button" class="btn btn-danger"  onclick="deleteCategories('${e}', '${dataCategory[e].categoryName}')"  >Delete</button>
                </td>
                </tr>`
            });

            document.getElementById('tbody-category').innerHTML = row;

        }
    })



}
function deleteCategories(id, name) {
    dbRef.ref('category/' + id).remove();
    // location.reload();

    myFunction(`Delete ${name.toUpperCase()} successfully`);
}
function editCategories(id) {

    getDataAsync(`category/${id}`).then(dataCategory => {
        console.log(dataCategory);
        if (dataCategory) {
            edit_index = id;
            document.getElementById('inputCategoryName').value = dataCategory.categoryName;
        }
    })
}
function myFunction(string) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = string;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    setTimeout(function() {location.reload()}, 2000)

    // location.reload();
}

function createCategory() {
    var inputCategoryName = document.getElementById('inputCategoryName').value;

    var category = {
        categoryName: inputCategoryName
    }

    if (edit_index == -1) {
        dbRef.ref().child('category').push(category);
        myFunction(`Add ${category.categoryName.toUpperCase()} successfully`)
    }
    else {
        dbRef.ref('category/' + edit_index).set(category);
        edit_index = -1;

        myFunction(`Edit ${category.categoryName.toUpperCase()} successfully`)
    }

    document.getElementById("form-create-category").reset();
    // location.reload();
}
function cancel() {
    document.getElementById("form-create-category").reset();
}