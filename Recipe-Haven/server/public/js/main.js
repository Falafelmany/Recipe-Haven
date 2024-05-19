document.addEventListener('DOMContentLoaded', () => {
    fetch('/recipes')
        .then(response => response.json())
        .then(data => {
            const recipesDiv = document.getElementById('recipes');
            data.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.ingredients}</p>
                    <p>${recipe.instructions}</p>
                `;
                recipesDiv.appendChild(recipeElement);
            });
        });
});
