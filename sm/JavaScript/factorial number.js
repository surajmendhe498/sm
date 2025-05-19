function factorialNumber(num){
    if(num < 0) return "Factorial is not defined for negative numbers";

    let fact= 1;

    for(let i=1;i<=num; i++){
        fact *= i; 
    }
    return fact;
}

console.log(factorialNumber(5));
