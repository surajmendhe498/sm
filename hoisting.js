// let hoisting;

// console.log(hoisting);
// hoisting= 'This is a hoisting function';

// console.log(hoisting);


hoisting();

function hoisting(){
    console.log('This is the a hoisting function');
}

// Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top 
// of their containing scope during the compile phase. 
// This means you can use variables and functions before they are declared in the code. 
// However, only the declarations are hoisted, not the initializations.

