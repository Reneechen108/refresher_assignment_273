'use strict';
// exports
export default class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    // static method
    static websiteInfo(){
        console.log("Here is a website for refresher assignment");
    }
}

// subclasses
class Member extends User {
    constructor(username, email, password, level){
        super(username, email, password);
        this.level = level;
    }

    getLevel() {
        console.log(this.username + ' member level is ' + this.level);
    }
}

async function getUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    let data = await response.json();
    for(let i = 0; i < data.length-1; i++){
        for (const property in data[i]) {
        // document.getElementById("result").innerHTML += `${property}: ${data[i][property]} <br >`;
            console.log(`${property}: ${data[i][property]} <br >`);
    }
}
}

let mike = new Member('chen', 'reneechen108@gmail.com', "123", 'Standard Member');

mike.getLevel();