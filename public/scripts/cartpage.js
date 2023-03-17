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
        usercartdata = res;
   })   

   let cartdata =``;
   let allcartdata =``;
   let cartdatalist = Object.keys(usercartdata);
   let datalen = cartdatalist.length;
   if(datalen != 0){
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
            allcartdata += `<button onclick="buyallitem('${username}')">Buy All</button>`
        document.getElementById("groceryItemsInCart").innerHTML = cartdata;
        document.getElementById("productCostNameList").innerHTML = allcartdata;
    }else{
        let totalCost = 0;
        allcartdata += `<div class="totalSection">
            <label class="totalHeader">Total</label>
            <label class="totalCost">Rs.${totalCost}</label>
            </div>`;
            allcartdata += `<button onclick="buyallitem('${username}')">Buy All</button>`
        document.getElementById("productCostNameList").innerHTML = allcartdata;
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
                alert(res.key +"😔...");
        });
        cartPage(username);
    }
}

async function cartbuyitem(username, itemname, grocerytype){
    if(confirm("Do you really want to buy the product?😀...")){
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
                alert(res.key +"😄...");
        });
        location.reload();
    }
}

async function buyallitem(username){
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
                alert(res.key +"😄...");
        });
        cartPage(username);
        location.reload();
    }
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
        location.href = "Index.html";   
    }
}

function profile(){
    location.href = "ProfilePage.html";   
}