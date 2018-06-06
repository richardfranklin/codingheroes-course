// CONTROLLER

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* 
Global state of the app
    - Search object
    - Current recipe object
    - Shopping list object
    - Liked recipes 
*/
const state = {};

/*
    SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1. get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object, add to state
        state.search = new Search(query);

        // 3. Prepare UI for results (Clear previous results etc.)
        searchView.getInput();
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

  
        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5.Render results on UI 
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch(err) {
            clearLoader();
            alert('Error processing search');
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
});


/*
    RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.slice(1);

    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);            
        }

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data 
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch(err) {
            alert(err);
        } 

        

    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));