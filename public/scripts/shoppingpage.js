let profilename = sessionStorage.getItem("key").split("@")[0];
profilename = profilename.charAt(0).toUpperCase() + profilename.slice(1);
document.getElementById("userName").innerHTML = `Welcome ${profilename} 😊`;
document.getElementById("profileButton").innerHTML = `${profilename.charAt(0).toUpperCase()}`;
let viewCartBtn = document.getElementById("viewCartBtn");
viewCartBtn.addEventListener("click", () => {
    location.href = "CartPage.html";
});
shoppingpage();
async function shoppingpage(){
    let grocerydata;
    await fetch("http://localhost:2000/qrocerydatabase")
    .then((data) => data.json())
    .then((res) => {
        grocerydata = res;
    })
    let groceryNameList = Object.keys(grocerydata);
    let grocerysection = ``;
    for(let index=0; index<4; index++){
        let groceryItems = Object(grocerydata[groceryNameList[index]]);
        let groceryItemskeys = Object.keys(groceryItems);
        console.log(groceryItemskeys);
        grocerysection += `<div class="GroceryItemSection">
        <div class="topSectionItem">
            <label class="groceryName">${groceryNameList[index]} Section</label>
            <button class="SeeMoreBtn">See More</button>
        </div>
        <div class="GroceryCards">
            <div class="CardViewSection">
                <div class="GroceryImage1">
                    <img src="./assets/${groceryItems[groceryItemskeys[0]].groceryimage}">
                </div>
                <div class="GroceryNameCost">
                    <label class="GroceryName">${groceryItemskeys[0]}</label>
                    <label class="GroceryCost">${groceryItems[groceryItemskeys[0]].grocerycost}</label>
                </div>
                <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[0]}')">Add to Cart</button>
            </div>
            <div class="CardViewSection">
                <div class="GroceryImage1">
                    <img src="./assets/${groceryItems[groceryItemskeys[1]].groceryimage}">
                </div>
                <div class="GroceryNameCost">
                    <label class="GroceryName">${groceryItemskeys[1]}</label>
                    <label class="GroceryCost">${groceryItems[groceryItemskeys[1]].grocerycost}</label>
                </div>
                <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[1]}')">Add to Cart</button>
            </div>
            <div class="CardViewSection">
                <div class="GroceryImage1">
                    <img src="./assets/${groceryItems[groceryItemskeys[2]].groceryimage}">
                </div>
                <div class="GroceryNameCost">
                    <label class="GroceryName">${groceryItemskeys[2]}</label>
                    <label class="GroceryCost">${groceryItems[groceryItemskeys[2]].grocerycost}</label>
                </div>
                <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[2]}')">Add to Cart</button>
            </div>
            <div class="CardViewSection">
                <div class="GroceryImage1">
                    <img src="./assets/${groceryItems[groceryItemskeys[3]].groceryimage}">
                </div>
                <div class="GroceryNameCost">
                    <label class="GroceryName">${groceryItemskeys[3]}</label>
                    <label class="GroceryCost">${groceryItems[groceryItemskeys[3]].grocerycost}</label>
                </div>
                <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[3]}')">Add to Cart</button>
            </div>
            <div class="CardViewSection">
                <div class="GroceryImage1">
                    <img src="./assets/${groceryItems[groceryItemskeys[4]].groceryimage}">
                </div>
                <div class="GroceryNameCost">
                    <label class="GroceryName">${groceryItemskeys[4]}</label>
                    <label class="GroceryCost">${groceryItems[groceryItemskeys[4]].grocerycost}</label>
                </div>
                <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[4]}')">Add to Cart</button>
            </div>
        </div>
    </div>`
    }
    document.getElementById("shoppingSection").innerHTML = grocerysection;
}

async function addtocart(groceryItem,groceryItemName){
    let userNameCart = sessionStorage.getItem("key");
    console.log(groceryItem,groceryItemName);
    await fetch("http://localhost:2000/groceryItemData", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "username" : userNameCart,
            "Item" : groceryItem,
            "Name" : groceryItemName
        })
    })
    .then((data) => data.json())
    .then((res) => {
        alert(res.key + "😊..." + " " +"Continue Shopping!!!");
    })
}

function logout(){
    sessionStorage.clear();
    location.href = "Index.html";
}

function viewcart(){
    location.href = "CartPage.html";   
}

function profile(){
    location.href = "ProfilePage.html";   
}
