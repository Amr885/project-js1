let email=document.querySelector("#email")
let password = document.querySelector("#password")
let sign_in = document.querySelector("#sign-in")

let getuseremail = localStorage.getItem("email")

let getuserpass = localStorage.getItem("password")

sign_in.addEventListener("click" , function (y){
    y.preventDefault()
    if(email.value==="" || password.value ===""){
        alert("Please fill it")
    }else{
        if(getuseremail && getuseremail.trim()===email.value.trim() && getuserpass && getuserpass.trim()=== password.value.trim()){
            setTimeout(()=>{
                window.location="index.html"
            },1300)
        }else{
            alert("wrong email or password")
        }
    }
})
    
