//game state
let gameState = {
    "inventory": [],
    "hasSword": false,
    "keyPickedUp": false
}

if (Storage) {
    if (localStorage.gameState) {
        //uses localStorage gamState string and convert it to an object. then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    } else {
        //convert local object variable into string. Then store it into localStorage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}

//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory box
const inventoryList = document.getElementById("inventoryList");

//main character
const hero = document.getElementById("hero");
const offsetHero = 16;

//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const interactAudio = document.getElementById("interactAudio");

//speechBubbles
const heroSpeech = document.getElementById("heroSpeech");
const interactSpeech = document.getElementById("interactSpeech");
const interactAvatar = document.getElementById("interactAvatar");

//things
const tree = document.getElementById("tree");
const coin = document.getElementById("coin");
const key = document.getElementById("key");

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //offset so hero is in middle of mouse
    if (heroSpeech.style.opacity == 0 && interactSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            hero.style.left = x - offsetHero + "px";
            hero.style.top = y - offsetHero + "px";
        }
        switch (e.target.id) {
            case "coin":
                showMessage(heroSpeech, "you've found a coin!", heroAudio);
                document.getElementById("coin").remove();
                changeInventory("coin", "add");
                break;
            case "key":
                showMessage(heroSpeech, "you've found a key!", heroAudio);
                document.getElementById("key").remove();
                changeInventory("key", "add");
                gameState.keyPickedUp = true;
                saveGameState(gameState);
                break;
            case "chest":
                if (!gameState.hasSword) {
                    showMessage(heroSpeech, "you've found a sword!", heroAudio);
                    changeInventory("sword", "add");
                    gameState.hasSword = true;
                }
                else {
                    showMessage(heroSpeech, "The chest is empty", heroAudio);
                }
                break;
            case "chestDoor":
                if (checkItem("key")) {
                    showMessage(heroSpeech, "The door has opened :o", heroAudio);
                    document.getElementById("chestDoor").remove();
                    document.getElementById("hiddenRoom").remove();
                }
                else if (checkItem("coin")) {
                    showMessage(heroSpeech, "You used a coin. \n"
                        + "It wasn't very effective", heroAudio);
                }
                else {
                    showMessage(heroSpeech, "sheiße the door is locked!", heroAudio);
                }
                break;
            case "torch":
                showMessage(interactSpeech, "Go away", interactAudio);
                setTimeout(function () { interactAvatar.style.opacity = 1; }, 2001);
                setTimeout(showMessage, 4001, heroSpeech, "You can talk?!", heroAudio);
                setTimeout(showMessage, 8001, interactSpeech, "Yea so what?", interactAudio);
                setTimeout(showMessage, 12001, heroSpeech, "I'm just so confused...", heroAudio);
                setTimeout(showMessage, 16001, interactSpeech, "What gives, just go", interactAudio);
                setTimeout(function () { interactAvatar.style.opacity = 0; }, 20001);
                break;
            default:
                break;
        }
    }
}
updateInventory(gameState.inventory, inventoryList);



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

/**
 * Puts the dialog on screen on either one of the bubbles
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4000, targetBubble, targetSound);
}

/**
 * hides message and pauses audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}

/**
 * saves gameState into local storage
 * @param {object} gameState 
 */
function saveGameState(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}
