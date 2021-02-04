import Comment from './Comments.js';
async function makeRequest(url) {
    // this works...until there is a problem, we should harden this up to catch errors if they occur
    const response = await fetch(url);
    return await response.json();
      
}

function renderListWithTemplate(template, parent, list, prepareCallback) {
    
    list.forEach(item => {
        // make sure to clone the template content each time we use it so each instance is separate and unique. If we forget then it won't work.
      const clone = template.content.cloneNode(true);
      prepareCallback(clone, item);
      parent.appendChild(clone);
    })
  }


export default class ListMaker {
    constructor(type) {
        this.type = type;
        this.template ='';
        this.list = [];
        this.parent = null;
        this.comments = new Comment(this.type, 'comment');
    }
    async init(template){
        this.template = template;
        
        this.parent = document.querySelector(`${this.type} > ul`);
        this.list = await makeRequest(`js/${this.type}.json`);
        renderListWithTemplate(this.template, this.parent, this.list, this.prepareTemplate());
        this.comments.showCommentList();
    }
    
      prepareTemplate (template, options) { 
          template.childNodes.forEach(child => {
              if(child.innerHTML) {
                  // this is using a regular expression to match a pattern of {{ someThing }} in the template text. If it finds the {{ }} pattern it will look in options for someThing
                  // because we have not studied regular expression I'll just tell you there are no errors with this line :)
              child.innerHTML = child.innerHTML.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
                return options[variable] || ''
              }) 
            }
          }) 
        
      }
}