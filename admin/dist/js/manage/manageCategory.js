var image = '';
function load() {
    var n = 0;
    var dataCategory = JSON.parse(localStorage.getItem("dataCategory")) || [];
    if (dataCategory) {
        var row = "";
        for (i in dataCategory) {
            var n = i;
            n++;
            row += `<tr>
        <td>${n}</td>
        <td>${dataCategory[i].categoryName}</td>
        <td>${dataCategory[i].description}</td>
        <td>
        <button type="button" class="btn btn-primary">Edit</button>
        <button type="button" class="btn btn-secondary">Delete</button>
        </td>
    </tr>`

            document.getElementById('tbody-category').innerHTML = row;
        }
    }

}
function chonFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            
            image = e.target.result;
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
console.log(e.target.result)
    }


}
function createCategory() {
    var inputCategoryName = document.getElementById('inputCategoryName').value;
    var inputDescription = document.getElementById('inputDescription').value;

    var category = {
        categoryName: inputCategoryName,
        description : inputDescription
    }

    console.log(category);

    var dataCategory = JSON.parse(localStorage.getItem("dataCategory")) || [];
    dataCategory.push(category);

    document.getElementById("form-create-category").reset();


    localStorage.setItem("dataCategory", JSON.stringify(dataCategory));
    load();
}
