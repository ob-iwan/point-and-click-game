//game state
let gameState = {
    "inventory": [],
    "hasSword": false,
    "coinPickedUp": false,
    "chestOpened": false,
    "ladderOpened": false,
    "enemy1ded": false,
    "candle1": false,
    "candle2": false,
    "candle3": false
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
lighting.volume = 0.3;
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.1;
const heroAudio = document.getElementById("heroAudio");
heroAudio.volume = 0.7;
const interactAudio = document.getElementById("interactAudio");
interactAudio.volume = 0.7;

//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory box
const inventoryList = document.getElementById("inventoryList");

//characters
const hero = document.getElementById("hero");
const offsetHero = 16;
const priest = document.getElementById("priest");

//speechBubbles
const heroSpeech = document.getElementById("heroSpeech");
const interactSpeech = document.getElementById("interactSpeech");
const interactAvatar = document.getElementById("interactAvatar");

//things
const coin = document.getElementById("coin");
const ladderLockedImg = document.getElementById("ladderLockedImg");

//extra
let playBackgroundMusic = true;

//gamestate check
if (gameState.chestOpened) {
    gameState.hasSword = true
}
if (gameState.coinPickedUp) {
    coin.remove();
}
if (gameState.ladderOpened) {
    ladderLockedImg.remove();
}
if (gameState.hasSword) {

}
if (gameState.candle1) {
    document.getElementById("hiddenRoom5").remove();
    document.getElementById("hiddenRoom6").remove();
    document.getElementById("standingTorch1Img").remove();
    document.getElementById("standingTorchLighted1Img").style.opacity = 1;
}
if (gameState.candle2) {
    document.getElementById("hiddenRoom2").remove();
    document.getElementById("hiddenRoom4").remove();
    document.getElementById("standingTorch2Img").remove();
    document.getElementById("standingTorchLighted2Img").style.opacity = 1;
}
if (gameState.candle3) {
    document.getElementById("hiddenRoom3").remove();
    document.getElementById("standingTorch3Img").remove();
    document.getElementById("standingTorchLighted3Img").style.opacity = 1;
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
                case "ladderLockedImg":
                    if (checkItem("key")) {
                        showMessage(heroSpeech, "The ladder has opened :o", heroAudio);
                        document.getElementById("chestDoor").remove();
                        gameState.ladderOpened = true;
                        saveGameState(gameState);
                    }
                    else if (checkItem("coin")) {
                        showMessage(heroSpeech, "You used a coin. \n"
                            + "It wasn't very effective", heroAudio);
                    }
                    else {
                        showMessage(heroSpeech, "sheiße the ladder is locked!", heroAudio);
                    }
                    break;
                case "priestImg":
                    interactSpeech.style.opacity = 1;
                    interactAvatar.style.opacity = 1;
                    setTimeout(showMessage, 1000, interactSpeech, "Welcome to the dungeon, be aware of great monsters", interactAudio)
                    setTimeout(showMessage, 4000, heroSpeech, "Monsters?!", heroAudio);
                    setTimeout(showMessage, 7000, interactSpeech, "Yea so what?", interactAudio);
                    setTimeout(showMessage, 10000, heroSpeech, "I'm just so scared...", heroAudio);
                    setTimeout(showMessage, 13000, interactSpeech, "What gives, here's a sword you will need it", interactAudio);
                    changeInventory("sword", "add");
                    gameState.hasSword = true;
                    saveGameState(gameState);
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
                    setTimeout(showMessage, 13000, interactSpeech, "What gives, here's a sword you will need it", interactAudio);
                    setTimeout(function () { changeInventory("sword", "add"); }, 13000)
                    setTimeout(function () { gameState.hasSword = true; }, 13000)
                    saveGameState(gameState);
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
                        gameState.candle2 = true;
                        saveGameState(gameState);
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
                        gameState.candle1 = true;
                        saveGameState(gameState);
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
                        gameState.candle3 = true;
                        saveGameState(gameState);
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
