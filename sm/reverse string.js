// const str= "suraj mendhe"
// let reverse= str.split('').reverse().join('')
// console.log(reverse);

// const str= 'suraj mendhe';
// let reversed= '';

// for(let i=str.length-1; i>=0; i--)
// {
//     reversed+= str[i];
// }

// console.log(reversed);

function reverseString(str){
    return str.split('').reverse().join('');
}

console.log(reverseString('hello'));



function reverseString(str){
    let reversed= '';

    for(let i=str.length-1; i>=0; i--){
        reversed += str[i];
    }

    return reversed;
}

console.log(reverseString('hello'));
