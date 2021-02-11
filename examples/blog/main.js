import DataService from './DataService.js';

const postService = new DataService('posts');

// function to take a form and convert a FormData object into a simple JSON object.
// note that your form inputs must have a "name" attribute in order to show up in the FormData object.
// this should really be moved into a utils.js module...
function formDataToJSON(formElement) {    
    let formData = new FormData(formElement);
    // Object.fromEntries creates a new object made from an iterable list like an Array or Map
    // Object.entries takes an object and converts it into an Array that is iterable.
    const converted = Object.fromEntries(formData.entries());
    // if we have radios or checkboxes which share the same name
     converted.tags = formData.getAll("tags");
    return converted;
}

function showPosts(list) {
    
    const listElement = document.querySelector('#postList');
    listElement.innerHTML = list.map(post => `<li><h2>${post.title}</h2>
    <p>${post.content}</p>
    </li>`).join('');
    
}

async function handleSubmit(e) {
    // we don't want the form to reload the page...so we call preventDefault
    e.preventDefault();
    var myForm = e.target;
    
    // convert the form into a js object.
    const data = formDataToJSON(myForm);
    postService.postData(data);
    showPosts(await postService.getData());
    myForm.reset();
    
}

postService.init(showPosts);
document.querySelector('#postForm').addEventListener('submit', handleSubmit);




