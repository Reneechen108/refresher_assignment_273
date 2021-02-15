'use strict';
const avg = function(arr) {
    let sum = 0;
    for(let i = 0; i < arr[0].length; i++){
        sum += arr[0][i]
    }
    console.log("sum: ", sum);
    return 'The average age in the website is: ' + sum / arr[0].length;
}
