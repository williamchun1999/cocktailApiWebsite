//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const drinkName = document.querySelector('h2');
const drinkPhoto = document.querySelector('img');
const drinkDesc = document.querySelector('h3');
let drinks;
const timer = ms => new Promise(res => setTimeout(res, ms));
const showDrink = (name, image, desc) => {
    drinkName.innerText = name;
    drinkPhoto.src = image;
    drinkDesc.innerText = desc;
}
let flag = true;
const getDrink = (event) => {
    event.currentTarget.style.display = 'none';
    let drink = document.querySelector('input').value;
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink)
    .then(res => res.json())
    .then(data => {
        drinks = data.drinks;
        
        async function rotate () {
                for (let i = 0; i < drinks.length; i++){
                    if (flag){
                        showDrink(drinks[i].strDrink, drinks[i].strDrinkThumb, drinks[i].strInstructions);
                        
                    }
                    if (i === (drinks.length - 1)){
                        i = 0;
                    }
                    await timer(2000);
                }
            }
        rotate();
    })
    .catch(err => {
        console.log(`error ${err}`);
    })
}
const toggleDrinks = () => {
    flag = !flag;
}
document.querySelector('#toggle').addEventListener('click', toggleDrinks);
document.querySelector('#start').addEventListener('click', getDrink);


