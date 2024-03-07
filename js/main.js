//game state
let gameState = {
    "inventory": [],
    "hasSword": false,
    "keyPickedUp": false,
    "coinPickedUp": false,
    "chestOpened": false,
    "doorOpened": false,
    "enemy1ded": false,
    "enemy2ded": false,
    "enemy3ded": false,
    "enemy4ded": false
}

//if ran removes data
localStorage.removeItem("gameState");

if (Storage) {
    if (localStorage.gameState) {
        //uses localStorage gamState string and convert it to an object. then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    } else {
        //convert local object variable into string. Then store it into localStorage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}

//audio's
const lighting = document.getElementById("lighting");
const backgroundMusic = document.getElementById("backgroundMusic");

//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory box
const inventoryList = document.getElementById("inventoryList");

//characters
const hero = document.getElementById("hero");
const offsetHero = 16;
const priest = document.getElementById("priest");

//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const interactAudio = document.getElementById("interactAudio");

//speechBubbles
const heroSpeech = document.getElementById("heroSpeech");
const interactSpeech = document.getElementById("interactSpeech");
const interactAvatar = document.getElementById("interactAvatar");

//things
const coin = document.getElementById("coin");
const key = document.getElementById("key");

//extra
let playBackgroundMusic = true;

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}
if (gameState.chestOpened) {

}
if (gameState.coinPickedUp) {

}
if (gameState.doorOpened) {

}
if (gameState.hasSword) {

}

updateInventory(gameState.inventory, inventoryList);

if (!playBackgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

gameWindow.onclick = function (e) {
    //makes the background music play and stop if needed
    if (playBackgroundMusic) {
        backgroundMusic.play();
        backgroundMusic.loop = true;

    }
    if (e.target.className !== "unclickable") {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //offset so hero is in middle of mouse
        if (heroSpeech.style.opacity == 0 && interactSpeech.style.opacity == 0) {
            if (e.target.id !== "heroImage" && e.target.id !== "brownBar" && e.target.id !== "heroSpeech"
                && e.target.id !== "heroAvatarImg" && e.target.id !== "interactSpeech" && e.target.id !== "InteractAvatarImg") {
                hero.style.left = x - offsetHero + "px";
                hero.style.top = y - offsetHero + "px";
                document.getElementById("walkAudio").currentTime = 0;
                document.getElementById("walkAudio").play();
            }
            switch (e.target.id) {
                case "coinImg":
                    showMessage(heroSpeech, "you've found a coin!", heroAudio);
                    document.getElementById("coin").remove();
                    changeInventory("coin", "add");
                    gameState.coinPickedUp = true;
                    saveGameState(gameState);
                    break;
                case "keyImg":
                    showMessage(heroSpeech, "you've found a key!", heroAudio);
                    document.getElementById("key").remove();
                    changeInventory("key", "add");
                    gameState.keyPickedUp = true;
                    saveGameState(gameState);
                    break;
                case "chestImg":
                    if (!gameState.hasSword) {
                        showMessage(heroSpeech, "you've found a sword!", heroAudio);
                        changeInventory("sword", "add");
                        gameState.hasSword = true;
                        gameState.chestOpened = true;
                        saveGameState(gameState);
                    }
                    else {
                        showMessage(heroSpeech, "The chest is empty", heroAudio);
                    }
                    break;
                case "chestDoor":
                    if (checkItem("key")) {
                        showMessage(heroSpeech, "The door has opened :o", heroAudio);
                        document.getElementById("chestDoor").remove();
                        gameState.doorOpened = true;
                        saveGameState(gameState);
                    }
                    else if (checkItem("coin")) {
                        showMessage(heroSpeech, "You used a coin. \n"
                            + "It wasn't very effective", heroAudio);
                    }
                    else {
                        showMessage(heroSpeech, "sheiße the door is locked!", heroAudio);
                    }
                    break;
                case "priestImg":
                    interactSpeech.style.opacity = 1;
                    interactAvatar.style.opacity = 1;
                    setTimeout(showMessage, 1000, interactSpeech, "Welcome to the dungeon, be aware of great monsters", interactAudio)
                    setTimeout(showMessage, 4000, heroSpeech, "Monsters?!", heroAudio);
                    setTimeout(showMessage, 7000, interactSpeech, "Yea so what?", interactAudio);
                    setTimeout(showMessage, 10000, heroSpeech, "I'm just so scared...", heroAudio);
                    setTimeout(showMessage, 13000, interactSpeech, "What gives, just go and explore", interactAudio);
                    setTimeout(function () { interactAvatar.style.opacity = 0; }, 16000);
                    setTimeout(function () { priest.style.top = "576px" }, 17000)
                    setTimeout(function () { priest.remove() }, 17500)
                    setTimeout(function () { document.getElementById("hiddenRoom1").remove() }, 17500)
                    break;
                case "priest":
                    interactSpeech.style.opacity = 1;
                    interactAvatar.style.opacity = 1;
                    setTimeout(showMessage, 1000, interactSpeech, "Welcome to the dungeon, be aware of great monsters", interactAudio)
                    setTimeout(showMessage, 4000, heroSpeech, "Monsters?!", heroAudio);
                    setTimeout(showMessage, 7000, interactSpeech, "Yea so what?", interactAudio);
                    setTimeout(showMessage, 10000, heroSpeech, "I'm just so scared...", heroAudio);
                    setTimeout(showMessage, 13000, interactSpeech, "What gives, just go and explore", interactAudio);
                    setTimeout(function () { interactAvatar.style.opacity = 0; }, 16000);
                    setTimeout(function () { priest.style.top = "576px" }, 17000)
                    setTimeout(function () { priest.remove() }, 17500)
                    setTimeout(function () { document.getElementById("hiddenRoom1").remove(); }, 17500)
                    break;
                case "standingTorch2Img":
                    showMessage(heroSpeech, "You light the candle*", heroAudio);
                    setTimeout(function () {
                        lighting.currentTime = 0;
                        document.getElementById("hiddenRoom2").remove();
                        document.getElementById("hiddenRoom4").remove();
                        document.getElementById("standingTorch2Img").remove();
                        document.getElementById("standingTorchLighted2Img").style.opacity = 1;
                        lighting.play();
                    }, 1000);
                    break;
                case "standingTorch1Img":
                    showMessage(heroSpeech, "You light another candle*", heroAudio);
                    setTimeout(function () {
                        lighting.currentTime = 0;
                        document.getElementById("hiddenRoom5").remove();
                        document.getElementById("hiddenRoom6").remove();
                        document.getElementById("standingTorch1Img").remove();
                        document.getElementById("standingTorchLighted1Img").style.opacity = 1;
                        lighting.play();
                    }, 1000);
                    break;
                case "standingTorch3Img":
                    showMessage(heroSpeech, "You light another candle*", heroAudio);
                    setTimeout(function () {
                        lighting.currentTime = 0;
                        document.getElementById("hiddenRoom3").remove();
                        document.getElementById("standingTorch3Img").remove();
                        document.getElementById("standingTorchLighted3Img").style.opacity = 1;
                        lighting.play();
                    }, 1000);
                    break;
                default:
                    break;
            }
        }
        setTimeout(function () { document.getElementById("walkAudio").pause(); }, 1000)
    }
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
    updateInventory(gameState.inventory, inventoryList);
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
    setTimeout(hideMessage, 3000, targetBubble, targetSound);
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
