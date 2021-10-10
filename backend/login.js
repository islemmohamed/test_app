var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//connection to data base
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'projet2021'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//authentification view
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.send(results);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//register view
app.post('/register', function(request, response) {
    
	var Nom= request.body.Nom;
	var image=request.body.image;
    var Prenom= request.body.Prenom;
    var Telephone= request.body.Telephone;
    var Datenaissance= request.body.Datenaissance;
    var Email= request.body.Email;
    var Role= request.body.role;
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('insert into projet2021.user (Nom,Prenom, Telephone, Datenaissance, Email, Role, Username, Password,image) values (?,?,?,?,?,?,?,?,? )', [Nom,Prenom, Telephone, Datenaissance, Email, Role, username, password,image], function(error, results, fields) {
			

				response.send(results);
					
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// all users view
app.get('/users',function(request,response){

	connection.query('SELECT * FROM user ', function(error, results, fields) {
		response.send(results);
					
		response.end();
		});

});
//update user
app.post('/userUpdate',function(request,response){
	var idUser=request.body.idUser;
	var image=request.body.image;
	var nom= request.body.Nom;
    var Prenom= request.body.Prenom;
    var Telephone= request.body.Telephone;
    var Datenaissance= request.body.Datenaissance;
    var Email= request.body.Email;
    var Role= request.body.role;
	var username = request.body.username;
	var password = request.body.password;
	var query='UPDATE user SET Nom="'+nom+'",Prenom="'+Prenom+'", Telephone="'+Telephone+'", Datenaissance="'+Datenaissance+'", Email="'+Email+'", Role="'+Role+'", Username="'+username+'", Password="'+password+'", image="'+image+'" WHERE idUser ='+idUser;
	connection.query(query, function(error, results, fields) {
		response.send(query);
					
		response.end();
		});
		

});
//delete user
app.post('/userDelete',function(request,response){
	var idUser=request.body.idUser;
	connection.query('Delete FROM user WHERE idUser= ?',[idUser], function(error, results, fields) {
		response.send(results);
					
		response.end();
		});

});

app.listen(3000);