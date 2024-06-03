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


const filter = document.querySelector(".filter-btn")
const show = document.querySelector(".filter-show")

filter.addEventListener("click",()=>{
    show.classList.toggle("toggle-filter")
})