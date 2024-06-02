const burger = document.querySelector('.burger')
const links = document.querySelector('.links')

burger.addEventListener("click",(e)=>{
links.classList.toggle("show")
})
const burger2 = document.querySelector('.burger2')
const nav2 = document.querySelector('.nav2')

burger2.addEventListener("click",(e)=>{
nav2.classList.toggle("shownav")
})