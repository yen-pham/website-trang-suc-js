var users= localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")):[];
function register(username,fullname,address,phone,password) {
  users.push({id:users.length+1,username,fullname,address,phone,password,avata:"https://i.pinimg.com/474x/33/3e/5a/333e5a3dfc1cf3898959a0e26d1c241e.jpg"});
  localStorage.setItem("users",JSON.stringify(users));
  alert(`hi ${username}, bạn đã đăng kí tài khoản thành công !!!`);
    window.location="login.html";
}
