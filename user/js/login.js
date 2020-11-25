
function btnClick(username,password) {
  dbRef.ref("users").on("value", (users) => {
    console.log(users.val());
    Object.keys(users.val()).map((key) => {
      if(users.val()[key].username==username && users.val()[key].password==password){
        localStorage.setItem("user",JSON.stringify({key,...users.val()[key]}));
        
      }
    });
    if(!localStorage.getItem("user")){
      alert("Đăng nhập không thành công !")
    }
    else window.location="home.html"
  });
  
}