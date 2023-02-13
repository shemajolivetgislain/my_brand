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
        const pattern = /^[a-zA-Z]+$/;
    
        if (!pattern.test(nameValue)) {
            setError(names, 'names should contain only characters');
        } else {
            setSuccess(names);
        }
    }
    

    if(subjectValue === '') {
        setError(subject, 'Subject is required');
    } else {
        const pattern = /^[a-zA-Z]+$/;
    
        if (!pattern.test(subjectValue)) {
            setError(subject, 'subject should contain only characters');
        } else {
            setSuccess(subject);
        }
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
