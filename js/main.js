//game state
let gameState = {
    "inventory": [],
    "hasSword": false
}

//load data from save file
fetch('data/save.json').then((response) => {
    if (response.status == 404) {
        alert('file not found!');
    }
    else {
        return response.json();
    }
}).then((resJson) => {
    gameState = resJson;
    runGame();
}).catch((error) => {
    console.error(error);
});

function runGame() {
    document.getElementById("mainTitle").innerText = "INTENSE TITLE";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //inventory box
    const inventoryList = document.getElementById("inventoryList");

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
                console.log("you've found a coin!");
                document.getElementById("coin").remove();
                changeInventory("coin", "add");
                break;
            case "key":
                console.log("you've found a key!");
                document.getElementById("key").remove();
                changeInventory("key", "add");

                break;
            case "chest":
                if (!gameState.hasSword) {
                    console.log("you've found a sword!");
                    changeInventory("sword", "add");
                    gameState.hasSword = true;
                }
                else {
                    console.log("The chest is empty");
                }
                break;
            case "chestDoor":
                if (checkItem("key")) {
                    console.log("The door has opened :o");
                    changeInventory("key", "remove");
                    document.getElementById("chestDoor").remove();
                    document.getElementById("hiddenRoom").remove();
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
                console.log("go away");
                break;
            default:
                break;
        }
        updateInventory(gameState.inventory, inventoryList);
    }


    /**
     * add or remove item in the inventory
     * @param {string} itemName 
     * @param {string} action 
     */
    function changeInventory(itemName, action) {
        if (itemName == null || action == null) {
            console.error("wrong parameters given to changeInventory");
            return;
        }

        switch (action) {
            case 'add':
                gameState.inventory.push(itemName);
                break;
            case 'remove':
                gameState.inventory = gameState.inventory.filter(function (newInventory) {
                    return newInventory !== itemName;
                });
                document.getElementById("inv-" + itemName).remove();
                break;
        }
    }

    /**
     * updates inventory (for adding and removing)
     * @param {*} inventory 
     * @param {*} inventoryList 
     */
    function updateInventory(inventory, inventoryList) {
        inventoryList.innerHTML = '';
        inventory.forEach(function (item) {
            const inventoryItem = document.createElement("li");
            inventoryItem.id = 'inv-' + item;
            inventoryItem.innerText = item;
            inventoryList.appendChild(inventoryItem);
        });
    }

    /**
     * checks for certain item
     * @param {string} itemName 
     * @returns 
     */
    function checkItem(itemName) {
        return gameState.inventory.includes(itemName);
    }
}