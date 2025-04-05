const person = {
    name: 'Alice',
    greet: function() {
      console.log('Hello, ' + this.name);
    }
  };
  
  person.greet(); // Output: Hello, Alice
  
  
//  We use the this keyword to refer to the object that is currently executing the code,
//  often within methods to access properties and other methods of that object.  