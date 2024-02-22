document.getElementById("mainTitle").innerText = "PointVenture";

//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory box
let inventory = [];
const inventoryList = document.getElementById("inventoryList")

//main character
const hero = document.getElementById("hero");
const offsetHero = 16;

//things
const tree = document.getElementById("tree");
const coin = document.getElementById("coin");
const key = document.getElementById("key");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //offset so hero is in middle of mouse
    if (e.target.id !== "heroImage") {
        hero.style.left = x - offsetHero + "px";
        hero.style.top = y - offsetHero + "px";
    }
    switch (e.target.id) {
        case "coin":
            getItem("coin", "invCoin");
            break;
        case "key":
            getItem("key", "invKey");
            break;
        case "chest":
            getItem("sword", "invSword");
            break;
        case "chestDoor":
            if (checkItem("key")) {
                console.log("The door has opened :o");
                removeItem("key" + "invKey");
            }
            else if (checkItem("coin")) {
                console.log("You used a coin. \n"
                    + "It wasn't very effective");
            }
            else {
                console.log("sheiße the door is locked!");
            }
            break;
        case "torch":
            console.log("go away")
            break;
        default:
            break;
    }

    /**
     * checks if the value exists
     * if not then it adds the value to the array and use showItem function
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
    }

    /**
     * checks for certain item
     * @param {string} itemName 
     * @returns 
     */
    function checkItem(itemName) {
        return inventory.includes(itemName);
    }

    /**
     * needs name for display and an id
     * @param {string} itemName
     * @param {string} itemId
     */
    function showItem(itemName, itemId) {
        console.log('you\'ve found a ' + itemName + '!')
        const element = document.createElement("li");
        element.id = itemId;
        element.innerText = itemName;
        inventoryList.appendChild(element);
    }

    /**
     * removes item from array and the element from the HTML
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function removeItem(itemName, itemId) {
        //removes item in array
        inventory = inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        });
        document.getElementById(itemId).remove();
    }
}