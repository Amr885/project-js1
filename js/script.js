let userinfo=document.querySelector("#user-info")
let userdata=document.querySelector("#user")

let links=document.querySelector("#links")

if (localStorage.getItem("fname")){
    links.remove()
    userinfo.style.display="flex"
    userdata.innerHTML="Welcome".toLocaleUpperCase()+" "+localStorage.getItem("fname").toLocaleUpperCase()
    userdata.style.marginRight="600px"
    userdata.style.fontSize="20px"
}
// //////////////////////////////////////////////////////////////////////////

let Allproducts = document.querySelector(".products")
let products = productsdb
let cartproductDiv = document.querySelector(".carts-products div")
let badge = document.querySelector(".badge")
let non = document.querySelector(".noproducts")
let drawitems;
(drawitems=function (products=[]){
    let x = products.map((item)=>{
        return `   
              
                    <div class="card-item">
                         <div class="imggg">
                             <img  class="card-img-top product-img-item" src="${item.imgurl}"alt="">
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">product:${item.title}</h5>
                          <p>price :${item.price}</p>
                          <p class="card-text">Category :${item.category}</p>
                        </div>
                         <div class="products-item-action">
                            <button class="add_to_cart" price="${item.price}" onClick="add_to_cart(${item.id})">Add to cart</button>
                            <i class="fa-solid fa-heart"  style="color:${
                        item.liked==true ?'red':""
                    }" onclick="add_to_favorites(${item.id})"></i>
                         </div>
                      </div>     
        `
    })
    Allproducts.innerHTML= x.join("")
})(JSON.parse(localStorage.getItem("products"))|| products)


// search function//////////////////////////////////////////////
let input = document.querySelector(".search-input")

input.addEventListener("keyup",(z)=> {
    
        search(z.target.value, JSON.parse(localStorage.getItem("products")))

    if(z.target.value.trim() ==="")
        drawitems(JSON.parse(localStorage.getItem("products")))
})
   
function search(productsdb,myarray){

    let searchTerm = productsdb.toLowerCase(); // lowercase search

    let arr = myarray.filter((item) => {
        let itemTitle = item.title.toLowerCase();
        let itemCategory = item.category.toLowerCase();

        // Correctly use the searchTerm and indexOf
        return itemTitle.indexOf(searchTerm) !== -1 || 
               itemCategory.indexOf(searchTerm) !== -1; 
    });

    drawitems(arr);
}

// # add_to_cart function//////////////////////////////////////////
let addeditem = localStorage.getItem("products_in_cart")? JSON.parse(localStorage.getItem("products_in_cart")):[];
if(addeditem){
    addeditem.map(item=>{
        cartproductDiv.innerHTML+=`
        <div class="cardtitle bg-bg-light mx-1 d-flex justify-content-between">
                <p class="mt-1 text-dark">${item.title}</p>
                <div class="btns">
                   <span class="sp22 text-success">${item.quantity}</span>
                   <button class="cardbutton text-primary bg-body" onclick = "changequantity(event)">+</button>
                   <button class="cardbutton minus btn-bg-danger text-danger bg-body fs-6" onclick = "changequantity(event)">-</button>
                </div> 
            </div>
        `
    })
    badge.style.display="block"
    badge.innerHTML=addeditem.length
}
//// calculate the price/////////////////////////////////////////////////// 
let total_itm = document.querySelector(".total-price") 
let totalprice = 0
function calcc(){
    totalprice = 0
    addeditem.forEach(function(item){
        totalprice += parseFloat(item.price) * item.quantity
    })
    totalprice.toFixed(2)
}

let additem = document.querySelectorAll(".add_to_cart")
 function add_to_cart(id){
        if(!localStorage.getItem("fname")){
            window.location="register.html";
            return;
        }
        let product = products.find((item)=> item.id === id)

        let check_product = addeditem.some((i)=> i.id === product.id)
        if(check_product){
            addeditem = addeditem.map(p=>{
                if(p.id === product.id)p.quantity+=1
                return p
            })
        }else{
            addeditem.push(product)
        }
        cartproductDiv.innerHTML=""
        addeditem.forEach(item => {
         cartproductDiv.innerHTML +=`
        <div class="cardtitle">
                 <p class="mt-1 text-dark">${item.title}</p>
                  <div class="btns">
                   <span class="sp22 text-success">${item.quantity}</span>
                   <button class="cardbutton text-primary bg-body" onClick="changequantity(event)">+</button>
                   <button class="cardbutton minus btn-bg-danger text-danger bg-body fs-6" onClick="changequantity(event)">-</button>
               </div> 
            </div>
        `
    });
        // addeditem =[...addeditem , choosen_item]
        localStorage.setItem("products_in_cart",JSON.stringify(addeditem))
        let cart_products_length = document.querySelectorAll(".carts-products div p")
        badge.style.display="block"
        badge.innerHTML=cart_products_length.length
        
        calcc()
    }
////////////////////////////////////////////////////////////////////////////////
let shopping_cart = document.querySelector(".arroww")
let cartsProducts = document.querySelector(".carts-products")
shopping_cart.addEventListener("click",opencart)
let rotate =0
function opencart(){
    if(cartproductDiv.innerHTML!=""){
        if(cartsProducts.style.display=="block"){
            cartsProducts.style.display="none"
        }else{
            cartsProducts.style.display="block"
        }
        rotate = rotate + 180
        shopping_cart.style.transform='rotate('+rotate+'deg)'
        shopping_cart.style.transition='.5s'
        
    }
}

/////////////////////////////////////////////////////////////////
// change quantity///////////////
function changequantity(e){
    let count = 1
    let CardTitle = e.target.parentElement.parentElement
    let TITLE = CardTitle.querySelector("p").textContent.trim()
    let productt = addeditem.find(item => item.title === TITLE)

    if (productt){
        if(e.target.textContent==="+"){
            count = productt.quantity + 1
        }else if(e.target.textContent ==="-" && productt.quantity > 1){
            count = productt.quantity - 1
        }else if(e.target.textContent === "-" && productt.quantity === 1){
            addeditem.splice(addeditem.indexOf(productt),1)
            CardTitle.remove()
            localStorage.setItem("products_in_cart",JSON.stringify(addeditem))
            badge.innerHTML=addeditem.length
            if(addeditem.length===0){
                badge.style.display = "none"
            }         
        }
        productt.quantity = count;
        CardTitle.querySelector(".sp22").textContent=count;
        localStorage.setItem("products_in_cart",JSON.stringify(addeditem));
        badge.innerHTML = addeditem.length;

        calcc();
    }

}
calcc();

// Add to favorites
let favorite_item = localStorage.getItem("products_in_favorite")? JSON.parse(localStorage.getItem("products_in_favorite")):[]
function add_to_favorites(id){
    if(!localStorage.getItem("fname")){
        window.location="register.html"
        return
    }
        let product = products.find((item)=> item.id === id)
        let checkfavorites = favorite_item.some((i)=>i.id===product.id)
        if(checkfavorites){
           favorite_item= favorite_item.map(p=>{
            if(p.id === product.id)p.quantity+=1
            return p
           })
        }else{
            favorite_item.push(product)
        }  
        localStorage.setItem("products_in_favorite",JSON.stringify(favorite_item))
        products.map(item=>{
            if(item.id === product.id){
                item.liked=true
            }
        })
        localStorage.setItem("products",JSON.stringify(products))
        drawitems(products)    
}
