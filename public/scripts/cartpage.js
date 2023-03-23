let username = sessionStorage.getItem("key");
let profilename = sessionStorage.getItem("profilename");
document.getElementById("profileButton").innerHTML = `${profilename.charAt(0).toUpperCase()}`;
cartPage(username);
async function cartPage(username){
    let usercartdata;
    await fetch("http://localhost:2000/viewcartpage", {
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
        if(res.key === "NoItems"){
            usercartdata = {};
        }else{
            usercartdata = res;
        }
    })   

   let cartdata =``;
   let allcartdata =``;
   let cartdatalist = Object.keys(usercartdata);
   let datalen = cartdatalist.length;
   if(datalen != 0){
        allcartdata += `<div class="groceryNameCost" style="background-color: #fa8166;   text-decoration: underline;">
        <label class="groceryName">Product Name</label>
        <label class="groceryCost">Cost (in Rs.)</label>
        </div>`;
        let totalCost = 0;
        for(let index=0; index<datalen; index++){
                let groceryname = usercartdata[cartdatalist[index]].groceryname;
                let grocerytype;
                await fetch("http://localhost:2000/grocerytype", {
                    method: "POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body:JSON.stringify({
                        "groceryname" : groceryname,
                    })
                })
                .then((data) => data.json())
                .then((res) => {
                    grocerytype = res.grocerytype;
                });
                cartdata += `<div class="groceryCards">
                    <div class="groceryImage1">
                        <img src="./assets/${usercartdata[cartdatalist[index]].groceryimage}">
                    </div>
                    <div class="groceryItemInfo">
                        <div class="groceryNameCost">
                            <label class="groceryName">${usercartdata[cartdatalist[index]].groceryname}</label>
                            <label class="groceryCost">${usercartdata[cartdatalist[index]].grocerycost}</label>
                        </div>
                        <button onclick="removeitem('${username}','${cartdatalist[index]}')">Remove</button>
                        <button onclick="cartbuyitem('${username}','${cartdatalist[index]}', '${grocerytype}')">Buy</button>
                    </div>
                </div>`;

                allcartdata += `<div class="groceryNameCost">
                <label class="groceryName">${usercartdata[cartdatalist[index]].groceryname}</label>
                <label class="groceryCost">${usercartdata[cartdatalist[index]].grocerycost}</label>
                </div>`;
                let coststr = (usercartdata[cartdatalist[index]].grocerycost).split(".")[1];
                totalCost += parseInt(coststr);
        }
        allcartdata += `<div class="totalSection">
            <label class="totalHeader">Total</label>
            <label class="totalCost">Rs.${totalCost}</label>
            </div>`;
            allcartdata += `<div class="buyallbuttonclass" id="buyallbuttonclass">
            <button id="buyAllBtn" onclick="buyallitem('${username}')">Buy All</button></div>`;
        document.getElementById("groceryItemsInCart").innerHTML = cartdata;
        document.getElementById("productCostNameList").innerHTML = allcartdata;
        document.getElementById("buyallbuttonclass").style.cursor = "pointer";
        document.getElementById("buyAllBtn").style.pointerEvents = "auto";
    }else{
        let totalCost = 0;
        cartdata += `<h1>Your cart is Empty 😔</h1>
        <button onclick="shoppingpage()">Add Products</button>`;
        allcartdata += `<div class="groceryNameCost" style="background-color: #fa8166;   text-decoration: underline;">
            <label class="groceryName">Product Name</label>
            <label class="groceryCost">Cost (in Rs.)</label>
            </div>
            <div class="totalSection">
            <label class="totalHeader">Total</label>
            <label class="totalCost">Rs.${totalCost}</label>
            </div>`;
            allcartdata += `<div class="buyallbuttonclass" id="buyallbuttonclass"><button id="buyAllBtn" onclick="buyallitem('${username}')">Buy All</button></div>`;
        document.getElementById("groceryItemsInCart").innerHTML = cartdata;
        document.getElementById("productCostNameList").innerHTML = allcartdata;
        document.getElementById("buyallbuttonclass").style.cursor = "not-allowed";
        document.getElementById("buyAllBtn").style.pointerEvents = "none";
    }
}

async function removeitem(username, itemname){
    if(confirm("Do you want to remove the product from cart?🤔...")){
        await fetch("http://localhost:2000/removeitemincart", {
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
            var x = document.getElementById("snackbar");
            x.className = "show";
            document.getElementById("snackbar").innerHTML =`${res.key} 😔...`;
            document.getElementById("snackbar").style.backgroundColor = "#ea6262";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        });
        setTimeout(function(){cartPage(username)}, 2100);
    }
}

async function cartbuyitem(username, itemname, grocerytype){
    if(confirm("Do you really want to buy the product?😀...")){
        let message;
        await fetch("http://localhost:2000/buyitemincart", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({
                "useremail" : username,
                "itemname" : itemname,
                "grocerytype" : grocerytype
            })
        })
        .then((data) => data.json())
        .then((res) => {
                message = res.key +"😄...";
        });
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`${message}`;
        document.getElementById("snackbar").style.backgroundColor = "#75d06a";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.reload();}, 2100)  
    }
}

async function buyallitem(username){

    let usercartdata;
    await fetch("http://localhost:2000/viewcartpage", {
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
            usercartdata = res;
    })
    if(usercartdata != {}){
        if(confirm("Do you really want to buy all the product in cart?😀...")){
            await fetch("http://localhost:2000/buyallitemincart", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify({
                    "useremail" : username
                })
            })
            .then((data) => data.json())
            .then((res) => {
                message = res.key +"😄...";
        });
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`${message}`;
        document.getElementById("snackbar").style.backgroundColor = "#75d06a";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.reload();}, 2100)
        }
    }else{
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Cart is Empty 😔`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
    }
}

function shoppingpage(){
    location.href = "ShoppingPage.html";
}

function onClickLogo(){
    location.href = "ShoppingPage.html";
}

function backpage(){
    location.href = "ShoppingPage.html";
}

function logout(){
    if(confirm("Do you really want to logout")){
        sessionStorage.clear();
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Logging out😔`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.href= "Index.html";}, 2100)
    }
}

function profile(){
    location.href = "ProfilePage.html";   
}