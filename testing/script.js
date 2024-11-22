fetch('./recipes.json') 
.then((response) => response.json())
.then((data) => {
    // console.log(data);
    const menu = document.querySelector("#menu");

    Object.keys(data).forEach(function(item,index){
        //create a new div(sectionlist) with id # item
        //append that new div(sectionlist) child to menu
        const newSection = document.createElement("div");
        newSection.id = "#" + item;
        menu.appendChild(newSection);

        //add title to menu section
        const newH1 = document.createElement("h1");
        newH1.innerHTML = item;
        newSection.appendChild(newH1);

        //add ul to menu section
        const newUl = document.createElement("ul");
        newSection.appendChild(newUl);
        let vals = Object.values(data)[index];
        
        //fill in menu items and add click
        vals.forEach((function(item,index){
            let newItem = document.createElement('li');
            newItem.textContent = item.dish;
            newSection.lastElementChild.appendChild(newItem);
            newItem.addEventListener('click', ()=>{
                openRecipe(item,index);
                // console.log("ok;")
            })
        }))
    })
});

const recipeCard = document.querySelector("#recipe-card");

function openRecipe(item){
    const ingredientsTitle = document.querySelector("#ingredients-title");
    const ingredientsList = document.querySelector("#ingredients");
    const instructionsList = document.querySelector("#instructions");
    recipeCard.style.visibility = "visible";
    document.querySelector("#dish").innerHTML = item.dish;
    document.querySelector("#author").innerHTML = item.author;
    const descriptionContainer = document.querySelector("#description");
    if(Array.isArray(item.description)){
        descriptionContainer.innerHTML = "";
        item.description.forEach(thing => {
            descriptionContainer.innerHTML += thing + "<br />";
        });
    }else{
        descriptionContainer.innerHTML = item.description;
    }

    removeAllChild(ingredientsList);
    removeAllChild(instructionsList);

    if(item.ingredients.length > 0){
        ingredientsTitle.style.display = "block";
        item.ingredients.forEach((thing)=>{
            let ingredient = document.createElement('li');
            ingredient.innerHTML = thing;
            ingredientsList.appendChild(ingredient);
        })
    }else{
        ingredientsTitle.style.display = "none";
    }
    item.instructions.forEach((thing) => {
        let instruction = document.createElement('li');
        instruction.innerHTML = thing;
        instructionsList.appendChild(instruction);
    })
    // console.log(recipeData);
}

function removeAllChild(node){
    const parent = node;
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }

}

const dragElement = (element) => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseUp = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      element.style.boxShadow = "1px 1px 2px rgba(0, 0, 0, .2)";
    };

    const dragMouseMove = (event) => {
      event.preventDefault();

      pos1 = pos3 - event.clientX;
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;

      element.style.top = `${element.offsetTop - pos2}px`;
      element.style.left = `${element.offsetLeft - pos1}px`;
    };

    const dragMouseDown = (event) => {
      event.preventDefault();

      pos3 = event.clientX;
      pos4 = event.clientY;

      document.onmouseup = dragMouseUp;
      document.onmousemove = dragMouseMove;
      element.style.boxShadow = "1px 5px 15px rgba(0, 0, 0, 0.2)";

    };

    element.onmousedown = dragMouseDown;
  };

dragElement(recipeCard);
