function register(username,fullname,address,phone,email,password) {
  dbRef.ref().child('users').push({username,fullname,address,phone,email,password,avata:"https://i.pinimg.com/474x/33/3e/5a/333e5a3dfc1cf3898959a0e26d1c241e.jpg",role:'user'});
  document.getElementById("text-noti").innerHTML= `hi ${username}, bạn đã đăng kí tài khoản thành công !!!`
  document.getElementsByClassName("alert")[0].style.display = "block";
  setTimeout(() => {
    document.getElementsByClassName("alert")[0].style.display = "block";
    }, 2000);
}
function closeAlert() {
  document.getElementsByClassName("alert")[0].style.display = "none";
  window.location="login.html";

}