let input = document.querySelector(".input");
let submit  = document.querySelector(".add");
let tesksDiv = document.querySelector(".tasks");

let arrayOfTasks=[];

if(localStorage.getItem("task"))
{
    arrayOfTasks=JSON.parse(localStorage.getItem("task"));
}
gitDataFromLocalStorge();
submit.onclick =function ()  {
    if(input.value !="" )
    {
        addTaskToArray(input.value);
        input.value="";
    }
}
tesksDiv.addEventListener("click",(e)=>
{
    if(e.target.classList.contains("del"))
    {
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task"))
    {
        togglefun(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})
function addTaskToArray(textFeild)
{
    const task={
        id : Date.now(),
        title : textFeild,
        completed : false 
    }
    arrayOfTasks.push(task);
    addElementToPageFrom(arrayOfTasks);
    addDateToLocalStorge(arrayOfTasks);
}  

function addElementToPageFrom(arrayOfTasks)
{
    tesksDiv.innerHTML="";
    arrayOfTasks.forEach((task) => {
        let div =document.createElement("div");
        div.className="task";
        if(task.completed)
        {
            div.className="task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tesksDiv.appendChild(div);
    });
}
function addDateToLocalStorge(arrayOfTasks)
{
    window.localStorage.setItem("task",JSON.stringify(arrayOfTasks));

}
function gitDataFromLocalStorge()
{
    let date=window.localStorage.getItem("task");
    if(date)
    {
        let task=JSON.parse(date);
        addElementToPageFrom(task);
    }
}
function deleteTask(taskId)
{
    
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);

    addDateToLocalStorge(arrayOfTasks);
}
function togglefun(taskId)
{
    for(let i=0; i < arrayOfTasks.length ;i++)
    {
        if(arrayOfTasks[i].id==taskId)
        {
            arrayOfTasks[i].completed== false ?arrayOfTasks[i].completed= true :arrayOfTasks[i].completed = false; 
        }
    }
    addDateToLocalStorge(arrayOfTasks);
}