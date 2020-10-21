var users= localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")):[];
function btnClick(username,password) {
    users.map((user,key) => {
      if(user.username == username && user.password == password){
        localStorage.setItem("user",JSON.stringify(user));
		      alert("Đăng nhập thành công !");

      }else if(key == users.length-1 ){alert("Đăng nhập không thành công !");}
    });

}
