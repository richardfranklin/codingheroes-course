// RECIPE MODEL

import axios from 'axios';
import { API_KEY, PROXY_URL } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${PROXY_URL}http://food2fork.com/api/get?key=${API_KEY}&rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error) {
            console.log(error);
            alert('Something went wrong.');
        }
    }

    calcTime() {
        // Assume for every 3 ingredients, we need 15 minutes
        const numOfIngredients = this.ingredients.length;
        const period = Math.ceil(numOfIngredients / 3);
        this.time = period * 15; 
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']

        const newingredients = this.ingredients.map(el => {
            // 1. uniform units
            let ingredient = el.toLowerCase();
            
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            });

            // 2. Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                // There is a unit
                // e.g. 4 1/2 cup, arrCount = [4, 1/2]
                // e.g. 4 cup, arrCount = [4]
                const arrCount = parseInt(arrIng.slice(0, unitIndex)); 
                let count;

                if (arrCount.length === 1) {
                    count = arrIng[0].replace('-', '+');
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); // --> eval("4+1/2") = 4.5
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                // There is no unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };

            } else if (unitIndex === -1) {
                // There is NO unit, and NO number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient 
                }
            }

            return objIng;
        });

        this.ingredients = newingredients;
    }
} 