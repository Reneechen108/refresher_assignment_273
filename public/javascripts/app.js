'use strict';

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "A"
  },
  {
    id: 2,
    username: "lin",
    password: "12345678",
    age: 20,
    role: "R"
  },
  {
    id: 3,
    username: "zhang",
    password: "12345678",
    age: 21,
    role: "U"
  },
  {
    id: 4,
    username: "luo",
    password: "12345678",
    age: 30,
    role: "U"
  },
  {
    id: 5,
    username: "chen",
    password: "admin123",
    age: 34,
    role: "U"
  }
];


function signup() {
    let success = `<h1 id="id01">Login Successfully</h1>`
    let fail = `<h1 id="id01">Login Fail</h1>`
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let conPassword = document.getElementById('conPassword').value;
    let email = document.getElementById('email').value;
    let zip = document.getElementById('zip').value;
    if (password !== conPassword) {
        alert("Password is not the same!");
        return;
    }

    let userReg = /^[a-zA-Z\-]+$/;
    let passReg = /^[A-Za-z]\w{7,14}$/;
    let emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let zipReg = /[0-9]{5}/;

    if(userReg.test(username) && passReg.test(password) && emailReg.test(email) && zipReg.test(zip)){
        window.location.href = "/";
    }
    return false;
}

function login() {
    // let success = `<h1 id="id01">Login Successfully</h1>`
    let fail = `<h1 id="id01">Login Fail</h1>`
    let success_admin = `<h1 id="id01">Login Admin</h1>`
    let success_user = `<h1 id="id01">Login User</h1>`
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    //arrow functions
    let user = users.filter(user => (user.username === username && user.password === password));
    // typeof
    if(typeof(user[0]) === 'undefined'){
        document.getElementById("old").innerHTML = fail + `<a href="/">Back To Login</a>`;
    }else{
        if(user[0].role === "U"){
            document.getElementById("old").innerHTML = success_user;
            window.location.href = "/user_home";
        }else{
            document.getElementById("old").innerHTML = success_admin;
            window.location.href = "/admin";
        }
    }
    return false;
}

// arrow functions
function Arrow() {
    let h = `<h5 id="headding">arrow functions</h5>Welcome to my website`;
    return () => {
        document.getElementById("heading").innerHTML = h;
    }
}
const arrow = new Arrow();
arrow();

function displayUser() {
    // split and slice
    let str = "admin lin zhang luo chen";
    let res = str.split(" ");
    console.log(res);
    let users_inside = users.map(user => user.username);
    console.log(users_inside);
    let regular_user = users_inside.slice(1,users_inside.length)
    console.log(regular_user);
    for(let i = 0; i < regular_user.length; i++){
        document.getElementById("user_list").innerHTML += regular_user[i] + `<button type="button" class="btn btn-info" onclick="getInfo(${i+2})">Check</button>` + 
        `<button type="button" class="btn btn-info" onclick="updateInfo(${i})">Update</button>` + "<p></p>";
    }
}

function getInfo(i) {
    console.log(i);
    let current_user = users.filter(user => (user.id === i));
    console.log(current_user);
    document.getElementById("user_info").innerHTML = '';
    for (const property in current_user[0]) {
        document.getElementById("user_info").innerHTML += `${property}: ${current_user[0][property]} <br >`;
    }
    console.log(current_user);
    // includes
    if(current_user[0].role.includes('R')){
        document.getElementById("user_info").innerHTML += `${current_user[0].username} is a regular user<br >`;
    }else{
        document.getElementById("user_info").innerHTML += `${current_user[0].username} are able to operate other users<br >`;
    }
}

function updateInfo(i) {
    // spread
    // arguments
    let id = arguments[0];
    let user = users[id+1];
    let oldRole = user.role;
    let role = 'R';
    let newUser = {...user, role}
    // Object.assign
    Object.assign(users[id+1], newUser)


    let roleArr = [oldRole, role]
    function displayRole(old, role) {
        console.log(`Change the role from ${old} to ${this.role}`);
        document.getElementById("user_info").innerHTML = `${this.username} change the role from ${old} to ${role}`;
    }

    // a. call, apply, bind
    displayRole.call(user, oldRole, role); // call needs to add other variables as parameters

    displayRole.apply(user, roleArr); // apply needs to add the list with other variables inside as parameters

    let bindFun = displayRole.bind(user); 
    bindFun(oldRole, role); // unlike call and apply, use variables as parameter to the function, bind use the function directly and use the variable as parameter    
}

function refresh() {
    // rest operator
    function getAll(...userInfo) {
        console.log("All users: ", ...userInfo);
    }
    getAll(users);
    document.getElementById("user_list").innerHTML = '';
    displayUser();
}

function addUser() {
    let txt = '{"id": 6, "username":"john", "password":1234130, "age": 20, "role":"U"}'
    // JSON.parse
    let newObject = JSON.parse(txt);
    users.push(newObject)
    // JSON.stringify
    let myJSON = JSON.stringify(users);
    document.getElementById("user_list").innerHTML = '';
    document.getElementById("user_info").innerHTML = '';
    document.getElementById("user_list").innerHTML += users[users.length-1].username + `<button type="button" class="btn btn-info" onclick="getInfo(${users[users.length-1].id})">Check</button>` + 
        `<button type="button" class="btn btn-info" onclick="updateInfo(${users[users.length-1].id-2})">Update</button>` + "<br >";
}

function search() {
    // regular expressions
    let username = document.getElementById("search_input").value;
    let userRGEX = /^[a-zA-Z\-]+$/;
    let userResult = userRGEX.test(username);
    document.getElementById("user_list").innerHTML = '';
    if(userResult){
        let current_user = users.filter(user => (user.username === username));
        if(current_user.length !== 0){
            console.log(current_user[0].id);
            document.getElementById("user_list").innerHTML += current_user[0].username + `<button type="button" class="btn btn-info" onclick="getInfo(${current_user[0].id})">Check</button>` + 
        `<button type="button" class="btn btn-info" onclick="updateInfo(${current_user[0].id-2})">Update</button>` + "<br >";
        }else{
            alert("username is not exist");
        }
    }else{
        alert("username is incorrect");
    }
    
}

function changeRole(admin){
    let changeAdmin = arguments[0];
    let user_role = users[1].role;
    user_role = changeAdmin;
    console.log(user_role);
    console.log(changeAdmin);
}





// //callback
// const students = [
//     {name: "Chandler", year: 2},
//     {name: "Joey", year: 2}
// ]

// function getStudents() {
//     console.log(students[2]);
// }
//
// function createStudent(getStudents) {
//     setTimeout(() => {
//         students.push({name: "Ross", year: 1})
//         getStudents();
//     }, 1000);
// }
//
// createStudent(getStudents);


// //CALLBACK HELL
// async1(function(){
//     async2(function(){
//         async3(function(){
//             async4(function(){
//                 ....
//             });
//         });
//     });
// });




