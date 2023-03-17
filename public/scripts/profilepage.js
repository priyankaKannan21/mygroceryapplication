let username = sessionStorage.getItem("key");

profilePage(username);

async function profilePage(username){
    let userprofiledetails;
    await fetch("http://localhost:2000/userprofiledatabse", {
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
        userprofiledetails = res;
    }); 
    document.querySelector("#editform").innerHTML=`
    <label class="userData">${userprofiledetails.userprofilename}</label>
    <label class="userData">${username}</label>
    <label class="userData">${userprofiledetails.phonenumber}</label>
    <label class="userData">${userprofiledetails.address}</label>`;
    let button = `<button  id="editProfileBtn" onclick="editProfile()">Edit Profile</button>`;
    document.getElementById("buttonClass").innerHTML = `<button  id="editProfileBtn" onclick="editProfile()">Edit Profile</button>`;

    let profilename = userprofiledetails.userprofilename;
    profilename = profilename.charAt(0).toUpperCase() + profilename.slice(1);
    document.getElementById("userName").innerHTML = `Welcome ${profilename} 😊`;
    document.getElementById("profileButton").innerHTML = `${profilename.charAt(0).toUpperCase()}`;


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
    if(confirm("Do you really want to delete the product?🤔...")){
        sessionStorage.clear();
        location.href = "Index.html";   
    
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

async function editProfile(){
    let userprofiledetails;
    await fetch("http://localhost:2000/userprofiledatabse", {
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
        userprofiledetails = res;
   });

    document.querySelector("#editform").innerHTML=`
    <input class="userDataInput" id="userProfileName" type="text" value="${userprofiledetails.userprofilename}"/>
    <label class="userData">${username}</label>
    <input class="userDataInput" id="userPhonenumber" type="text" value="${userprofiledetails.phonenumber}"/>
    <textarea class="userDataInput1" id="userAddress" type="text" rows=4 >${userprofiledetails.address}</textarea>
    `;
    document.getElementById("buttonClass").innerHTML = `<button  id="editProfileBtn" onclick="saveEditProfile()">Save Changes</button>`;
}

async function saveEditProfile(){
    let userprofilename = document.getElementById("userProfileName").value;
    let userphonenumber =  document.getElementById("userPhonenumber").value;
    let useraddress =  document.getElementById("userAddress").value;

    await fetch("http://localhost:2000/userprofileupdate", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : username,
            "userprofilename" : userprofilename,
            "userphonenumber" : userphonenumber,
            "useraddress" : useraddress
        })
    })
    .then((data) => data.json())
   .then((res) => {
        alert(res.key + "😄...");
   });
   sessionStorage.setItem("profilename", userprofilename);
   profilePage(username);
}

function onClickLogo(){
    location.href = "ShoppingPage.html";
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
    if(confirm("Do you really want to logout")){
        sessionStorage.clear();
        location.href = "Index.html";   
    }
}