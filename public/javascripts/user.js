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

let chen = new Member('chen', 'reneechen108@gmail.com', "123", 'Standard Member');

chen.getLevel();
