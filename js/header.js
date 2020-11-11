var user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
var header = `<nav class="navbar navbar-expand-lg navbar-light nav">
<div class="collapse navbar-collapse " id="navbarNav">
<ul class="navbar-nav " id="list-nav">
    <li class="nav-item ">
      <a class="nav-link" href="home.html">Home <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Features</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">About Us</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="contact.html">Contact</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="cart" href="cart.html">Cart</a>
    </li>
    <li class="nav-item" id="login">
    ${localStorage.getItem('user')?` <a class="nav-link " href="#" onclick="logout()">Logout</a>`:` <a class="nav-link " href="login.html">Login</a>` }
    </li>
    ${
      user ? ` <li class="nav-item" id="user">
      <a class="nav-link"  href="#"><h3>Hi, ${user.username}!</h3><img src=${user.avata} alt="Avatar" class="avatar">       </a>
    </li>` :``
    }

  </ul>
  
  
</div>
</nav>`;
document.getElementById('header').innerHTML+=header;
let cartPro=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
document.getElementById('cart').innerHTML= "Cart ("+cartPro.length+")";

function logout() {
  localStorage.removeItem('user');
  document.getElementById('login').innerHTML=`<a class="nav-link " href="login.html">Login</a>`;
  let user=document.getElementById('user');
  document.getElementById("list-nav").removeChild(user);
}
var footer = `
<footer class="footer set-bg" data-setbg="img/footer-bg.jpg" style="background-image: url(&quot;img/footer-bg.jpg&quot;);">
<div class="container">
<div class="row">
<div class="col-lg-4 col-md-6 col-sm-6">
<div class="footer__widget">
<h6>WORKING HOURS</h6>
<ul>
<li>Monday - Friday: 08:00 am – 08:30 pm</li>
<li>Saturday: 10:00 am – 16:30 pm</li>
<li>Sunday: 10:00 am – 16:30 pm</li>
</ul>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-6">
<div class="footer__about">
<div class="footer__logo">
<a href="#"><img src="img/footer-logo.png" alt=""></a>
</div>
<p>Lorem ipsum dolor amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore dolore magna aliqua.</p>
<div class="footer__social">
<a href="#"><i class="fa fa-facebook"></i></a>
<a href="#"><i class="fa fa-twitter"></i></a>
<a href="#"><i class="fa fa-instagram"></i></a>
<a href="#"><i class="fa fa-youtube-play"></i></a>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-6">
<div class="footer__newslatter">
<h6>Subscribe</h6>
<p>Get latest updates and offers.</p>
<form action="#">
<input type="text" placeholder="Email">
<button type="submit"><i class="fa fa-send-o"></i></button>
</form>
</div>
</div>
</div>
</div>
<div class="copyright">
<div class="container">
<div class="row">
<div class="col-lg-7">
<p class="copyright__text text-white">
Copyright ©<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script>document.write(new Date().getFullYear());</script>2020 All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>

</p>
</div>
<div class="col-lg-5">
<div class="copyright__widget">
<ul>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms &amp; Conditions</a></li>
<li><a href="#">Site Map</a></li>
</ul>
</div>
</div>
</div>
</div>
</div>
</footer>`
document.getElementById("footer").innerHTML= footer;