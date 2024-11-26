const addItem = document.getElementById("add-item");

const list = [];
let currentItem = {};

// Adds div with the id to the page, the div contains checkbox, a textbox and a delete button. 
const addItemsToView = ()=>{
    const theList = document.querySelector("#the-list");
    const HTMLString = `
    <div id="${Date.now()}">
        <input type="checkbox" onchange="addOrUpdateItem(this)">
        <input type="text" onchange="addOrUpdateItem(this)">
        <button type="button">x</button>
    </div>
    `;
    theList.insertAdjacentHTML("beforeend", HTMLString);
};

// Add or update the item to the list.
const addOrUpdateItem = (elementEl)=>{
    const id = elementEl.parentElement.id;
    currentItem = list.find((item) => item.id === id);
    if(!currentItem){
        const newItem = {
            id: id,
            isChecked: elementEl.type === "checkbox" ? true : false,
            title: elementEl.type === "text" ? elementEl.value : "" , 
        };
        list.push(newItem);
    }
    currentItem = {};
    console.log(list);
};
addItem.addEventListener("click", addItemsToView);