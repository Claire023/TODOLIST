const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const date = document.querySelector("#date");

//noms de classes changeantes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const line = "lineThrough";



//Stock and increment todos
let LIST,id ;

let data = localStorage.getItem('TODO');

if(data){
LIST = JSON.parse(data);
id = list.length;
loadList(LIST);

} else {
    LIST = [];
    id = 0;
}


function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
    
}


//Clear local Storage
clear.addEventListener("click", function(){
localStorage.clear();
location.reload();
});


function addToDo(task, id, done, trash){

        if(trash){
            return;
        }

        const DONE = done ? CHECK : UNCHECK;
        const barre = done ? line : " ";

        const item = `
            <li class="todo">
            <i class="fa ${DONE}" job="complete" id="${id}"></i>
            <p class="text ${barre}">${task}</p>
            <i class="far fa-trash-alt" job="delete" class="t" id="${id}"></i> 
            </li>
            `; 
            list.insertAdjacentHTML("beforeend", item);  
     
        }


//Add todo when enter pressed
document.addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        let task = document.getElementById("task").value;
        if(task){
            addToDo(task, id, false, false);
            LIST.push({
                name:task,
                id:id,
                done:false,
                trash:false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        } else {
            alert('veuillez entrer une tâche');
        }
    }
});


function completeToDo(element){
    
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(line);
    
   LIST[element.id].done = LIST[element.id].done ? false : true;
    
    
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST.splice(LIST[id], 1);  
    
}



list.addEventListener("click", function(event){
    let element = event.target;
    let status =  element.getAttribute("job");
    
    if(status == "delete"){
        removeToDo(element);
        
    } 
    else if(status == "complete"){
        
        completeToDo(element);
         
    } 
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
    
});    


//Changer de page 
const listItems = [
    LIST, 

    // "Item 2", 
    // "Item 3", 
    // "Item 4", 
    // "Item 5", 
    // "Item 6", 
    // "Item 7", 
    // "Item 8", 
    // "Item 9", 
    // "Item 10", 
    // "Item 11", 
    // "Item 12", 
    // "Item 13", 
    // "Item 14", 
    // "Item 15", 
    // "Item 16",
    // "Item 17", 
    // "Item 18", 
    // "Item 19", 
    // "Item 20", 
    // "Item 21", 
    // "Item 22",  
 
];

const list_element = document.getElementById('pages');
const pagination_elements = document.getElementById('pagination');

let current_page = 1;
let rows = 5;



function displayItems(items, wrapper, rows_per_page, page){
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end  = start + rows_per_page;
    let paginatedItems  =  items.slice(start, end);

    for(let i = 0 ; i < paginatedItems.length; i++){
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        wrapper.appendChild(item_element);
    }
}



function setUpPagination(items, wrapper, rows_per_page){
    wrapper.innerHTML = "";
    let page_count = Math.ceil(items.length / rows_per_page);
    for(let i = 1 ; i < page_count+1; i++){
        let btn = PaginationButton(i,items);
        wrapper.appendChild(btn);
       
    }
}

function PaginationButton(page, items){
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function(){
        current_page = page;
        displayItems(items, list_element,rows, current_page);

        let current_btn = document.querySelector('.pagenumbers button.active')
        current_btn.classList.remove('active');

        button.classList.add('active');

    });

        return button;
 }



displayItems(listItems, list_element, rows, current_page);
setUpPagination(listItems, pagination_elements, rows);