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
            let newuseremail = document.getElementById("newUserEmail").value;
            let newuserpassword = document.getElementById("newUserPassword").value;
            validationNewUser(newuseremail,newuserpassword);
            signInUser(newuseremail,newuserpassword);
        })
    }
    else{
        console.log("hello");
        let signUpButton = document.getElementById("signUpbtn");
        signUpButton.addEventListener("click", () => {
            let useremail = document.getElementById("userEmail").value;
            let userpassword = document.getElementById("userPassword").value;
            validationNewUser(useremail,userpassword);
            signUpUser(useremail,userpassword);
        })
    }
}
function validationNewUser(email,password){
    if(email.split("@")[1] != "gmail.com"){
        alert("Invalid Email should end with @gmail.com");
        return false;
    }
    if(password.length < 8){
        alert("Password need to be minimum of 8 characters")
        return false;
    }
}

 function signInUser(email,password){
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
    if(res.key === "unsuccessful"){
        alert(res.key)
    }
    else{
        sessionStorage.setItem("key", res.user );
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
            "password" : password
        })
    })
    .then((data) => data.json())
   .then((res)=>{
    if(res.key === "unsuccessful"){
        alert(res.key)
    }
    else{
        sessionStorage.setItem("key", res.user);
        location.href= "ShoppingPage.html";
    }
   })
 }
