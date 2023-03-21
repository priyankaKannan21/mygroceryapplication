let username = sessionStorage.getItem("key");

profilePage(username);

async function profilePage(username){
    await fetch("http://localhost:2000/userprofileimgdata", {
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
        console.log(res.key);
        if(res.key === "none"){
            console.log(res.key);
        }else{
            if(res.key === ""){
                document.getElementById("userprofileimage").innerHTML = 
                `<img src="./assets/user.png">`;
            }else{
                document.getElementById("userprofileimage").innerHTML = 
                `<img src="./assets/${res.key}.png">`;
            }    
        }
    })    
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
            <h1>Empty Purchase History</h1>
            <button onclick="shoppingpage()">Purchase Products</button>
            </div>`;
        document.getElementById("groceryItemsPurchased").innerHTML = purchasedata;
    }
}

async function deletePurchasedItem(username, itemname){
    if(confirm("Do you really want to delete the product?🤔...")){    
        let message;
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
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Product is deleted 😔...`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.href= "ProfilePage.html";}, 2100)
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
    <input class="userDataInput" id="userPhonenumber" type="number" value="${userprofiledetails.phonenumber}"/>
    <textarea class="userDataInput1" id="userAddress" type="text" rows=4 >${userprofiledetails.address}</textarea>
    `;
    document.getElementById("buttonClass").innerHTML = `<button  id="editProfileBtn" onclick="saveEditProfile()">Save Changes</button>`;
}

async function saveEditProfile(){
    let userprofilename = document.getElementById("userProfileName").value;
    let userphonenumber =  document.getElementById("userPhonenumber").value;
    let useraddress =  document.getElementById("userAddress").value;
    if(profilevalidation(userprofilename,userphonenumber,useraddress)){
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
        sessionStorage.setItem("profilename", userprofilename);
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Profile Updated 😄...`;
        document.getElementById("snackbar").style.backgroundColor = "#75d06a";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 1000);
        setTimeout(function(){location.href= "ProfilePage.html";}, 1100)
    }
}

async function profileImageChange(profileImgName){
    await fetch("http://localhost:2000/updateuserprofileimgdata", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : username,
            "profileimgname" : profileImgName
        })
    })
    .then((data) => data.json())
    .then((res) => {
        if(res.key === "successful"){
            console.log(res.key);
            var x = document.getElementById("snackbar");
            x.className = "show";
            document.getElementById("snackbar").innerHTML =`Updated profile Avatar 😄... `;
            document.getElementById("snackbar").style.backgroundColor = "#75d06a";
            document.querySelector(".profileDropdownContent").classList.remove("active")
            setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
            setTimeout(function(){location.reload()}, 2100);
        }
    })
}

function profilevalidation(userprofilename,userphonenumber,useraddress){
    if((!(/^[a-zA-Z0-9]+$/.test(userprofilename)) || !(/^[a-zA-Z]/.test(userprofilename))) && userprofilename != "" ){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =` Invalid username😔 </br>Only Alpha or Alphanumeric name`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 3000);
        return false;

    }else if(userphonenumber.length < 10 && userphonenumber != ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid phone number : Too short 😔`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        return false;

    }else if(userphonenumber.length >10 && userphonenumber != ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid phone number : Too Long 😔`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        return false;

    }else if(/^[a-zA-Z0-9]+$/.test(useraddress) && useraddress != ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid address 😔`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        return false;
    }
    return true;
}

function onClickLogo(){
    location.href = "ShoppingPage.html";
}

function profileClickFunc(){
    document.querySelector(".profileDropdownContent").classList.add("active")
}

function shoppingpage(){
    location.href = "ShoppingPage.html";
}

function viewcart(){
    location.href = "CartPage.html";   
}

function profile(){
    location.href = "ProfilePage.html";
}

function logout(){
    if(confirm("Do you really want to logout")){
        sessionStorage.clear();
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Logging out😔`;
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.href= "Index.html";}, 2100);
    }
}