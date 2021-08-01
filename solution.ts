class Task {
    text:string
    done:boolean
    constructor(text,done=false) {
        this.text = text
        this.done=done
    }
}

let tododel : HTMLLIElement = document.querySelector("#todo-delall")
let plusBtn:HTMLInputElement = document.querySelector("#todo-save")
let todoEl:HTMLElement = document.querySelector("h1")
let divdel:HTMLElement = document.querySelector("#todo-del")
let delCompletedEl:HTMLInputElement = document.querySelector("#todo-delcom")


delCompletedEl.addEventListener("click",event=>{
  
  let storage:any = JSON.parse(localStorage.getItem("tasks"))["keys"]
  let list:HTMLElement = document.querySelector("#todo-list")
  
  let arr: any=[]
  let res =""
  let counter = 0
  storage.forEach(element => {
    if (!element["done"]) {
      arr.push(element)
    }
  });
  localStorage.setItem("tasks",JSON.stringify({"keys":arr}))

  arr.forEach((element) => {
    if (element.done) {
      res+= `<div class="todo-row"><div id="row${counter}"  class ="todo-item done">${element.text}</div><input type="button" value=&#x2714 onclick ="completed(${counter})"class ="todo-item.cx todo-ok"></div>`;

    }else{
      res+= `<div class="todo-row"><div id="row${counter}"  class ="todo-item">${element.text}</div><input type="button" value=&#x2714 onclick ="completed(${counter})"class ="todo-item.cx todo-ok"></div>`;
    }
    counter++
});
list.innerHTML = `${res}`
  
})

function delEverything() {
    let itemLists:HTMLElement = document.querySelector("#todo-list")
    let storage:string = localStorage.getItem("tasks")
    
    itemLists.innerHTML ="";
    if (storage == null){
        return
    }
    
    localStorage.removeItem("tasks")
    
}

plusBtn.addEventListener("click",(event=>{
  let inputEl: HTMLInputElement = document.querySelector("#todo-item")
  let note: Task = new Task(inputEl.value)
  let list:HTMLElement = document.querySelector("#todo-list")
  let itemsEls:NodeList = document.querySelectorAll(".todo-row")
  list.innerHTML += `<div class="todo-row"><div id="row${itemsEls.length}" class ="todo-item">${note.text}</div><input type="button" value=&#x2714 onclick ="completed(${itemsEls.length})" class ="todo-item.cx todo-ok"></div>`;
  insertTolocalStorag(note)
  event.preventDefault()
}))

function insertTolocalStorag (obj:Task):void {
    let storage:string = localStorage.getItem("tasks")
    
    
    if (storage == null){
        localStorage.setItem("tasks",JSON.stringify({"keys":[obj]}))
        return
    }
    let parsedStorage:any = JSON.parse(storage)["keys"].concat([obj])
    localStorage.setItem("tasks",JSON.stringify({"keys":parsedStorage}))
}

function completed(index:number):void{
  let completedEl:HTMLElement = document.querySelector(`#row${index}`)
  let storage:any = JSON.parse(localStorage.getItem("tasks"))["keys"]

  if (completedEl.classList.contains("done")){
    completedEl.classList.remove("done")
    storage[index]["done"] = false
  }
  else{
    storage[index]["done"] = true
    completedEl.classList.add("done")
  }
  localStorage.setItem("tasks",JSON.stringify({"keys":storage}))
}

(function intialization() {
    let storage = localStorage.getItem("tasks");
    let list = document.querySelector("#todo-list");
    let counter :number =0
    let res = ""
    
    if (storage == null) {
        return;
    }
    let parsed: any = JSON.parse(storage)
    
    parsed["keys"].forEach((element) => {
        if (element.done) {
          res+= `<div class="todo-row"><div id="row${counter}"  class ="todo-item done">${element.text}</div><input type="button" value=&#x2714 onclick ="completed(${counter})"class ="todo-item.cx todo-ok"></div>`;

        }else{
          res+= `<div class="todo-row"><div id="row${counter}"  class ="todo-item">${element.text}</div><input type="button" value=&#x2714 onclick ="completed(${counter})"class ="todo-item.cx todo-ok"></div>`;
        }
        counter++
    });
    list.innerHTML = `${res}`


    tododel.setAttribute("data-bs-toggle","modal")
    tododel.setAttribute("data-bs-target","#exampleModal")

    todoEl.innerHTML += `
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Delete tasks ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" onclick=delEverything() data-bs-dismiss="modal" class="btn btn-primary">Ok</button>
        </div>
      </div>
    </div>
  </div>`
  })();

