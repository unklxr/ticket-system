'use strict';
const aside = document.querySelector('aside'), main = document.querySelector('main'), header = document.querySelector('header');
const asideStyle = window.getComputedStyle(aside);
if (localStorage.getItem('admin_menu') == 'closed') {
    aside.classList.add('closed', 'responsive-hidden');
    main.classList.add('full');
    header.classList.add('full');
}
document.querySelector('.responsive-toggle').onclick = event => {
    event.preventDefault();
    if (asideStyle.display == 'none') {
        aside.classList.remove('closed', 'responsive-hidden');
        main.classList.remove('full');
        header.classList.remove('full');
        localStorage.setItem('admin_menu', '');
    } else {
        aside.classList.add('closed', 'responsive-hidden');
        main.classList.add('full');
        header.classList.add('full');
        localStorage.setItem('admin_menu', 'closed');
    }
};
document.querySelectorAll('.tabs a').forEach((element, index) => {
    element.onclick = event => {
        event.preventDefault();
        document.querySelectorAll('.tabs a').forEach(element => element.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach((element2, index2) => {
            if (index == index2) {
                element.classList.add('active');
                element2.style.display = 'block';
            } else {
                element2.style.display = 'none';
            }
        });
    };
});
if (document.querySelector('.filters a')) {
    let filtersList = document.querySelector('.filters .list');
    let filtersListStyle = window.getComputedStyle(filtersList);
    document.querySelector('.filters a').onclick = event => {
        event.preventDefault();
        if (filtersListStyle.display == 'none') {
            filtersList.style.display = 'flex';
        } else {
            filtersList.style.display = 'none';
        }
    };
    document.onclick = event => {
        if (!event.target.closest('.filters')) {
            filtersList.style.display = 'none';
        }
    };
}
document.querySelectorAll('.msg').forEach(element => {
    element.querySelector('.fa-times').onclick = () => {
        element.remove();
        history.replaceState && history.replaceState(null, '', location.pathname + location.search.replace(/[\?&]success_msg=[^&]+/, '').replace(/^&/, '?') + location.hash);
        history.replaceState && history.replaceState(null, '', location.pathname + location.search.replace(/[\?&]error_msg=[^&]+/, '').replace(/^&/, '?') + location.hash);
    };
});
if (location.search.includes('success_msg') || location.search.includes('error_msg')) {
    history.replaceState && history.replaceState(null, '', location.pathname + location.search.replace(/[\?&]success_msg=[^&]+/, '').replace(/^&/, '?') + location.hash);
    history.replaceState && history.replaceState(null, '', location.pathname + location.search.replace(/[\?&]error_msg=[^&]+/, '').replace(/^&/, '?') + location.hash);
}
document.body.addEventListener('click', event => {
    if (!event.target.closest('.multiselect')) {
        document.querySelectorAll('.multiselect .list').forEach(element => element.style.display = 'none');
    } 
});
document.querySelectorAll('.multiselect').forEach(element => {
    let updateList = () => {
        element.querySelectorAll('.item').forEach(item => {
            element.querySelectorAll('.list span').forEach(newItem => {
                if (item.dataset.value == newItem.dataset.value) {
                    newItem.style.display = 'none';
                }
            });
            item.querySelector('.remove').onclick = () => {
                element.querySelector('.list span[data-value="' + item.dataset.value + '"]').style.display = 'flex';
                item.querySelector('.remove').parentElement.remove();
            };
        });
        if (element.querySelectorAll('.item').length > 0) {
            element.querySelector('.search').placeholder = '';
        }
    };
    element.onclick = () => element.querySelector('.search').focus();
    element.querySelector('.search').onfocus = () => element.querySelector('.list').style.display = 'flex';
    element.querySelector('.search').onclick = () => element.querySelector('.list').style.display = 'flex';
    element.querySelector('.search').onkeyup = () => {
        element.querySelector('.list').style.display = 'flex';
        element.querySelectorAll('.list span').forEach(item => {
            item.style.display = item.innerText.toLowerCase().includes(element.querySelector('.search').value.toLowerCase()) ? 'flex' : 'none';
        });
        updateList();
    };
    element.querySelectorAll('.list span').forEach(item => item.onclick = () => {
        item.style.display = 'none';
        let html = `
            <span class="item" data-value="${item.dataset.value}">
                <i class="remove">&times;</i>${item.innerText}
                <input type="hidden" name="${element.dataset.name}" value="${item.dataset.value}">    
            </span>
        `;
        if (element.querySelector('.item')) {
            let ele = element.querySelectorAll('.item');
            ele = ele[ele.length-1];
            ele.insertAdjacentHTML('afterend', html);                          
        } else {
            element.insertAdjacentHTML('afterbegin', html);
        }
        element.querySelector('.search').value = '';
        updateList();
    });
    updateList();
});