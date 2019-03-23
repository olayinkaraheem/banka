const body = document.querySelector('body');
const menu_icon = document.querySelector('#menu-icon');
const navigation = document.querySelector('.navigation');

// body.addEventListener('click', () => {
//     if(navigation.classList.contains('visible')){
//         navigation.classList.remove('visible');
//     }
//     console.log('body clicked');
// })

menu_icon.addEventListener('click', () => {
    navigation.classList.toggle('visible');
})