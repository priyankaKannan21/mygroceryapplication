function homepage(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    document.getElementById("snackbar").innerHTML =`Redirecting to Sign In page...`;
    document.getElementById("snackbar").style.backgroundColor = "#75d06a";
    setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
    setTimeout(function(){location.href="Index.html";}, 1500) 
}

const hidebtn = document.querySelector('#togglebutton');
const userpassword = document.querySelector('#newPassword');


hidebtn.addEventListener('click', function (e) {
    const type = userpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    userpassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const hidebtn1 = document.querySelector('#togglebutton1');
const newuserpassword = document.querySelector('#confirmPassword');

hidebtn1.addEventListener('click', function (e) {
    const type1 = newuserpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newuserpassword.setAttribute('type', type1);
    this.classList.toggle('fa-eye-slash');
});

async function checkemail(){
    let useremail = document.getElementById("userEmail").value;
    await fetch("http://localhost:2000/forgertpassworduser", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "useremail" : useremail,
        })
    })
    .then((data) => data.json())
    .then((res) => {
        if(res.key === "Successful"){
            var x = document.getElementById("snackbar");
            x.className = "show";
            sessionStorage.setItem("key", useremail );
            document.getElementById("snackbar").innerHTML =`Valid Email 😄`;
            document.getElementById("snackbar").style.backgroundColor = "#75d06a";
            setTimeout(function(){x.className = x.className.replace("show", "");}, 1000);
            setTimeout(function(){
                document.querySelector(".passwordPage").classList.remove("active");
                document.querySelector(".newPasswordPage").classList.add("active");
            }, 2100);
                    

        }else{
            var x = document.getElementById("snackbar");
            x.className = "show";
            document.getElementById("snackbar").innerHTML =`Invalid Email 😔`;
            document.getElementById("snackbar").style.backgroundColor = "#ea6262";
            setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
            setTimeout(function(){location.reload();}, 2100)  
        }
    });
}

async function updatepass(){
    let newpassword = document.getElementById("newPassword").value;
    let confirmpassword = document.getElementById("confirmPassword").value;
    if(newpassword === ""){
        alert("Enter your new password");
    }
    else if(confirmpassword === ""){
        alert("Enter your confirm password");
    }
    else if(newpassword === confirmpassword){
        let useremail = sessionStorage.getItem("key");
        await fetch("http://localhost:2000/changepassworduser", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({
                "useremail" : useremail,
                "userpassword" : newpassword
            })
        })
        .then((data) => data.json())
        .then((res) =>{
            if(res.key === "Successful"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                document.getElementById("snackbar").innerHTML =`Password changed successfully 😄`;
                document.getElementById("snackbar").style.backgroundColor = "#75d06a";
                setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
                setTimeout(function(){location.href="Index.html";}, 2100)  
            }
        })
    }else{
        var x = document.getElementById("snackbar");
        x.className = "show";
        document.getElementById("snackbar").innerHTML =`Password and confirm password must be same`;
        document.getElementById("snackbar").style.backgroundColor = "#ea6262";
        setTimeout(function(){x.className = x.className.replace("show", "");}, 2000);
    }

}
