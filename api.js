function getData(){
    document.getElementById("result").innerHTML = '';
    fetch('https://reneechen108.website/indivialProject/productJSON.php')
    .then(response => {
        return response.json();
    })
    .then(users => {
        for(let i = 0; i < users.length-1; i++){
            for (const property in users[i]) {
            document.getElementById("result").innerHTML += `${property}: ${users[i][property]} <br >`;
            }
            document.getElementById("result").innerHTML += '<p id="underline"></p>'
        }
    })
}

// async await 
async function getUsers() {
    let success_user = `<h1>Login User</h1>`;
    document.getElementById("old").innerHTML = success_user;
    // API call
    let response = await fetch('https://reneechen108.website/indivialProject/productJSON.php');
    let data = await response.json();
    document.getElementById("result").innerHTML = '';
    for(let i = 0; i < data.length-1; i++){
        for (const property in data[i]) {
            document.getElementById("result").innerHTML += `${property}: ${data[i][property]} <br >`;
        }
        document.getElementById("result").innerHTML += '<p id="underline"></p>'
    }
    
    return data;
}

getUsers().then(data => console.log(data));


function getLocation() {
    document.getElementById("result").innerHTML = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log('You are not able to access your location within this browser');
    }

    function success(position) {
        document.getElementById("result").innerHTML = '';
        result.innerHTML = "Latitude: " + position.coords.latitude +
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
    document.getElementById("result").innerHTML = '';
    ajax(URL).then(function onFulfilled(value){
        let product = JSON.parse(value);
        for(let i = 0; i < product.length; i++){
            document.getElementById("result").innerHTML += `${product[i].PName} values $ ${product[i].Price}<br >`;
        }
    }).catch(function onRejected(error){
        document.getElementById("result").innerHTML += error;
    });
}


function getTop() {
    let product = document.getElementById('result').innerHTML;
    let productList = product.split('<br>')
    console.log("this are: ", product);
    console.log("this are product list: ", productList);
    let priceList = [];
    for(let i = 0; i < productList.length; i++){
        for(let j = 0; j < productList[i].length; j++){
            if(productList[i].charAt(j) == "$"){
                priceList.push(parseInt(productList[i].substring(j+2, productList[i].length)));
            }
        }
    }
    
    // callback function
    function sortFun(list) {
        let prices = list.sort(function(a, b){return b - a});
        return prices;
    }

    function getUserInput(sortFun){
        sortFun(priceList);
        return priceList;
    }

    const sortPrice = getUserInput(sortFun);
    document.getElementById("result").innerHTML = 'The top 5 prices of the houses <br >';
    for(let i = 0; i < 5; i++){
        document.getElementById("result").innerHTML += `${sortPrice[i]} <br >`;
    }
    // // Create a function that accepts another function as an argument
    // const filterFun = (fun) => {
    // // Calls the function with any required arguments
    // return fun(1, 2, 3)
    // }

    // // Callback gets arguments from the above call
    // const callback = (arg1, arg2, arg3) => {
    // return arg1 + arg2 + arg3
    // }

    // // Passing a callback into a callback accepting function
    // const result = callbackAcceptingFunction(callback)
    // console.log(result) 
}
