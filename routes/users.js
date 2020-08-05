var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const saltRounds = 10;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Shop'
});
connection.connect(function (error,res) {
    if (error) console.log('DataBase not connected user');
    else console.log('DataBase connected user');
});


router.post('/searchDateShow',function (req, res) {

    var date = '';
 date = req.body.date;
    connection.query("select commande,username,action,date_format(date,'%d-%m-%Y %H:%i') as date from cmd_user where cast(date as date) = cast('"+date+"' as date)",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

console.log(data);
            res.json({
                success:true,
                users:data
            })
        }
    })


});


//ajouter un nouveau utilisateur avec la methode post
router.post('/newUser', function(req, res, next) {

  var Nom = req.body.nom;
  var Email = req.body.email;
  var pass = req.body.pass;
  var Tele = req.body.tele;
  var Adresse = req.body.adr;
  var Ville = req.body.ville;
  var prenom = req.body.prenom;
  var username = req.body.username;
  var privilege = req.body.privilege;



  //Versification de l'existance de l'utilisateur
  connection.query("SELECT * from utilisateurs WHERE username = '"+username+"';",function (error,rows,fields) {
      if (error) res.json({error:error});
     if (rows.length == 0) {
         bcrypt.hash(pass, null, null, function(err, hash) {
             // Store hash in your password DB.
             connection.query(
                 "INSERT INTO Utilisateurs (username,Nom, Email, Telephone,Adresse,Ville,Pass, type,prenom,privilege ) VALUES ('"+username+"','"+Nom+"','"+Email+"','"+Tele+"','"+Adresse+"','"+Ville+"','"+hash+"', 'null','"+prenom+"','"+privilege+"' );",
                 function (error) {
                     if (error) res.json({success:false});
                     else res.json({success:true});
                 }
             )
         });

     }else
     {
         res.json({success:false,msg:true})
     }
  });
});

//visualiser les utilisateurs
router.get('/showUsers/:search',function (req, res) {


    connection.query("SELECT commande,username,action,date_format(date,'%d-%m-%Y %H:%i') as date from cmd_user where commande ='"+req.params.search+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
console.log("#######################\n"+data);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/getUser',function (req, res) {


    connection.query("SELECT id,username,Nom,Email,Telephone,Adresse,Ville,Prenom,type,privilege from utilisateurs",function (error, data) {
        if (error) res.json({success:false});
        else {
   console.log(data);
            res.json({success:true,users:data});
        }
    })
});



module.exports = router;
