let nav = document.querySelector('.nav');
let section_2 = document.querySelector('.section__about');


window.onscroll = () =>{
    let section_2_pos = section_2.getBoundingClientRect().y;
    console.log(section_2_pos)

    if(section_2_pos <= 0){
        nav.style.transform = 'translateY(0)'
    }
    else   nav.style.transform = 'translateY(-100%)'
}



document.querySelector('.header__explorer').addEventListener('click',() =>{
    section_2.scrollIntoView();
  

})


document.querySelector('.header .btn').addEventListener('click',() =>{
    document.querySelector('.section__menu').scrollIntoView();
})