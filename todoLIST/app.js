const button = document.querySelector("#button");
const theDiv = document.querySelector("#createdThings");


button.addEventListener("click", function(){
    let textAreaContent = document.querySelector("#textArea").value;
if(textAreaContent.trim() != ""){
    
    addTaskToDOM(textAreaContent);
    saveToLocalStorage(textAreaContent);   

    document.querySelector("#textArea").value = '';
}
else{
    alert("Please type some mission!");
}


});


window.addEventListener('DOMContentLoaded', function(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(taskContent){
        addTaskToDOM(taskContent);
    })
})



function addTaskToDOM(taskContent){
    let newP = document.createElement('p');
    let newDiv = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');


    newP.innerHTML = taskContent;    
    newP.classList.add('text-center');  
    doneButton.classList.add('btn' ,'btn-success');
    deleteButton.classList.add('btn', 'btn-danger');

    newDiv.appendChild(newP);
    newDiv.appendChild(doneButton);
    newDiv.appendChild(deleteButton);
    theDiv.appendChild(newDiv);

    doneButton.addEventListener('click',function(){
        newP.style.textDecoration = 'line-through';
        newP.style.backgroundColor = 'rgb(170, 255, 0)';
    });

    deleteButton.addEventListener('click', function(){
        newDiv.remove();
        removeFromLocalStorage(taskContent);
    })
}

function saveToLocalStorage(content){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(content);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeFromLocalStorage(taskContent){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function(task){
        return task !== taskContent; 
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
