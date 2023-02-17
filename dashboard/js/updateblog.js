

function updateArticle(id){
    console.log(id);
    //get data from localstorage and store to articleItem array
    //we must to use JSON.parse, because data as string, we need convert to array
    articleItem = JSON.parse(localStorage.getItem('blogs')) ?? []

    articleItem.forEach(function (value){
        if(value.index == index){
            document.getElementById('index').value = value.index,
            document.getElementById('title').value = value.title,
            document.getElementById('date').value = value.date,
            document.getElementById('body').value = value.body,
            document.getElementById('statuse').value = value.statuse,
            document.getElementById('category').value = value.category
        }
    })
   
}




//method to get detail article data based on id
function find(id){
    //get data from localstorage and store to articleItem array
    //we must to use JSON.parse, because data as string, we need convert to array
    articleItem = JSON.parse(localStorage.getItem('blogs')) ?? []

    articleItem.forEach(function (value){
        if(value.id == id){
            document.getElementById('id').value = value.id,
            document.getElementById('title').value = value.title,
            document.getElementById('date').value = value.date,
            document.getElementById('body').value = value.body,
            document.getElementById('statuse').value = value.statuse,
            document.getElementById('category').value = value.category
        }
    })
}