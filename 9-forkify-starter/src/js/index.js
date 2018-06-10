// CONTROLLER

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';

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
    LIST CONTROLLER
*/
const controlList = () => {
    // 1. Create a new list, if there isn't one yet
    if (!state.list) state.list = new List();

    // 2. Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    console.log(e);

    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id)
    } 
    // Handle the count update
    else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

elements.shoppingContainer.addEventListener('click', e => {
    // Handle delete all items
    if (e.target.matches('.shopping__list__delete')) {
        listView.deleteAllItems();
    }
})


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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        }
        catch(err) {
            console.log(err);
            alert(err);
        } 

    }
}

/*
    LIKE CONTROLLER
*/


const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const curID = state.recipe.id;

    
    if (!state.likes.isLiked(curID)) {
        // User has not yet liked current recipe
        // 1. Add new like to state
        const newLike = state.likes.addLike(
            curID, 
            state.recipe.title, 
            state.recipe.author, 
            state.recipe.img
        );

        // 2. Toggle the like button
        likesView.toggleLikeBtn(true);

        // 3. Add like to UI list
        likesView.renderLike(newLike);

    } else {
        // User has liked current recipe
        
        // 1. Remove like from state
        state.likes.deleteLike(curID);

        // 2. Remove like from UI list
        likesView.toggleLikeBtn(false);        
        likesView.deleteLike(curID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render recipes in menu
    state.likes.likes.forEach(like => likesView.renderLike(like));
})


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');   
        recipeView.updateServingsIngredients(state.recipe);  
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});