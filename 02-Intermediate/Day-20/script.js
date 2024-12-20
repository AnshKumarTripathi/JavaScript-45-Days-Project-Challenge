async function findRecipes() {
  const ingredientInput = document.getElementById("ingredient").value;
  const apiKey = "api";
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}&number=10&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayRecipes(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}">
          <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
          <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
          <a href="https://spoonacular.com/recipes/${recipe.title
            .replace(/\s+/g, "-")
            .toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
      `;
    recipesContainer.appendChild(recipeElement);
  });
}
