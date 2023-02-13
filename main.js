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

windows.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}


$(document).ready(function() {
    $('.filter-item').click(function(){
        const value = $(this).attr('data-filter');
        if(value == 'all'){
            $('.post-box').show('1000');
        } else{
            $('.post-box').not('.'+value).hide('1000');
            $('.post-box').filter('.'+value).show('1000');
        }
    
    });
    $('.filter-item').click(function(){
        $(this).addClass('active-filter').siblings().removeClass('active-filter');
    
    });

});


const form = document.getElementById('form');
const names = document.getElementById('names');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const body = document.getElementById('body');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const nameValue = names.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const bodyValue = body.value.trim();

    if(nameValue === '') {
        setError(names, 'name is required');
    } else {
        setSuccess(names);
    }

    if(subjectValue === '') {
        setError(subject, 'Subject is required');
    } else {
        setSuccess(subject);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
    if(bodyValue === '') {
        setError(body, 'Body is required');
    } else {
        setSuccess(body);
    }

};
