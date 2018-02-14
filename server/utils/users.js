[{

}]

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        const users = this.users.filter((user) => user.room === room);
        const namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};


// class Person {
//     constructor(name, age){
//         this.name = name;//this - to insert data to the instace of the object (and not to the class)
//         this.age = age;  //this - refers to the instance istead of the class
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }

// let me = new Person('Roey', 35);
// console.log(me.getUserDescription());