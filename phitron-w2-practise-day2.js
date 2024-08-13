// Api Link
const allfood = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    .then(res => res.json())
    .then(food => {
        displayfood(food.meals); 
    })
    .catch(error => console.error('Error:', error));
};

let foodtitle = [];
// Display Cart
const displayfood = (fooditems) => {

    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = ''; 
    
    fooditems.forEach((food) => {
        const div = document.createElement("div");
        div.classList.add("cart");
        document.getElementById("detail-container").style.display = "none";
        div.innerHTML = `        
            <img src="${food.strMealThumb}" alt="${food.strMeal}">
            <h3>${food.strMeal}</h3> 
            <button class="detail" onclick="singleproduct('${food.idMeal}')">Details</button>
        `;
        div.setAttribute('data-meal', food.strMeal.toLowerCase()); 
        foodContainer.appendChild(div);
        foodtitle.push(food.strMeal.toLowerCase());
        
    });
};

// Search Function
document.getElementById("button-action").addEventListener("click", () => {
    const input = document.getElementById("search").value.toLowerCase();
    const foodContainer = document.getElementById("food-container");
    const carts = foodContainer.getElementsByClassName("cart");
    const alertContainer = document.getElementById("not-found");

    alertContainer.innerHTML = ''; 
    
    let anyMatch = false; 
    
    Array.from(carts).forEach(cart => {
        const mealName = cart.getAttribute('data-meal');
        
        if (mealName.includes(input)) {
            cart.style.display = ''; 
            anyMatch = true; 
        } else {
            cart.style.display = 'none'; 
        }
    });
    
    if (!anyMatch) { 
        const alert = document.createElement("h3");
        alert.classList.add("alert-msg");
        alert.textContent = "No food items found!!!!";
        alertContainer.appendChild(alert);
    }
});

// Display Details
const singleproduct = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        const food = data.meals[0];
        const detail = `
            <img src="${food.strMealThumb}" alt="${food.strMeal}" />
            <h2>${food.strMeal}</h2>
            <h3>Category: ${food.strCategory}</h3>
            <h3>Area: ${food.strArea}</h3>
            <p>${food.strInstructions.slice(0,200)}</p>
            <button class="close" onclick="closeDetail()">Close</button>
        `;
        document.getElementById("detail-content").innerHTML = detail;
         
    })
    .catch(error => console.error('Error fetching food details:', error));
    document.getElementById("detail-container").style.display = "block";
};

// Close button
const closeDetail = () => {
    document.getElementById("detail-container").style.display = "none";
};

allfood();






