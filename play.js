const name = 'fernando';
let age = 19;
const hasHobbies = true;

const summarizeUser = () => {
    return (
        'Name is ' + name + ', age is ' + age + ', and user has hobbies: ' + hasHobbies
    );
}

console.log(summarizeUser());

const hobbies = ['Sports', 'Cooking'];

const copiedHobbies = [...hobbies];
console.log(copiedHobbies);

const toArray = (...args) => {
    return args;
}
console.log(toArray(1, 2, 3, 4, 5));
