var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Shop'
});




connection.connect(function (error,res) {

    if (error) console.log('DataBase not connected index');
    else{
        console.log('DataBase connected index');
    }

});



router.get('/profil',function (req, res) {
    res.json({user: req.user});
});

router.post('/login',function (req, res) {

    const username = req.body.username;
    const pass = req.body.password;


    connection.query("SELECT Email From Utilisateurs WHERE username = '"+username+"';",
        function (error, rows) {
        if (error) res.json({success:false,msg:error});
            if (rows.length == 0 ) {
                        res.json({success: false,msg: 'username introuvable' });
            }
            else {
                connection.query("SELECT Pass From Utilisateurs WHERE username='"+username+"';",
                    function (error, result) {


                            bcrypt.compare( pass, result[0].Pass, (err, checked) => {
                                // res == true
                                
                                
                                 if (checked){

                    
                                             
                            connection.query("SELECT * From Utilisateurs WHERE username='"+username+"';",
                                 function (error,user) {
                                             if (error) throw  error;
                                             const token = jwt.sign({data: user[0]}, 'annan', {
                                                 expiresIn: 604800 // 1 week
                                             });
                                              res.json({
                                                   success: true,
                                                   token: 'JWT '+token,
                                                   user:{
                                                       id: user[0].id,
                                                       nom: user[0].Nom,
                                                       ville: user[0].Ville,
                                                       email:user[0].Email,
                                                       type: user[0].type,
                                                       username:user[0].username,
                                                       privilege:user[0].privilege
                                                   }

                                               });
                                            
                                         })
                                }else  res.json({success: false,msg: 'wrong pass' });
                            });



                    });
            }
        });


});




router.get('/logout',function (req, res) {
    req.session.destroy(function (error) {
        if (error) res.send(erro);
        res.send('logout');
    })
});
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(err, user);
});




module.exports = router;
