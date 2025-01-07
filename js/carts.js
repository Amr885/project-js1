let ALLproducts = document.querySelector(".products")
let total_itm = document.querySelector(".total-price") 
let totalprice = 0
let favoritee = document.querySelector(".slider-wrapper .swiper-wrapper")
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor:true,
  spaceBetween:20,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:'true',
    dynamicBullets:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // responsive breakpoints
  breakpoints:{
    0:{
      slidesPerview:1
    },
    620:{
      slidesPerview:2
    },
    1024:{
      slidesPerview:3
    },
  }
});
function drawproducts(allproducts=[]){
    let products = JSON.parse(localStorage.getItem("products_in_cart"))|| allproducts
    let y = products.map((item)=>{
        return  `
        <div class="container m-auto"
          <div class="card mb-3 " style="max-width: 540px;">
            <div class="row g-0 cardd mt-5">
                 <div class="col-md-4">
                      <img src="${item.imgurl}" class="img-fluid px-3 pt-3 pb-3 mx-3 mt-3 mb-3 bg-light rounded-2" alt="...">
                 </div>
                <div class="col-md-8">
                  <div class="card-body cardd2">
                         <h5 class="card-title">product: ${item.title}</h5>
                         <p class="card-text">category: ${item.category}</p>
                         <p class="card-text">price: ${item.price}</p>
                 
                    <div class="products-item-action mt-4 px-4">
                            <p class="text-success">
                            ${item.quantity}
                            <button class="cardbutton text-primary btn5" onclick = "changequantityy(${item.id},'+')">+</button>
                            <button class="cardbutton minus btn-bg-danger text-danger fs-6 btn5" onclick = "changequantityy(${item.id},'-')">-</button>
                            </p>
                            
                            <button class="add_to_cart bg-danger text-light" onClick="Remove(${item.id})">Remove</button>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </div> 
     `
    })
    ALLproducts.innerHTML = y.join("")
    calcc()
}
function calcc(){
    totalprice = 0
    let products = JSON.parse(localStorage.getItem("products_in_cart"))|| []
    products.forEach(function(item){
        totalprice += parseFloat(item.price) * item.quantity
    })
    total_itm.innerHTML = "Total Price = $" + totalprice.toFixed(2)
}

/////////////////////////////////////////////////////////////////
function changequantityy(id , event){
  let products = JSON.parse(localStorage.getItem("products_in_cart"))|| []
  let productpdate = products.map((product)=>{
    if (product.id === id){
      if(event === "+"){
        product.quantity+=1
      }else if(event === "-" && product.quantity >1){
        product.quantity-=1
      }
    }
    return product
  })
  localStorage.setItem("products_in_cart",JSON.stringify(productpdate))
  drawproducts(productpdate)
}

////////////////////////////Remove function///////////////////////////////
function Remove(id){
  let productsincart = localStorage.getItem("products_in_cart")
 if(productsincart){
  let items = JSON.parse(productsincart)
  let filtereditems = items.filter(item=> item.id !== id );
  localStorage.setItem("products_in_cart",JSON.stringify(filtereditems))
  drawproducts(filtereditems)
 }
}


////////////////////////////////////////////////////////////////////////////////


//Draw favorites//////

function drawforiteproducts(Swip=[]){
  let products = JSON.parse(localStorage.getItem("products_in_favorite"))|| Swip
  let y = products.map((item)=>{
      return  `
                  <div class="card-item itm swiper-slide">      
                      <img src="${item.imgurl}" class="user-img" alt="...">
                      <p class="card-title">product: ${item.title}</p>
                      <p class="card-text">category: ${item.category}</p>
                      <i class="fa-solid fa-heart text-danger fs-5" onclick="removefromfav(${item.id})"></i>
                 </div>
           
   `
  })
  favoritee.innerHTML=y.join("")
  swiper.update()
}

function removefromfav(id){
  let productsincart = localStorage.getItem("products_in_favorite")
 if(productsincart){
  let items = JSON.parse(productsincart)
  let filtereditems = items.filter(item=> item.id !== id );
  localStorage.setItem("products_in_favorite",JSON.stringify(filtereditems))
  drawforiteproducts(filtereditems)
 }
}
drawproducts()
drawforiteproducts()


