function main(){
    const name= "suraj mendhe";

    function displayName(){   // displayname is a inner function, a closure
        console.log(name);
    }
    displayName();
}

main();


// A closure is a feature in JavaScript where an inner function has access to variables in its outer (enclosing) function's scope.
