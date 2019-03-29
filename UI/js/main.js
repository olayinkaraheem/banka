const body = document.querySelector('body');
const menu_icon = document.querySelector('#menu-icon');
const navigation = document.querySelector('.navigation');
const dashboard_menu = document.querySelector('#dashboard-menu-item-container');
const menu_open_btn = document.querySelector('#open-btn');
const menu_close_btn = document.querySelector('#close-btn');

// body.addEventListener('click', () => {
//     if(navigation.classList.contains('visible')){
//         navigation.classList.remove('visible');
//     }
//     console.log('body clicked');
// })

menu_icon.addEventListener('click', () => {
    navigation.classList.toggle('visible');
})


menu_open_btn.addEventListener('click', (event) => {
    menu_open_btn.classList.add('hide');
    if (dashboard_menu.classList.contains('hide-menu')) {
        dashboard_menu.classList.remove('hide-menu');
    }
    dashboard_menu.classList.add('show-menu');
    // menu_close_btn.classList.add('show');
})

menu_close_btn.addEventListener('click', (event) => {
    // menu_open_btn.classList.add('hide');
    dashboard_menu.classList.remove('show-menu');
    dashboard_menu.classList.add('hide-menu');
    // menu_close_btn.classList.add('show');
})
