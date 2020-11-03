
 var slideList = document.getElementsByClassName("slide");
 var slideButton = document.getElementsByClassName("BtnSl");
  var slideShow = 0; 
  for (let i=0; i<slideButton.length; i++) {
         slideButton[i].addEventListener('click', e => { 
           slideShow=i;
         })
  }
 function showSlide(index) {
   for (let i=0; i<slideList.length; i++) {
     slideList[i].style.display= 'none';
     slideButton[i].classList.remove('active');
   }
   slideList[index].style.display = 'block';
   slideButton[index].classList.add('active');
 }
 setInterval(function show() { 
   showSlide(slideShow);
   slideShow ++;
   if(slideShow== slideList.length) slideShow =0; 
 }, 3000);