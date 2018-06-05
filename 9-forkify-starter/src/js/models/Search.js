// SEARCH MODEL

import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
    
        const API_KEY = 'f24fa68facbcce79589fd0fa9454e825';
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        
        try {
            const res = await axios(`${PROXY_URL}http://food2fork.com/api/search?key=${API_KEY}&q=${this.query}`)
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }

}