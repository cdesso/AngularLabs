var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist/my-app'));

var http = require("http").Server(app);
class User{
    // User class with all relavant attributes
    constructor(id, username, birthdate, age, email, password, valid){
        this.id = id
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.email = email;
        this.password = password;
        this.valid = valid;
    }
}
//array of User instances
users = [
    new User(1, 'casper7', '07/05/1996', '24', 'casper@mail.com', 'abc123', false), 
    new User(2, 'john1', '12/03/1998', '22', 'john@mail.com', 'abc123', false),
    new User(3, 'david12', '20/01/1994', '26', 'david@mail.com', 'abc123', false),
];

app.listen(3000, ()=>{
    console.log("running");
});

app.post('/api/auth', function(req, res){
    //check information received from login form against information stored in the users array.
    // if there is a match, create the object 'data' and store the appropriate information.
    // send data back to login component ts file and break the loop.
    // If no data is found, send false valid attribute back to login component ts file.
    for (let i=0; i<this.users.length; i++){
        if (req.body.username == users[i].username && req.body.pwd == this.users[i].password){
            users[i].valid = true;
            data = {
                'id' : users[i].id,
                'username' : users[i].username,
                'birthdate' : users[i].birthdate,
                'age' : users[i].age,
                'email' : users[i].email,
                'valid' : users[i].valid
            }
            res.send(data);
            break;
        }
    }
    if (typeof(data) == 'undefined'){
        res.send({'valid': false});
    }
});

app.post('/editprofile', function(req, res){
    // find the current user in the user array, and if the new inputs are not empty 
    // and are not the same as data stored in User class, replace old data with the new.
    // return an object with the new data back to the profile component ts file.
    user = users[req.body.id - 1];
    if (req.body.username.length > 0 && req.body.birthdate.length > 0 && req.body.email.length > 0){
        if (user.username != req.body.username){
            user.username = req.body.username;
        }
        if (user.birthdate != req.body.birthdate){
            user.birthdate = req.body.birthdate;
        }
        if (user.email != req.body.email){
            user.email = req.body.email;
        }
    }
    data = {
        'username' : user.username,
        'birthdate' : user.birthdate,
        'email' : user.email
    }
    res.send(data);
});

