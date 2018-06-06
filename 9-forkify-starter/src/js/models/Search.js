// SEARCH MODEL

import axios from 'axios';
import { API_KEY, PROXY_URL } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {

        
        try {
            const res = await axios(`${PROXY_URL}http://food2fork.com/api/search?key=${API_KEY}&q=${this.query}`)
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }

}