document.getElementById("mainTitle").innerText = "PointVenture";

//game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory box
const inventoryList = document.getElementById("inventoryList")

//main character
const hero = document.getElementById("hero");
const offsetHero = 16;

//things
const tree1 = document.getElementById("tree");
const coin1 = document.getElementById("coin");
const key1 = document.getElementById("key");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //offset so hero is in middle of mouse
    if (e.traget.id != hero) {
        hero.style.left = x - offsetHero + "px";
        hero.style.top = y - offsetHero + "px";
    }

    switch (e.target.id) {
        case "tree":
            tree1.style.opacity = 0.6;
            break;
        case "coin":
            coin1.remove();
            const coinElement = document.createElement("li");
            coinElement.id = "inv-coin";
            coinElement.innerText = "coin";
            inventoryList.appendChild(coinElement);
            break;
        case "key":
            key1.remove();
            const keyElement = document.createElement("li");
            keyElement.id = "inv-key";
            keyElement.innerText = "key";
            inventoryList.appendChild(keyElement);
            break;
        default:
            tree1.style.opacity = 1;
    }
}