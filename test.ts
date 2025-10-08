// Define an interface for a user
interface User {
  name: string;
  age: number;
  isAdmin?: boolean; // optional property
}

// Function to greet a user
function greet(user: User): string {
  return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// Create a user object
const alice: User = {
  name: "Alice",
  age: 25,
};

// Call the function
console.log(greet(alice));

// Trying to assign a wrong type will give a compile-time error
// alice.age = "twenty-five"; // ❌ Error: Type 'string' is not assignable to type 'number'
