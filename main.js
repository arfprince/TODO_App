import "./style.css";
const toDo=document.querySelector("#toDo");
const inProgress=document.querySelector("#inProgress");
const completed=document.querySelector("#completed");
const userIdInput=document.querySelector("#userId");
const userIdBtn=document.querySelector("#userIdBtn");
const currentTodoInput=document.querySelector("#currentTodo");
const currentTodoBtn=document.querySelector("#currentTodoBtn");
const baseUrl="https://todo-crudl.deno.dev";

async function randerTodos(userId){
    const url =`${baseUrl}/${userId}/todos`;
    const response = await fetch(url);
    const data = await response.json();
    toDo.innerHTML=``;
    for(let i=0;i<data.length;i++){
        const div=document.createElement("div");
        div.innerHTML=`<div class="flex justify-between m-2">
        <div class="flex gap-2 px-1 font-medium">
        <input type="checkbox" name="" id="">
        <h1>${data[i].title}</h1>
        </div>
        <div>
        <button class="p-2 hover:bg-red-400 rounded-sm">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
        </button>
        </div>
    </div>`;
        toDo.appendChild(div);
    }
}
let userId;
userIdBtn.addEventListener("click", async (e)=>{
    userId=userIdInput.value;
    console.log(userId);
    const p=document.querySelector("#userIdErrorMessage");
    if(!userId){
        p.classList.remove("hidden");
        return;
    }
    else{
        p.classList.add("hidden");
    }
    try {
        const url=`${baseUrl}/${userId}/todos`;
        const response = await fetch(url);
        const data=await response.json();
        randerTodos(userId);
    } catch (error) {
        console.log("errrr",error);
    }
    currentTodoBtn.classList.remove("hidden");
    currentTodoInput.classList.remove("hidden");
    userIdBtn.classList.add("hidden");
    userIdInput.classList.add("hidden");
});

let todoName;
currentTodoBtn.addEventListener("click",async (e)=>{
    e.preventDefault();
    todoName=currentTodoInput.value;

    const url=`${baseUrl}/${userId}/todos`;
    try {
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                title: `${todoName}`,
            }),
        });
        const data=await response.json();
        if(!response.ok){
            const errorMessage=data.fieldErrors.title[0];
            const p=document.querySelector("#currentTodoErrorMessage");
            p.innerHTML=`${errorMessage}`;
            p.classList.remove("hidden");
        }else{
            randerTodos(userId);
        }
    } catch (error) {
        console.log("errr",error);
    }
});







