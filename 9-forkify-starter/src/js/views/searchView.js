// Search View
import { elements } from './base';
 
export const getInput = () => elements.searchInput.value;

// Wrap in brackets to avoid implicit 'return'
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

// e.g. 'Pasta with tomato and spinach'
// acc: 0  -->  acc + cur = 5  --> newTitle = ['Pasta']
// acc: 5  -->  acc + cur = 9  --> newTitle = ['Pasta', 'with']
// acc: 9  -->  acc + cur = 15  --> newTitle = ['Pasta', 'with', 'tomato']
// acc: 15  -->  acc + cur = 18  --> newTitle = ['Pasta', 'with', 'tomato'] ... word not pushed into title, loop ends

const limitRecipeTitle = (title, limit = 17) => {
    // const allows for its array to change as this isn't a variable mutation
    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0) ;

        // Return the result
        return `${newTitle.join(' ')}...`;
    }

    return title;
};

export const renderResults = recipes => {
    // Receive array of 30 recipes. Loop through

    const renderRecipe = recipe => {
        const markup = `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;

        elements.searchResList.insertAdjacentHTML('beforeend', markup);
    };

    recipes.forEach(renderRecipe);
};