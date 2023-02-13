const form = document.getElementById('form');
const title = document.getElementById('title');
const date = document.getElementById('date');
const body = document.getElementById('body');
const category = document.getElementById('category');
const statuse = document.getElementById('statuse');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    console.log(inputControl + "input control")
    const errorDisplay = inputControl.querySelector('.error');
    console.log(errorDisplay + "error display");

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    console.log(inputControl.classList.add('error'))
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
    const titleValue = title.value.trim();
    const dateValue = date.value.trim();
    const bodyValue = body.value.trim();
    const pictureValue = picture.files;
    const categoryValue = category.value.trim();
    const statusValue = statuse.value.trim();

    if(titleValue === '') {
        setError(title, 'title is required');
    } else {
        setSuccess(title);
    }

    if(dateValue === '') {
        setError(date, 'date is required');
    } else {
        setSuccess(date);
    }

    if(pictureValue.length === 0) {
        setError( picture, 'image is required');
    } else {
        const file = pictureValue[0];
        const fileType = file.type;
        const fileSize = file.size;
    
        if (fileType !== 'image/jpeg' && fileType !== 'image/png' && fileType !== 'image/jpg') {
            setError(picture, 'File type should be jpeg, png, or jpg');
        } else if (fileSize > 100) {
            setError( picture, 'File size should be less than 40 MB');
        } else {
            setSuccess( picture);
        }
    }
    

    if(bodyValue === '') {
        setError(body, 'Body is required');
    } else {
        setSuccess(body);
    }
    if(categoryValue === '') {
        setError(category, 'Category is required');
    } else {
        setSuccess(category);
    }
    if(statusValue === '') {
        setError(statuse, 'Status is required');
    } else {
        setSuccess(statuse);
    }

};
