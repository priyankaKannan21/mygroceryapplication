let isActive;
window.onload = () => {
    isActive = true;
    onloadpage(isActive)
}
function signUpFunc(){
    document.querySelector(".signInPage").classList.remove("active")
    document.querySelector(".signUpPage").classList.add("active");
    isActive = false;
    onloadpage(isActive)
}
function signInFunc(){
    document.querySelector(".signUpPage").classList.remove("active")
    document.querySelector(".signInPage").classList.add("active");
    isActive = true;
    onloadpage(isActive)
}
function onloadpage(isActive){
    if(isActive){
        let signInButton = document.getElementById("signInbtn");
        signInButton.addEventListener("click", () => {
            let useremail = document.getElementById("userEmail").value;
            let userpassword = document.getElementById("userPassword").value;
            console.log(userpassword);
            if(validationUser(useremail,userpassword)){
                signInUser(useremail,userpassword);
            }
        })
    }
    else{
        let signUpButton = document.getElementById("signUpbtn");
        signUpButton.addEventListener("click", () => {
            let newuseremail = document.getElementById("newUserEmail").value;
            let newuserpassword = document.getElementById("newUserPassword").value;
            if(validationNewUser(newuseremail,newuserpassword)){
                signUpUser(newuseremail,newuserpassword);
            }
        })
    }
}

function validationUser(email,password){
    if(email === ""){
        alert("Enter your email");
        return false;
    }
    else if(password === ""){
        alert("Enter your password");
        return false;
    }
    else if(email.split("@")[1] != "gmail.com"){
        alert("Invalid Email should end with @gmail.com");
        return false;
    }
    return true;
}
function validationNewUser(email,password){
    if(email === ""){
        alert("Enter your email");
        return false;
    }
    else if(password === ""){
        alert("Enter your password");
        return false;
    }
    else if(email.split("@")[1] != "gmail.com"){
        alert("Invalid Email should end with @gmail.com");
        return false;
    }
    else if(password.length < 8){
        alert("Password need to be minimum of 8 characters")
        return false;
    }
    return true;
}

 function signInUser(email,password){
    console.log(email,password )
    fetch("http://localhost:2000/existinguserdata", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : email,
            "password" : password
        })
    })
    .then((data) => data.json())
   .then((res)=>{
    if(res.key === "Unsuccessful"){
        alert(res.message +"😔")
    }
    else{
        sessionStorage.setItem("key", res.user );
        sessionStorage.setItem("profilename", res.profilename);
        location.href= "ShoppingPage.html";
    }
   })
}

 function signUpUser(email, password){
    console.log("hello");
    fetch("http://localhost:2000/newuserdata", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : email,
            "password" : password,
            "phonenumber" : "",
            "address" : "",
            "userprofilename" : email.split("@")[0]
        })
    })
    .then((data) => data.json())
   .then((res)=>{
    if(res.key === "Unsuccessful"){
        alert(res.key +"😔")
    }
    else{
        sessionStorage.setItem("key", res.user);
        sessionStorage.setItem("profilename", email.split("@")[0])
        location.href= "ShoppingPage.html";
    }
   })
 }
