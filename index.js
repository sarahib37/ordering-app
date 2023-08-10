import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';





let newMenu = []

let newEditedMenu = []

let total = 0

const paymentForm = document.getElementById('payment-form')





document.addEventListener("click", function(e){
    if (e.target.dataset.plus){
        clickedPlusButton(e.target.dataset.plus)
    }

    if (e.target.dataset.remove){
        clickedRemoveButton(e.target.dataset.remove)
    }

    if (e.target.id === "order-btn"){
        document.getElementById('modal-box').style.display = "block"
    }
})





paymentForm.addEventListener('submit', function(e){
    e.preventDefault()


    const userName = new FormData(paymentForm)
    const name = userName.get('username')
    const orderComplete = document.getElementById('order-complete')

    document.getElementById('modal-box').style.display = "none"
    document.getElementById('checkout1').style.display = "none"
    orderComplete.innerHTML = `
    <div class="order-complete">
        <h1 class="thanks-text">Thanks, ${name}! Your order is on its way!</h1>
    </div>
    `
})


function clickedPlusButton(plus){

    menuArray.forEach(function(menu){
        if (plus == menu.id){
            newMenu.push({
                name: `${menu.name}`,
                price: menu.price,
                id: uuidv4()
            })
        }
    })
    

    renderCheckout()
    total = 0
    
    return newMenu
}



function clickedRemoveButton(remove){
    console.log(newMenu)
  
    newMenu.forEach(function(menu){
        if (!menu.id.includes(remove))
            newEditedMenu.push({
                name: `${menu.name}`,
                price: menu.price,
                id: `${menu.id}`
            })

            
    })

    newMenu = newEditedMenu

    newEditedMenu = []

    renderCheckout()
    total = 0

    return newMenu
    

}

    













function getCheckoutMenu(){
    let orderList = ''
    let menuCheckoutList = ''
    newMenu.forEach(function(menu){

        menuCheckoutList += `
        <div class="second-flex">
            <h2>${menu.name}</h2>
            <button class="remove-btn" data-remove = ${menu.id}>remove</button>
            <h3 class="align-right">$${menu.price}</h3>
        </div>
        `
        total += menu.price
        orderList = `
        <div class="checkout-section">
            <h2 class="title">Your order</h2>
            <div class="checkout1">
                ${menuCheckoutList}
            </div> 
            <div class="checkout2">
                <h2 class="total-price">Total Price:</h2>
                <h3 class="align-right">$${total}</h3>
            </div>
            <button class="order-btn" id="order-btn">Complete order</button>
        </div>
        `

    })

    return orderList
}



function renderCheckout(){
    if(newMenu){
        document.getElementById('checkout1').innerHTML = getCheckoutMenu()
    }
    
}








// default state functions

function getMenu(){
    let menuList = ''

    menuArray.forEach(function(menu){
    
    
        menuList += `
        <div class="flex border-bottom">
            <h1 class="food-img">${menu.emoji}</h1>
            <div class="flex2">
                <h2>${menu.name}</h2>
                <p>${menu.ingredients}</p>
                <h3>$${menu.price}</h3>
            </div>
            <button class="align-right plus-button" data-plus=${menu.id}>+</button>
            
        </div>
        `

        
    });
    
    return menuList 
}





function render(){
    document.getElementById('menu-list').innerHTML = getMenu()
}





render()