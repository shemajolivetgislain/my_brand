const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

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


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        const pattern = /^[a-zA-Z]+$/;
    
        if (!pattern.test(usernameValue)) {
            setError(username, 'username should contain only characters');
        } else {
            setSuccess(username);
        }
    }


    if(passwordValue === '') {
        setError(password, 'Password is required');
    }  else {
        setSuccess(password);
    }

};

const eyeIcons = document.getElementsByClassName("show-hide");

[...eyeIcons].forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () =>{
        const pInput = eyeIcon.parentElement.querySelector("input");
        if(pInput.type === "password"){
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        return (pInput.type = "password");    
    });
});