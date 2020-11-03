function load() {

    var dataUser = [];

    getDataAsync("users").then(dataUser => {
        
        var n = 0;
        if (dataUser) {
            var row = "";
            Object.keys(dataUser).map(e => {
                n++;
                row += `<tr>
                <td>${n}</td>
                <td><img style="height: 20%"  src=${dataUser[e].avata}></td>
                <td>${dataUser[e].fullname}</td>
                <td>${dataUser[e].birthday}</td>
                <td>${dataUser[e].address}</td>
                <td>${dataUser[e].phone}</td>
                <td>${dataUser[e].email}</td>
                <td>${dataUser[e].username}</td>
                <td>${dataUser[e].role}</td>
                <td>
                <button type="button" class="btn btn-danger">Delete</button>
                </td>
                </tr>`
            });

            document.getElementById('tbody-user').innerHTML = row;

        }
    })





}
