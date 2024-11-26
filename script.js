const addItem = document.getElementById("add-item");
const theList = document.getElementById("the-list");

const list = [];

const addItemToView = ()=>{
    theList.innerHTML += `
    <div>
        <input type="checkbox">
        <input txpe="text" onchange="addOrUpdateItem()">
        <button type="button">x</button>
    </div>
    `;
};

const addOrUpdateItem = ()=>{
    console.log("hello");
};
addItem.addEventListener("click", addItemToView);