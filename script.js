import "./style.css";
const toDo=document.querySelector("#toDo");
const inProgress=document.querySelector("#inProgress");
const completed=document.querySelector("#completed");
const userIdInput=document.querySelector("#userId");
const userIdBtn=document.querySelector("#userIdBtn");
const addTodoInput=document.querySelector("#currentTodo");
const addTodoBtn=document.querySelector("#currentTodoBtn");
const baseUrl="https://todo-crudl.deno.dev";

async function getData() {
    const url=`${baseUrl}/${userId}/todos`;
    const response = await fetch(url);
    const data=await response.json();
    return data;
}
async function deleteTodo(userId,todoId) {
    const url=`${baseUrl}/${userId}/todos/${todoId}`;
    try {
        const response = await fetch(url,{
            method: "DELETE",
        }); 

        randerTodos(userId);
        randerInProgress(userId,0);
        randerComplete(userId,0);
    } catch (error) {
        console.log("errr",error);
    }
}
async function randerComplete(userId,inProgressId) {
    
    if(inProgressId)
    {
        let url =`${baseUrl}/${userId}/todos/${inProgressId}`;
        try {
            const response = await fetch(url,{
                method: "PUT",
                body: JSON.stringify({
                    status : "Completed",
                }),
            });
            randerInProgress(userId,0);
        } catch (error) {
            console.log("errrr",error);
        }
    }
    const data = await getData();
    completed.innerHTML=``;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].status==="Completed") 
        {
            const div=document.createElement("div");
            div.innerHTML=`<div class="flex justify-between m-2">
            <div class="flex gap-2 px-1 font-medium">
            <h1>${data[i].title}</h1>
            </div>
            <div class="deleteDiv">
            </div>
            </div>`;
            const deleteDiv=div.querySelector(".deleteDiv");
            deleteDiv.innerHTML=`<button id="deleteCompleted" value="${data[i].id}" class="p-2 hover:bg-red-400 rounded-sm">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
        </button>`;

            const button=deleteDiv.querySelector("#deleteCompleted");
            button.addEventListener("click",()=>{
                deleteTodo(userId,button.value);
            });
            completed.appendChild(div);
        }
    }
}

async function randerInProgress(userId,todoId) {
    
    if(todoId)
    {
        let url =`${baseUrl}/${userId}/todos/${todoId}`;
        try {
            const response = await fetch(url,{
                method: "PUT",
                body: JSON.stringify({
                    status : "In Progress",
                }),
            });
            randerTodos(userId);
        } catch (error) {
            console.log("errrr",error);
        }
    }
    const data = await getData();
    inProgress.innerHTML=``;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].status==="In Progress") 
        {
            const div=document.createElement("div");
            div.innerHTML=`<div class="flex justify-between m-2">
            <div class="flex gap-2 px-1 font-medium">
            <input type="checkbox" name="checkbox" value="${data[i].id}">
            <h1>${data[i].title}</h1>
            </div>
            <div class="deleteDiv">
            </div>
            </div>`;
            const deleteDiv=div.querySelector(".deleteDiv");
            deleteDiv.innerHTML=`<button id="deleteInProgress" value="${data[i].id}" class="p-2 hover:bg-red-400 rounded-sm">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
        </button>`;

            const button=deleteDiv.querySelector("#deleteInProgress");
            button.addEventListener("click",()=>{
                deleteTodo(userId,button.value);
            });

            const checkbox = div.querySelector("input[name=checkbox]");
            checkbox.addEventListener('change', function() {
                if(this.checked){
                    randerComplete(userId, checkbox.value);
                }
            });
            inProgress.appendChild(div);
        }
    }
}

async function randerTodos(userId){
    
    const data = await getData();
    
    toDo.innerHTML=``;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].status!=="todo") continue;
        const div=document.createElement("div");
        div.innerHTML=`<div class="flex justify-between m-2">
        <div class="flex gap-2 px-1 font-medium">
        <input type="checkbox" name="checkbox" value="${data[i].id}">
        <h1>${data[i].title}</h1>
        </div>
        <div class="deleteDiv">
        </div>
    </div>`;
        const deleteDiv=div.querySelector(".deleteDiv");
        deleteDiv.innerHTML=`<button id="deleteTodo" value="${data[i].id}" class="p-2 hover:bg-red-400 rounded-sm">
        <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
        <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
        </svg>
    </button>`;

        const button=deleteDiv.querySelector("#deleteTodo");
        button.addEventListener("click",()=>{
            deleteTodo(userId,button.value);
        });

        const checkbox = div.querySelector("input[name=checkbox]");
        checkbox.addEventListener('change', function() {
            if(this.checked){
                randerInProgress(userId,checkbox.value);
            }
        });

        toDo.appendChild(div);
    }
}

let userId;
userIdBtn.addEventListener("click", async (e)=>{
    userId=userIdInput.value;
    const p=document.querySelector("#userIdErrorMessage");
    if(!userId){
        p.classList.remove("hidden");
        return;
    }
    else{
        p.classList.add("hidden");
    }
    try {
        const data=getData();
        randerTodos(userId);
        randerInProgress(userId,0);
        randerComplete(userId,0);
    } catch (error) {
        console.log("errrr",error);
    }
    addTodoBtn.classList.remove("hidden");
    addTodoInput.classList.remove("hidden");
    userIdBtn.classList.add("hidden");
    userIdInput.classList.add("hidden");
});

let todoName;
addTodoBtn.addEventListener("click",async (e)=>{
    e.preventDefault();
    todoName=addTodoInput.value;

    const url=`${baseUrl}/${userId}/todos`;
    try {
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                title : `${todoName}`,
            }),
        });
        const p=document.querySelector("#currentTodoErrorMessage");
        const data=await response.json();
        if(!response.ok){
            const errorMessage=data.fieldErrors.title[0];
            p.innerHTML=`${errorMessage}`;
            p.classList.remove("hidden");
        }else{
            randerTodos(userId);
            p.classList.add("hidden");
        }
    } catch (error) {
        console.log("errr",error);
    }
});







