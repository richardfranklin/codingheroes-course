import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);

        // [2,4,8] splice(1, 1); Returns 4, original array is [2, 8]
        // [2,4,8] slice(1, 2); Returns 4, original array will not mutate = [2,4,8]

        // Remove 1 element at position index
        this.items.splice(index, 1);
    }   

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    deleteAllItems() {
        this.items = [];
    }
}