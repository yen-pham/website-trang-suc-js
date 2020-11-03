function load() {
    getDataAsync("orders").then(dataOrder => {
        console.log(dataOrder);
    })
}