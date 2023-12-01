// selecting divs 
var randomDiv = document.querySelector(".Random-img")
var imageCollection = document.querySelector(".search-collection")
var cross = document.querySelector("#crossImg")
var mainingri = document.getElementById("mainingri")
// creating function that move the page top{scroll up}
function Top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// creating middle name function that scroll page at middle
function middle(){
    window.scrollBy(0,1000);

}
// generating random image
async function Random(){
    try{
        var res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        var data = await res.json()
        console.log(data);
        // selectiong meals
        var foodName = data.meals[0].strCategory
        var image = data.meals[0].strMealThumb
        var meal = data.meals[0]
        randomDiv.innerHTML = `<div class="random-imgs">
        <img src="${image}" alt="" id="rdImg">
        <p id="desc">${foodName}</p>
    </div>`
    // if user click on image ingridents generate
        randomDiv.addEventListener('click',function(){
            var ol = document.createElement('ol')
            ol.classList.add('ol')
            // taking ranges of ingridents
            for(let i=1 ; i<=20; i++){
                var ingrident = meal[`strIngredient${i}`]
                var measure = meal[`strMeasure${i}`]
                // if ingridents and measure have value then if will run
                if(ingrident && measure){
                    var li = document.createElement('li')
                    li.classList.add('li')
                    li.textContent = `${ingrident} : ${measure}`
                    ol.appendChild(li)
                }
            }
            // creating elemnts and appending all the values
            var ingriImagee = meal.strMealThumb
            var crossimg = document.createElement('img')
            crossimg.setAttribute("id","crossImg")
            crossimg.src="Group 49.png"
            mainingri.appendChild(crossimg)
            mainingri.appendChild(ol)
            var ingriImage = document.createElement('img')
            ingriImage.classList.add('ingriImg')
            ingriImage.src = ingriImagee
            ingriImage.alt = ingriImagee
            mainingri.appendChild(ingriImage)
            mainingri.style.display="block"
            // if we click on cross image the div will be closed
            crossimg.addEventListener('click', function(){
                mainingri.style.display="none"
                mainingri.innerText=""
            })
        })
    }
    catch(err){
        console.log(err);
    }
}
Random()

// iw will generate images based on user search
async function Search(){
    try{
        imageCollection.innerHTML = ""
        var btn = document.getElementById("btn")
        var inputSearch = document.querySelector("#search-input")
        var inpValue = inputSearch.value
        var res2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inpValue}`)
        var data2 = await res2.json()
        var data3 = data2.meals
        var meal2 = data2.meals[0]

        // if inpvalue will be empty then unner html will be empty 
        if(inpValue==""){
            searchTextResult.innerHTML=""
            Random()
        }else{
            // now it will create a photos of all food related to user search 
            for(let i=0; i<data3.length;i++){
                var totalNumerOfFood = i+1
                var mealCollection = document.createElement("div")
                mealCollection.classList.add("mealcollection")
                var imaGe = document.createElement("img")
                imaGe.setAttribute("class","imgsize")
                imaGe.src = data3[i].strMealThumb
                imaGe.alt = data3[i].strMeal
                var foodName = document.createElement('p')
                foodName.classList.add("FoodName")
                foodName.innerText = data3[i].strMeal
                mealCollection.appendChild(imaGe)
                mealCollection.appendChild(foodName)
                imageCollection.appendChild(mealCollection)
            }
            if(inpValue==""){
                searchTextResult.innerText=""
            }else{
                var searchTextResult = document.querySelector(".searchTextResult")
                searchTextResult.innerHTML = `<p id="message">(${totalNumerOfFood}) Result found for ${inpValue} -</p>`
            }
        }
    }
    catch(errr){
        console.log(errr);
    }
    
}
// if there is no searcb in input box then the old data will be deleted after clicking on button 
btn.addEventListener('click', function(){
    randomDiv.innerHTML = ""
    imageCollection.scrollIntoView({behavior:"smooth"})
    Search()
})