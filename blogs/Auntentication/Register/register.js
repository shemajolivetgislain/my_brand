const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const role = document.getElementById('role');
// signup button
const signup = document.getElementById('signup');

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
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

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

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 4 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
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

// 

users = JSON.parse(localStorage.getItem('users')) || [];

function saveUser() {
    validateInputs();

    const inputControls = form.querySelectorAll('.input-control');
    const hasError = [...inputControls].some((inputControl) => inputControl.classList.contains('error'));
  
    if (hasError) {
      return;
    }


  let user = {};
  user.username = username.value
  user.email = email.value
  user.password = password.value
  user.confirmPassword = password2.value
  user.role = "user"
  users.push(user);
  const stringUsers = JSON.stringify(users);
  localStorage.setItem('users', stringUsers);
    // Redirect to login page after saving user
   window.location.replace("../login/login.html");
}

// function displayUsers() {
//   users.forEach((user, index) => {
//     listUsers.innerHTML += `<li>user number ${index} is ${user.firstName} ${user.lastName}</li>`
//   })
// }

signup.onclick = saveUser;