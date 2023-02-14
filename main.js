const header = document.querySelector('header');
window.addEventListener('scroll',  function () {
    header.classList.toggle('sticky', window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}


// $(document).ready(function() {
//     $('.filter-item').click(function(){
//         const value = $(this).attr('data-filter');
//         if(value == 'all'){
//             $('.post-box').show('1000');
//         } else{
//             $('.post-box').not('.'+value).hide('1000');
//             $('.post-box').filter('.'+value).show('1000');
//         }
    
//     });
//     $('.filter-item').click(function(){
//         $(this).addClass('active-filter').siblings().removeClass('active-filter');
    
//     });

// });


