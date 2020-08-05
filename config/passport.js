const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./user');

const bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '108.179.208.217',
    user: 'thrilaaj_abdo',
    password: 'A7azerty',
    database: 'thrilaaj_testprojet2',
    port: '3306'
});


module.exports = function (passport) {
    var ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    ops.secretOrKey = 'annan';
    passport.use(new JwtStrategy(ops,function (jwt_payload, done) {
        connection.query("Select * from Utilisateurs WHERE id= '"+jwt_payload.data.id+"';",function (err, user) {
            if (err){
                return done(err,false);
            }
            if (user){
                console.log(user[0]);
                return done(null,user[0]);

            }else {
                return done(null,false)
            }
        })
    }))
};



