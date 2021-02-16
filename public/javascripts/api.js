'use strict';
function getData(){
    document.getElementById("result_data").innerHTML = '';
    fetch('https://reneechen108.website/indivialProject/productJSON.php')
    .then(response => {
        return response.json();
    })
    .then(users => {
        for(let i = 0; i < users.length-1; i++){
            for (const property in users[i]) {
            document.getElementById("result_data").innerHTML += `${property}: ${users[i][property]} <br >`;
            }
            document.getElementById("result_data").innerHTML += '<p id="underline"></p>'
        }
    })
}

// async await 
// async await  makes your asynchronous code look more synchronous
// async await needs to show as a pair
async function getHouses() {
    if(localStorage.getItem("username") !== "admin"){
        let success_user = `<h1>Login User</h1>`;
        document.getElementById("old").innerHTML = success_user;
        // API call
        let response = await fetch('https://reneechen108.website/indivialProject/productJSON.php');
        let data = await response.json();
        let u = localStorage.getItem("username");
        // document.getElementById("result").innerHTML = '';
        for(let i = 0; i < data.length-1; i++){
            for (const property in data[i]) {
                document.getElementById("result_data").innerHTML += `${property}: ${data[i][property]} <br >`;
            }
            document.getElementById("result_data").innerHTML += '<p id="underline"></p>'
        }
        
        return data;
    }
    
    return;
}

getHouses().then(data => console.log(data));


function getLocation() {
    // document.getElementById("result").innerHTML = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log('You are not able to access your location within this browser');
    }

    function success(position) {
        document.getElementById("result_location").innerHTML = '';
        document.getElementById("result_location").innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude + "<br>Accuracy" + position.coords.accuracy;
    }

    function error(error) {
        var msg='';
        switch (error.code) {
            case error.TIMEOUT:
                msg = "Time out"
                break;
            case error.UNKNOWN_ERROR:
                msg = "Unknown error"
        }
        console.error(msg);
    }
}


function getOverview() {
    // Promise
    // It can return something, and accpet resolve and reject two parameters
    // Promise is an object, need to get the value in the then method
    // Promise is used to handle the asynchronous
    function ajax(URL) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest(); 
            request.open('GET', URL, true);
            request.onload = function () {
            if (request.status === 200) { 
                    resolve(request.responseText);
                } else {
                    reject(new Error(request.statusText));
                } 
            };
            request.send(); 
        });
    }
    var URL = "https://reneechen108.website/indivialProject/productJSON.php"; 
    document.getElementById("result_data").innerHTML = '';
    ajax(URL).then(function onFulfilled(value){
        let product = JSON.parse(value);
        for(let i = 0; i < product.length; i++){
            document.getElementById("result_data").innerHTML += `${product[i].PName} values $ ${product[i].Price}<br >`;
        }
    }).catch(function onRejected(error){
        document.getElementById("result_data").innerHTML += error;
    });
}


function getTop() {
    let product = document.getElementById('result_data').innerHTML;
    let productList = product.split('<br>')
    let priceList = [];
    for(let i = 0; i < productList.length; i++){
        for(let j = 0; j < productList[i].length; j++){
            if(productList[i].charAt(j) == "$"){
                priceList.push(parseInt(productList[i].substring(j+2, productList[i].length)));
            }
        }
    }
    
    // callbacks
    // callback is a function that is passed to another function.
    function sortFun(list) {
        let prices = list.sort(function(a, b){return b - a});
        return prices;
    }

    function getUserInput(sortFun){
        sortFun(priceList);
        return priceList;
    }

    const sortPrice = getUserInput(sortFun);
    document.getElementById("result_data").innerHTML = 'The top 5 prices of the houses <br >';
    for(let i = 0; i < 5; i++){
        document.getElementById("result_data").innerHTML += `${i+1}. $${sortPrice[i]} <br >`;
    }
}

// const constVar; // needs to finished the declartion and initialization
// const constVar = "This is const variable";
// var varVar = "This is var variable";
// function different() {
//     let letVar = "This is let variable";
//     console.log(constVar);  // global variable
//     console.log(varVar);    // global variable
//     console.log(letVar); // local variable
//     let letVar = "let define one more time" // let can not be redefined
//     for (let i = 0; i < 3; i++) {
//         console.log(i);
//     }
//     console.log(i); // let only available inside the code block
    
//     var varVar ="var define one more time"; // var can be declared
//     const constVar = "const define one more time" // cannot change it value
// }