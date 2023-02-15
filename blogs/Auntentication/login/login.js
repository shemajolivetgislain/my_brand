const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');

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



users = JSON.parse(localStorage.getItem('users')) || [];

function signIn() {
    validateInputs();

    const inputControls = form.querySelectorAll('.input-control');
    const hasError = [...inputControls].some((inputControl) => inputControl.classList.contains('error'));
  
    if (hasError) {
      return;
    }
  // check if user exists
  const targetUser = users.find(user => user.username == username.value);
  if(targetUser && targetUser.password == password.value) {
    localStorage.setItem('currentUser', JSON.stringify(targetUser))
    window.location.href = "../../../dashboard/home.html";
  } else if(targetUser && targetUser.password != password.value) {
    alert('wrong password');
  } else {
    // user doesn't exist
    document.getElementById("error-display").innerText = "Username not found. Please sign up.";
  }
}

login.onclick = signIn;
