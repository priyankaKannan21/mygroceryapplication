let profilename = sessionStorage.getItem("profilename");
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
        let arractive =[];
        let arrstyleclass =[];
        for(let index1=0;index1<groceryItemskeys.length;index1++){
            if(groceryItems[groceryItemskeys[index1]].quantity< 1){
                arractive[index1] = "nullSection active";
                arrstyleclass[index1] = "styleclasslabel";
            }else{
                arractive[index1] = "nullSection";
                if(groceryItems[groceryItemskeys[index1]].quantity< 4){
                    arrstyleclass[index1]= "styleclasslabel"
                }
                else{
                    arrstyleclass[index1] = "";
                }
            }
        }
        grocerysection += `<div class="GroceryItemSection">
        <div class="topSectionItem">
            <label class="groceryName">${groceryNameList[index]} Section</label>
            <button class="SeeMoreBtn">See More</button>
        </div>
        <div class="GroceryCards">
            <div class="${arractive[0]}">
                <div class="CardViewSection">
                    <div class="GroceryImage1">
                        <img src="./assets/${groceryItems[groceryItemskeys[0]].groceryimage}">
                    </div>
                    <div class="GroceryNameCost">
                        <label class="GroceryName">${groceryItemskeys[0]}</label>
                        <label class="GroceryCost">${groceryItems[groceryItemskeys[0]].grocerycost}</label>
                    </div>
                    <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[0]}')">Add to Cart</button>
                    <label class="${arrstyleclass[0]}" id="quantityLabel">Only ${groceryItems[groceryItemskeys[0]].quantity} left</label>
                </div>
            </div>
            <div class="${arractive[1]}">
                <div class="CardViewSection">
                    <div class="GroceryImage1">
                        <img src="./assets/${groceryItems[groceryItemskeys[1]].groceryimage}">
                    </div>
                    <div class="GroceryNameCost">
                        <label class="GroceryName">${groceryItemskeys[1]}</label>
                        <label class="GroceryCost">${groceryItems[groceryItemskeys[1]].grocerycost}</label>
                    </div>
                    <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[1]}')">Add to Cart</button>
                    <label class="${arrstyleclass[1]}" id="quantityLabel">Only ${groceryItems[groceryItemskeys[1]].quantity} left</label>
                </div>
            </div>
            <div class="${arractive[2]}">
                <div class="CardViewSection">
                    <div class="GroceryImage1">
                        <img src="./assets/${groceryItems[groceryItemskeys[2]].groceryimage}">
                    </div>
                    <div class="GroceryNameCost">
                        <label class="GroceryName">${groceryItemskeys[2]}</label>
                        <label class="GroceryCost">${groceryItems[groceryItemskeys[2]].grocerycost}</label>
                    </div>
                    <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[2]}')">Add to Cart</button>
                    <label class="${arrstyleclass[2]}" id="quantityLabel">Only ${groceryItems[groceryItemskeys[2]].quantity} left</label>
                </div>
            </div>
            <div class="${arractive[3]}">
                <div class="CardViewSection">
                    <div class="GroceryImage1">
                        <img src="./assets/${groceryItems[groceryItemskeys[3]].groceryimage}">
                    </div>
                    <div class="GroceryNameCost">
                        <label class="GroceryName">${groceryItemskeys[3]}</label>
                        <label class="GroceryCost">${groceryItems[groceryItemskeys[3]].grocerycost}</label>
                    </div>
                    <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[3]}')">Add to Cart</button>
                    <label class="${arrstyleclass[3]}" id="quantityLabel">Only ${groceryItems[groceryItemskeys[3]].quantity} left</label>
                </div>
            </div>
            <div class="${arractive[4]}">
                <div class="CardViewSection">
                    <div class="GroceryImage1">
                        <img src="./assets/${groceryItems[groceryItemskeys[4]].groceryimage}">
                    </div>
                    <div class="GroceryNameCost">
                        <label class="GroceryName">${groceryItemskeys[4]}</label>
                        <label class="GroceryCost">${groceryItems[groceryItemskeys[4]].grocerycost}</label>
                    </div>
                    <button onclick="addtocart('${groceryNameList[index]}','${groceryItemskeys[4]}')">Add to Cart</button>
                    <label class="${arrstyleclass[4]}" id="quantityLabel">Only ${groceryItems[groceryItemskeys[4]].quantity} left</label>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("shoppingSection").innerHTML = grocerysection;
    document.getElementById("userName").innerHTML = `Welcome ${profilename} 😊`;
    document.getElementById("profileButton").innerHTML = `${profilename.charAt(0).toUpperCase()}`;

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
