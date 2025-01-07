let fname =document.querySelector("#firstname")
let lname =document.querySelector("#lastname")
let email =document.querySelector("#email")
let password =document.querySelector("#password")

let registerbtn =document.querySelector("#sign-up")

registerbtn.addEventListener("click",function(e){
    e.preventDefault()
    if(fname.value ==="" || lname.value ==="" || email.value ==="" ||  password.value ===""){
        alert("Please fill it")
    }else{
        localStorage.setItem("fname",fname.value)
        localStorage.setItem("lname",lname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)

          
    setTimeout(()=>{
        window.location="login.html"
    },1500)
  }
  
})