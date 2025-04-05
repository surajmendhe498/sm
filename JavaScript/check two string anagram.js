function checkAnagram(str1, str2){
    const normalize= str=> str.toLowerCase().split('').sort().join('');

    return normalize(str1) === normalize(str2); 
}

console.log(checkAnagram("listen", "silent"));      // Both strings must contain the same characters.
