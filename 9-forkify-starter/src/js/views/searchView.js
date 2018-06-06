// Search View
import { elements } from './base';
 
export const getInput = () => elements.searchInput.value;

// Wrap in brackets to avoid implicit 'return'
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = (id) => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })

    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
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

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? "left" : "right"}"></use>
        </svg>
    </button>`;


const renderButtons = (page, numOfResults, resPerPage) => {
    const pages = Math.ceil(numOfResults / resPerPage);
    
    let button;

    if (page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next');
    } else if (page === pages && pages > 1) {
        // Button to go to prev page
        button = createButton(page, 'prev');
    } else {
        // Both buttons appear
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage; 

    recipes.slice(start, end).forEach(renderRecipe);   

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage) 
};