function checkPalindrome(str){
    let reverse= str.split('').reverse().join('');
    return str === reverse;
}

console.log(checkPalindrome('racecar'));
