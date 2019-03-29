const body = document.querySelector('body');
const menu_icon = document.querySelector('#menu-icon');
const navigation = document.querySelector('.navigation');
const dashboard_menu = document.querySelector('#dashboard-menu-item-container');
const menu_open_btn = document.querySelector('#open-btn');
const menu_close_btn = document.querySelector('#close-btn');


// Toggle between class 'visible' for nav menu
menu_icon.addEventListener('click', () => {
    navigation.classList.toggle('visible');
})

// Toggle between dashboard open and close buttons
if(menu_open_btn){      
    menu_open_btn.addEventListener('click', (event) => {
        const elem = event.target;
        if(event.target.id == 'open-btn' ) {
            elem.setAttribute('id', 'close-btn');
            elem.innerHTML = '&times;';
            // console.log(elem.style.top); 
            if (dashboard_menu.classList.contains('hide-menu')) {
                dashboard_menu.classList.remove('hide-menu');
            }
            dashboard_menu.classList.add('show-menu');
        } else {
            elem.setAttribute('id', 'open-btn');
            elem.innerHTML = '&plus;';
            if (dashboard_menu.classList.contains('show-menu')) {
                dashboard_menu.classList.remove('show-menu');
            }
            dashboard_menu.classList.add('hide-menu');
        }
        // menu_close_btn.classList.add('show');
    })
}



// menu_close_btn.addEventListener('click', (event) => {
//     event.target.setAttribute('id', 'open-btn');
//     event.target.innerHTML = '&plus;';
//     if (dashboard_menu.classList.contains('show-menu')) {
//         dashboard_menu.classList.remove('show-menu');
//     }
//     dashboard_menu.classList.add('hide-menu');
//     // menu_close_btn.classList.add('show');
// })

// menu_close_btn.addEventListener('click', (event) => {
//     // menu_open_btn.classList.add('hide');
//     dashboard_menu.classList.remove('show-menu');
//     dashboard_menu.classList.add('hide-menu');
//     // menu_close_btn.classList.add('show');
// })
