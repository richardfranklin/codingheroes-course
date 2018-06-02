////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture is about let and const

// ES5
var name5 = 'Jane Smith';
var age5 = 23;

name5 = 'Jane Miller';
// console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23

// name6 = 'Jane Miller';
// console.log(name6);



// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        // console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    // console.log(firstName + ', born in ' + yearOfBirth + ' is now officially allowed to drive a car');
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {

    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }

    // console.log(firstName + ', born in ' + yearOfBirth + ' is now officially allowed to drive a car');    
}

driversLicense6(true);


// i is blockscoped
let i = 23;

for (let i = 0; i < 5; i++) {
    // console.log(i);
}

// console.log(i);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blocks and IIFEs

{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b);
// console.log(c);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: string

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge(year) {
    return 2016 - year;
}

// ES5
// console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth));

// ES6
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)}`);

const n = `${firstName} ${lastName}`;

// console.log(n.startsWith('J'));
// console.log(n.endsWith('h'));
// console.log(n.includes(' '));
// console.log(n);

// console.log(`${firstName} `.repeat(5));

const years = [1990, 1965, 1982, 1937];

var ages5 = years.map(function(el) {
    return 2018 - el;
});

// console.log(ages5);

let ages6 = years.map(el => 2018 - el);
// console.log(ages6);

ages6 = years.map((el, index) => `Age Element ${index + 1}: ${2016 - el}.` );

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age Element ${index + 1}: ${age}.`
});

// console.log(ages6);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: Arrow functions - lexical this variable

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number' + self.position + ' and it is ' + self.color
            console.log(str);
        });
    }
};

// box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            const str = 'This is box number' + this.position + ' and it is ' + this.color
            console.log(str);
        });
    }
};

// box6.clickMe();

const box66 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            const str = 'This is box number' + this.position + ' and it is ' + this.color
            console.log(str);
        });
    }
};

// box66.clickMe();

function Person(name) {
    this.name = name;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// ES5 prototype method
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));

    // console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends5(friends);


/////////////////////////////////////////////////////////////////////////////////////////////////
// ES6 prototype method
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    //console.log(arr);
};

new Person('Bob').myFriends6(friends);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Destructuring

// ES5
var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6

// From an Array
const [name, age] = ['Bob', 29];
// console.log(name);
// console.log(age);


const obj = {
    desFirstName: 'John',
    desLastName: 'Smith'
}
// From an Object
const {desFirstName, desLastName} = obj;

// console.log(desFirstName);
// console.log(desLastName);

const { desFirstName: a, desLastName: b } = obj;

// console.log(a, b);


// From a Function
function calcAgeOfRetirement(year) {
    const age2 = new Date().getFullYear() - year;
    return [age2, 65 - age2];
}

const [age2, retirement] = calcAgeOfRetirement(1990);
// console.log(age2);
// console.log(retirement);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll('.box');

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(cur) {
//     cur.style.backgroundColor = 'dodgerblue';
// })

// ES6
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');


// Change text depending on element class

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);

// for (var j = 0; j < boxesArr5.length; j++) {
//     if (boxesArr5[j].className === 'box blue') {
//         continue;
//     }

//     boxesArr5[j].textContent = 'I changed to blue';
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ES6 (for of loop)
const boxesArray6 = Array.from(boxes);

for (const cur of boxesArray6) {
    if (cur.className.includes('blue')) {
        continue;
    }

    cur.textContent = 'I changed to blue';
}


// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full5 = ages5.map(function(cur){ 
    return cur >= 18;
});

//console.log(ages[full5.indexOf(true)]);


// ES6
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: Spread operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(4, 10, 34, 42);

// Pass Array into above function
// ES5 

var ages = [4, 10, 34, 42];

var sum2 = addFourAges.apply(null, ages); // splits the array up into deparate value
// console.log(sum2); // Correct

// ES6
const max3 = addFourAges(...ages);
// console.log(max3);

// Joining arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Anne'];

const bigFamily = [...familySmith,  ...familyMiller];

// console.log(bigFamily);

// Spread nodelists
const h = document.querySelector('h1');
const boxesNew = document.querySelectorAll('.box');
const all = [h, ...boxesNew];

all.forEach(cur => {
    cur.style.color = "green";
})



//////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: Rest parameters

// ES5
function isFullAge5(limit) {
    var argsArray = Array.prototype.slice.call(arguments, 1);
    
    argsArray.forEach(function(curr) {
        console.log((2018 - curr) >= 18);
    })
}

//isFullAge5(18, 1965, 2010, 2004, 1954, 1986);

//console.log('____________');

// ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2018 - cur) >= limit));
}

//isFullAge6(18, 1965, 2010, 2004, 1954, 1986);


///////////////////////////////////////////////////
// Lecture: Default parameters

// ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'Welsh' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson5('John', 1990);
var emily = new SmithPerson5('Emily', 1988, 'Enrique', 'Spanish');

// console.log(emily);

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'Welsh') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var mike = new SmithPerson6('Mike', 1966);
// console.log(mike);


///////////////////////////////////////////////////
// Lecture: ES6 MAPS

const question = new Map();

// console.log(question);

question.set('question', 'What is the official name of the latest major Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong, please try again');

// console.log(question.get('question'));
//console.log(question.size);

if (question.has(4)) {
    //console.log('Answer 4 is here');
}

// question.clear();
// console.log(question);

question.forEach((value, key) => {
    // console.log(`This is ${key}, and it's set to ${value}`);
});

for (let [key, value] of question.entries()) {
    //console.log(`This is ${key}, and it's set to ${value}`);
    if (typeof key === 'number') {
        // console.log(`Answer ${key}: ${value}`);
    }
}

// const ans = parseInt(prompt('Write the correct answer'));

// console.log(question.get(question.get('correct') === ans));



///////////////////////////////////////////////////////////////////
// Lecture: Classes

// ES5
var PersonClass5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

PersonClass5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var bobby = new PersonClass5('Bobby', 1975, 'Driver');

bobby.calculateAge();

// ES6
// IS THE SAME AS.....
// classes are NOT HOISTED
// Can only add methods, not properties
class PersonClass6 {
    constructor(name, yearOfBirth, job = `salesman`) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    // Static method which ISN'T available to the inherited objects
    static greeting() {
        console.log(`Hey there!`);
    }
}

const harry = new PersonClass6('Harry', 1970);

// console.log(harry);

// harry.calculateAge();

// Class' static method
// PersonClass6.greeting();


///////////////////////////////////////////////////////////////////
// Lecture: Inheritance between classes (using sub classes)

// ES5
var PersonClass5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

PersonClass5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    PersonClass5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

// Assign Athlete5's prototype as the PersonClass5 prototype
Athlete5.prototype = Object.create(PersonClass5.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals ++;
    console.log(this.medals);
}

var percy = new Athlete5('John', 1990, 'Swimmer', 3, 10);

// percy.calculateAge();
// percy.wonMedal();
// percy.wonMedal();
// percy.wonMedal();


// ES6
class PersonClassInherit6 {
    constructor(name, yearOfBirth, job = `salesman`) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class AthleteClassInherit6 extends PersonClassInherit6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        // bring in properties from super-class
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals ++;
        console.log(this.medals);
    }
}

const bertie = new AthleteClassInherit6('Bertie', 1970, 'Runner', 4, 6);
// bertie.addMedal();
// bertie.addMedal();
// bertie.addMedal();