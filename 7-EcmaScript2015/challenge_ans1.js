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
        return this.trees / this.area;
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

        return classification.get(this.streetLength);
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


// ==========================
//  PARK REPORT
// ==========================
function reportPark(allParks) {

    console.log('------ PARK REPORT ------');

    const parkTotal = allParks.length;
    let parkAges = 0;

    allParks.forEach(curPark => {

        // Add to total park age
        parkAges += curPark.getAge();

        // Loop park data
        console.log(`${curPark.name} has a tree density of ${curPark.trees / curPark.area} trees per square km`);

        if (curPark.trees > 1000) {
            console.log(`${curPark.name} has more than 1000 trees`);
        }
    });

    console.log(`Our ${parkTotal} parks have an average age of ${parkAges / parkTotal} years`);
}


// ==========================
//  STREET REPORT
// ==========================
function reportStreet(streetArr) {
    
    console.log('------ STREET REPORT ------');

    const streetNo = streetArr.size;
    let totalLength = 0;

    streetArr.forEach(curStreet => {
        totalLength += curStreet.streetLength;

        console.log(`${curStreet.name}, built in ${curStreet.year}, is a ${curStreet.sizeClassification()} street`)
    });

    console.log(`Our ${streetNo} streets have a total length of ${totalLength}km, with an average of ${totalLength / streetNo}km.`);

}

// Call report functions
reportPark(allParks);
reportStreet(streetArr);