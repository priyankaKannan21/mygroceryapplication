let username = sessionStorage.getItem("key");
let profilename = sessionStorage.getItem("key").split("@")[0];
profilename = profilename.charAt(0).toUpperCase() + profilename.slice(1);
document.getElementById("userName").innerHTML = `Welcome ${profilename} 😊`;
document.getElementById("profileButton").innerHTML = `${profilename.charAt(0).toUpperCase()}`;

profilePage(username);

async function profilePage(username){
    let userpurchasedata;
    await fetch("http://localhost:2000/purchasehistorydata", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : username,
        })
    })
    .then((data) => data.json())
   .then((res) => {
        userpurchasedata = res;
   })
   
   let purchasedata =``;
   let purchasedatalist = Object.keys(userpurchasedata);
   let datalen = purchasedatalist.length;
   if(datalen != 0){
        for(let index=0; index<datalen; index++){
            purchasedata += `<div class="groceryCards">
                <div class="groceryImage1">
                    <img src="./assets/${userpurchasedata[purchasedatalist[index]].groceryimage}">
                </div>
                <div class="groceryItemInfo">
                    <div class="groceryNameCost">
                        <label class="groceryName">${purchasedatalist[index]}</label>
                        <label class="groceryCost">${userpurchasedata[purchasedatalist[index]].grocerycost}</label>
                    </div>
                    <button onclick="deletePurchasedItem('${username}','${purchasedatalist[index]}')">Delete Product</button>
                    <button onclick="buyAgainAddInCart('${username}','${purchasedatalist[index]}')">Buy Again</button>
                </div>
            </div>`;
        }
        document.getElementById("groceryItemsPurchased").innerHTML = purchasedata;
    }else{
        purchasedata +=`<div class="purchasedata">
            <h1>Empty Purchase History</h2>
            <button onclick="shoppingpage()">Purchase Products</button>
            </div>`;
        document.getElementById("groceryItemsPurchased").innerHTML = purchasedata;
    }
}

async function deletePurchasedItem(username, itemname){
    await fetch("http://localhost:2000/deletepurchaseditem", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : username,
            "itemname" : itemname
        })
    })
    .then((data) => data.json())
   .then((res) => {
        alert(res.key +"😔...");
   });
   profilePage(username);
}

async function buyAgainAddInCart(username, itemname){
    await fetch("http://localhost:2000/buyagainaddtocart", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : username,
            "itemname" : itemname
        })
    })
    .then((data) => data.json())
   .then((res) => {
        alert(res.key +"😄...");
   });
   profilePage(username);
}

function shoppingpage(){
    location.href = "ShoppingPage.html";
}

function backpage(){
    location.href = "ShoppingPage.html";
}

function backpage(){
    location.href = "ShoppingPage.html";
}

function profile(){
    location.href = "ProfilePage.html";
}

function logout(){
    sessionStorage.clear();
    location.href = "Index.html";
}

function editProfile(){
    document.querySelector("#editform").innerHTML=`
    <input class="userData" type="text" value="Papa"/>
    <input class="userData" type="text" value="papa@gmail.com"/>
    <input class="userData" type="text" value="9023091843"/>
    <input class="userData" type="text" value="No.5, Krishna Nagar, TidelPark" />
    `
}
