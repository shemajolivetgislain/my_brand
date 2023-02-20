const form = document.getElementById('form');
const title = document.getElementById('title');
const date = document.getElementById('date');
const body = document.getElementById('body');
const picture = document.getElementById('picture');
const category = document.getElementById('category');
const statuse = document.getElementById('statuse');
const addBlog = document.getElementById('addBlog');



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
        const pattern = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    
        if (!pattern.test(titleValue)) {
            setError(title, 'Title should contain only characters');
        } else {
            setSuccess(title);
        }
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
        }  else {
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

let renderImage;
document.querySelector("#picture").addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
        localStorage.setItem("recent-image", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});

blogs = JSON.parse(localStorage.getItem('blogs')) || [];

// method to save data into localstorage
function saveBlog(){

    renderImage = localStorage.getItem('recent-image');
    validateInputs();

    const inputControls = form.querySelectorAll('.form-group');
    const hasError = [...inputControls].some((inputControl) => inputControl.classList.contains('error'));
  
    if (hasError) {
      return;
    }
    //get data from localstorage and store to contaclist array
    //we must to use JSON.parse, because data as string, we need convert to array
    blogList = JSON.parse(localStorage.getItem('blogs')) ?? []

    //get last array to get last id
    //and store it into variable id
    var id
    blogList.length != 0 ? blogList.findLast((item) => id = item.id) : id = 0

    if(document.getElementById('id').value){

        //edit contactlist array based on value
        blogList.forEach(value => {
            if(document.getElementById('id').value == value.id){
                value.title      = document.getElementById('title').value, 
                value.date       = document.getElementById('date').value, 
                value.picture  = document.getElementById('picture').value, 
                value.category     = document.getElementById('category').value
                value.statuse     = document.getElementById('statuse').value
            }
        });

        //remove hidden input
        document.getElementById('id').value = ''

    }else{

        //save
        //get data from form
        var item = {
            id        : id + 1, 
            title      : document.getElementById('title').value, 
            date       : document.getElementById('date').value, 
            picture   : document.getElementById('picture').value, 
            category     : document.getElementById('category').value,
            statuse     : document.getElementById('statuse').value
        }

        //add item data to array contactlist
        blogList.push(item)
    }

    // save array into localstorage
    localStorage.setItem('blogs', JSON.stringify(blogList))
    window.location.replace("article.html");

    //update table list
    displayBlogs();

    //remove form data
    document.getElementById('form').reset()
}


addBlog.onclick = saveBlog;