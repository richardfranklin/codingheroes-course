// Suppose that you're working in a small town administration, and you're in charge of two town elements: 1. Parks 2. Streets 
//It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year. 
// At an end-of-year meeting, your boss wants a final report with the following: 1. Tree density of each park in the town (forumla: number of trees/park area) 2. Average age of each town's park (forumla: sum of all ages/number of parks) 3. The name of the park that has more than 1000 trees 4. Total and average length of the town's streets 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal 
// All the report data should be printed to the console. 
// HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc. 


// PARKS (3)
//      *NAME
//      *YEAR
//      No. of Trees
//      Area
//
//      Tree density method
//      Park age method
//

// STREETS (4)
//      *NAME
//      *YEAR
//      Length
//
//      classification method


class Element {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    getAge() {
        return new Date().getFullYear() - this.year;
    }
}


class Park extends Element {
    constructor(name, year, trees, area) {
        super(name, year);
        this.trees = trees;
        this.area = area;
    }

    treeDensity() {
        console.log(`${this.name} has a tree density of ${this.trees / this.area} trees per square km`);
    }
}

class Street extends Element {
    constructor(name, year, streetLength = 3) {
        super(name, year);
        this.streetLength = streetLength;
    }

    sizeClassification() {

        const streetLength = this.streetLength;
        const classification = new Map();

        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'medium');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`${this.name} is a ${classification.get(this.streetLength)} street.`);
    }
}

// PARK / STREE LISTS
const allParks = [
    new Park('Green Park', 1965, 420, 10),
    new Park('National Park', 1930, 1230, 25),
    new Park('Oak Park', 1979, 830, 8)
];

const streetArr = [
    new Street('Ocean Avenue', 1890, 2),
    new Street('Evergreen Street', 1949, 1),
    new Street('4th Street', 1921, 5),
    new Street('Sunset Boulevard', 1982)
];


function calc(arr) {
    const sum = arr.reduce((prev, cur) => prev + cur, 0);

    // Return sum and average
    return [sum, sum / arr.length];

}

// ==========================
//  PARK REPORT
// ==========================
function reportPark(p) {

    console.log('------ PARK REPORT ------');

    // Density
    p.forEach(currPark => currPark.treeDensity());

    // Average Age
    const ageArray = p.map(cur => cur.getAge());

    // This const array aligns with the array returned by the calc function
    const [totalAge, averageAge] = calc(ageArray);

    console.log(`Our ${p.length} parks have an average age of ${averageAge} years`);

    // Which park has more than 1000 trees
    const treesOverThousand = p.map(cur => cur.trees).findIndex(el => el > 1000);

    // or...
    // const parkOverThousandTrees = p[p.findIndex(el => el.trees > 1000)].name;
    
     console.log(`${p[treesOverThousand].name} has over 1000 trees`);
}


// ==========================
//  STREET REPORT
// ==========================
function reportStreet(s) {
    
    console.log('------ STREET REPORT ------');

    // Total streets with total length and average length
    const streetLengthArr = s.map(cur => cur.streetLength);
    const [totalStreetLength, averageStreetLength] = calc(streetLengthArr);

    console.log(`Our ${s.length} streets have a total length of ${totalStreetLength}km, with an average of ${averageStreetLength}km.`);

    // Clasification
    s.forEach(cur => {
        cur.sizeClassification();
    })
}

// Call report functions
reportPark(allParks);
reportStreet(streetArr);