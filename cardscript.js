fetch('./recipes.json') 
.then((response) => response.json())
.then((data) => {

    //get container for recipecards
    const cardbox = document.querySelector("#cardbox");
    const recipeDisplayCard = document.querySelector("#recipe-display-card");

    //for each array item in json
    Object.keys(data).forEach(function(item,index){
        //create sections for recipe categories
        //item is each array in json
        const newSection = document.createElement("div");
        newSection.id = item + "-section";
        newSection.classList.add("carbox-section");
        cardbox.appendChild(newSection);

        //create section card
        const newSectionCard = document.createElement("div");
        newSectionCard.id = item + "-card";
        newSectionCard.classList.add("section-card");
        newSection.appendChild(newSectionCard);
        const newCardTab = document.createElement("div");
        newCardTab.classList.add("card-tab");
        newSectionCard.appendChild(newCardTab);
        for(let i=0;i<3;i++){
            const newCardEmptyTab = document.createElement("div");
            newCardEmptyTab.classList.add("card-empty-tab");
            newSectionCard.appendChild(newCardEmptyTab);
        };
        const newCardContent = document.createElement("div");
        newCardContent.classList.add("card-content");
        newSectionCard.appendChild(newCardContent);
        const newCardTabTitle = document.createElement("p");
        newCardTabTitle.innerHTML = item;
        newCardTab.appendChild(newCardTabTitle);
        //add click to section card tab
        newCardTab.addEventListener('click', ()=>{
            openSection(item);
        })

        let vals = Object.values(data)[index];
        vals.forEach((function(item,index){
            let newRecipeCard = document.createElement('div');
            newSection.appendChild(newRecipeCard);
            newRecipeCard.classList.add("recipe-card");
            let newRecipeTitle = document.createElement("p")
            newRecipeTitle.textContent = item.dish;
            newRecipeCard.appendChild(newRecipeTitle);
            newRecipeCard.addEventListener('click', ()=>{
                // recipeDisplayCard.style.visibility = "visible";
                openRecipe(item,index);
            })
        }))
    })
});

function openSection(item){
    let thisSection = document.querySelector(`#${item}-section`);
    for(const child of thisSection.children){
        if(child.classList.contains("open-section")){
            child.classList.remove("open-section");
        }else{
            child.classList.add("open-section");
        }
    }
}

function openRecipe(item, index){
    const recipeTitle = document.querySelector("#recipe-title");
    const recipeAuthor = document.querySelector("#recipe-author");
    const recipeDescription = document.querySelector("#recipe-description");
    const ingredientsList = document.querySelector("#ingredients-list");
    const instructionsList = document.querySelector("#instructions-list");

    recipeTitle.textContent = item.dish;
    recipeAuthor.textContent = `By: ${item.author}`;
    recipeDescription.textContent = item.description;

    removeAllChild(ingredientsList);
    removeAllChild(instructionsList);

    
    if(item.ingredients.length > 0){
        item.ingredients.forEach((thing)=>{
            let ingredient = document.createElement('li');
            ingredient.innerHTML = thing;
            ingredientsList.appendChild(ingredient);
        })
    }else{
        let ingredient = document.createElement('li');
        ingredient.textContent = "no ingredients :)";
        ingredientsList.appendChild(ingredient);
        // ingredientsTitle.style.display = "none";
    }
    if(item.instructions.length > 0){
        item.instructions.forEach((thing)=>{
            let instruction = document.createElement('li');
            instruction.innerHTML = thing;
            instructionsList.appendChild(instruction);
        })
    }else{
        let instruction = document.createElement('li');
        instruction.textContent = "no instructions :)";
        instructionsList.appendChild(instruction);
    }
}

function removeAllChild(node){
    const parent = node;
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }

}