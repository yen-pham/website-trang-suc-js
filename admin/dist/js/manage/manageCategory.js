
var edit_index = -1;

var image = '';
function load() {
    getDataAsync("category").then(dataCategory => {

        var n = 0;
        if (dataCategory) {
            var row = "";
            Object.keys(dataCategory).map(e => {
                n++;
                row += `<tr>
                <td>${n}</td>
                <td>${dataCategory[e].categoryName}</td>
                <td>${dataCategory[e].description}</td>
                <td>
                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"  onclick="editCategories('${e}')" >Edit</button> 
                    <button type="button" class="btn btn-danger"  onclick="deleteCategories('${e}')"  >Delete</button>
                </td>
                </tr>`
            });

            document.getElementById('tbody-category').innerHTML = row;

        }
    })



}
function editCategories(id) {

    getDataAsync("category").then(dataCategory => {
        Object.keys(dataCategory).map(e => {
            if (e === id) {
                edit_index = e;
                document.getElementById('inputCategoryName').value = dataCategory[e].categoryName;
                document.getElementById('inputDescription').value = dataCategory[e].description;
                //console.log(dataCategory[e]);
            }
        })
    })
}


function createCategory() {
    var inputCategoryName = document.getElementById('inputCategoryName').value;
    var inputDescription = document.getElementById('inputDescription').value;

    var category = {
        categoryName: inputCategoryName,
        description: inputDescription
    }

    if(edit_index == -1) {
        dbRef.ref().child('category').push(category);
    }
    else {

    }

    document.getElementById("form-create-category").reset();
    load();
}
function cancel() {
    document.getElementById("form-create-category").reset();
}