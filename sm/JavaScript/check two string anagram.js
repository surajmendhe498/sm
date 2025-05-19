function checkAnagram(str1, str2){
    const normalize= str=> str.toLowerCase().split('').sort().join('');

    return normalize(str1) === normalize(str2); 
}

console.log(checkAnagram("listen", "silent"));      // Both strings must contain the same characters.



/*

Lowercase Conversion: toLowerCase() ensures case-insensitivity.

Splitting: split('') converts the string into an array of characters.

Sorting: sort() arranges the characters in alphabetical order.

Joining: join('') combines the sorted characters back into a string.

*/