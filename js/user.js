let user_info = document.querySelector("#user-info")
let user_data = document.querySelector("#user")
let logoutbtn = document.querySelector("#logout")

let username = localStorage.getItem("fname")
if(username){
    user_info.style.display="flex"
    // user_data.innerHTML=username
}

logoutbtn.addEventListener("click" , function(){
    localStorage.clear()
    setTimeout(()=>{
        window.location="register.html"
    },1100)
})
