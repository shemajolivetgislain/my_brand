const form = document.getElementById('form');
const names = document.getElementById('names');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const body = document.getElementById('body');
// signup button
const addcontact = document.getElementById('addcontact');

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

queries = JSON.parse(localStorage.getItem('query')) || [];

function saveContact() {
    
    validateInputs();
    const inputControls = form.querySelectorAll('.input-control');
    const hasError = [...inputControls].some((inputControl) => inputControl.classList.contains('error'));
  
    if (hasError) {
      return;
    }

  let query = {};
  query.names = names.value
  query.email = email.value
  query.subject = subject.value
  query.body = body.value
  queries.push(query);
  const stringQuery = JSON.stringify(queries);
  localStorage.setItem('query', stringQuery);
    // Redirect to login page after saving blog
   window.location.replace("../index.html");
}



addcontact.onclick = saveContact;