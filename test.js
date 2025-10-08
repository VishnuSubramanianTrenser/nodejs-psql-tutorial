// Function to greet a user
function greet(user) {
    return "Hello, ".concat(user.name, "! You are ").concat(user.age, " years old.");
}
// Create a user object
var alice = {
    name: "Alice",
    age: 25,
};
// Call the function
console.log(greet(alice));
// Trying to assign a wrong type will give a compile-time error
// alice.age = "twenty-five"; // ❌ Error: Type 'string' is not assignable to type 'number'
