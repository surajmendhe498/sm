function checkPrime(num){
    if(num <= 1) return false;

    for(let i=2; i<=Math.sqrt(num); i++){
        if( num%i == 0) return false;
    }
    return true;
}

console.log(checkPrime(19));


/*
function printPrimes(limit) {
    for (let num = 2; num <= limit; num++) {
        let isPrime = true;

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                isPrime = false;
                break; // Exit the loop if the number is not prime
            }
        }

        if (isPrime) {
            console.log(num); // Print the prime number
        }
    }
}

printPrimes(20);
*/