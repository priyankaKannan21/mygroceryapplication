let isActive;
window.onload = () => {
    isActive = true;
    onloadpage(isActive)
}

const hidebtn = document.querySelector('#togglebutton');
const userpassword = document.querySelector('#userPassword');


hidebtn.addEventListener('click', function (e) {
    const type = userpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    userpassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const hidebtn1 = document.querySelector('#togglebutton1');
const newuserpassword = document.querySelector('#newUserPassword');

hidebtn1.addEventListener('click', function (e) {
    const type1 = newuserpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newuserpassword.setAttribute('type', type1);
    this.classList.toggle('fa-eye-slash');
});



function onClickLogo(){
    location.reload()
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
    let domain =((email.split("@")[1]).split(".")[0]);
    if(email === ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Enter your email`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        // setTimeout(function(){location.href= "ShoppingPage.html";}, 2500);
        return false;
    }
    else if(password === ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Enter your password`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }
    else if(!(email.endsWith(".com"))){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }else if(!(email.split('')).includes("@")){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;   
    }else if(!(/^[a-zA-Z]*$/.test(domain)) || domain === ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }
    return true;
}

function validationNewUser(email,password){
    let emailarr=[];
    emailarr = email.split('');
    let domain =((email.split("@")[1]).split(".")[0]);
    if(email === ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Enter your email`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }
    else if(password === ""){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Enter your password`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }else if(!emailarr.includes("@")){
        console.log(!emailarr.includes("@"));
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;   
    }
    else if(!(/^[a-zA-Z]*$/.test(domain))){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }else if(!(email.endsWith(".com"))){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Invalid Email address`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }
    else if(password.length < 8){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Password need to be minimum of 8 characters`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        return false;
    }else if(/^[a-zA-Z0-9]+$/.test(password)){
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Password need to be strong`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
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
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`${res.message} 😔`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    }
    else{
        sessionStorage.setItem("key", res.user );
        sessionStorage.setItem("profilename", res.profilename);
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Successful Sign In 😄`;
        document.getElementById("snackbar").style.backgroundColor = "#75d06a";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
        setTimeout(function(){location.href= "ShoppingPage.html";}, 2500)
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
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`${res.message} 😔`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    }
    else{
        sessionStorage.setItem("key", res.user);
        sessionStorage.setItem("profilename", email.split("@")[0])
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Successful Sign Up 😄`;
        document.getElementById("snackbar").style.backgroundColor = "#75d06a";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        setTimeout(function(){location.href= "ShoppingPage.html";}, 2500);
    }
   })
 }

 function forgetpass(){
    location.href = "forgetPasswordPage.html";
 }
