const addItem = document.getElementById("add-item");

const list = JSON.parse(localStorage.getItem("data")) || [];
let currentItem = {};

// Adds div with the id to the page, the div contains checkbox, a textbox and a delete button. 
const addItemsToView = ()=>{
    const theList = document.querySelector("#the-list");
    const HTMLString = `
    <div id="${Date.now()}">
        <input type="checkbox" onchange="addOrUpdateItem(this)">
        <input type="text" onkeypress="enterDetection(event)" onchange="addOrUpdateItem(this)">
        <button type="button" onclick="deleteItem(this)">x</button>
    </div>
    `;
    theList.insertAdjacentHTML("beforeend", HTMLString);
};

// Add or update the item to the list.
const addOrUpdateItem = (elementEl)=>{
    const id = elementEl.parentElement.id;
    currentItem = list.find((item) => item.id === id);
    // Checking if we need to create a new item on the list if we are editing one existing item by simply search for a matching id on the list.
    if(!currentItem){
        const newItem = {
            id: id,
            isChecked: elementEl.type === "checkbox" ? true : false,
            title: elementEl.type === "text" ? elementEl.value : "" , 
        };
        list.push(newItem);
    } else {
        if(elementEl.type === "text"){
            currentItem.title = elementEl.value;
        } else {
            currentItem.isChecked = elementEl.value === "on" ? true : false;
        }
    }
    currentItem = {};

    localStorage.setItem("data", JSON.stringify(list));

    console.log(list);                                                               // TO REMOVE
};

// Function for the (x button) delete button

const deleteItem = (buttonEl) =>{
    const idToDelete = buttonEl.parentElement.id;
    const listArrIndex = list.findIndex( (item) => item.id === idToDelete);
    buttonEl.parentElement.remove();
    list.splice(listArrIndex, 1);

    localStorage.setItem("data", JSON.stringify(list));
    
    console.log(list);                                                              // TO REMOVE
};

addItem.addEventListener("click", addItemsToView);

// Function that handles when the ENTER key is pressed when you are inside of the text input and run the addItemsToView()
function enterDetection(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        addItemsToView();
    }
}

list.forEach((item)=>{
    const theList = document.querySelector("#the-list");
    const HTMLString = `
    <div id="${item.id}">
        <input type="checkbox" onchange="addOrUpdateItem(this)" ${item.isChecked ? "checked" : ""}>
        <input type="text" onkeypress="enterDetection(event)" onchange="addOrUpdateItem(this)" value="${item.title}">
        <button type="button" onclick="deleteItem(this)">x</button>
    </div>
    `;
    theList.insertAdjacentHTML("beforeend", HTMLString);
});
