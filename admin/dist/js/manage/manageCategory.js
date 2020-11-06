
var edit_index = -1;

var image = '';
function load() {
    getDataAsync("category").then(dataCategory => {

        //console.log(dataCategory);

        if (dataCategory) {
            var row = "";
            Object.keys(dataCategory).map((e, key) => {

                row += `<tr>
                <td>${key+1}</td>
                <td>${dataCategory[e].categoryName}</td>
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
function deleteCategories(id) {
    dbRef.ref('category/' + id).remove();
    load();
}
function editCategories(id) {

    getDataAsync("category").then(dataCategory => {
        Object.keys(dataCategory).map(e => {
            if (e === id) {
                edit_index = e;
                document.getElementById('inputCategoryName').value = dataCategory[e].categoryName;
                //console.log(dataCategory[e]);
            }
        })
    })
}


function createCategory() {
    var inputCategoryName = document.getElementById('inputCategoryName').value;

    var category = {
        categoryName: inputCategoryName
    }

    if(edit_index == -1) {
        dbRef.ref().child('category').push(category);
    }
    else {
        dbRef.ref('category/' + edit_index).set(category);
        edit_index=-1;
    }

    document.getElementById("form-create-category").reset();
    load();
}
function cancel() {
    document.getElementById("form-create-category").reset();
}