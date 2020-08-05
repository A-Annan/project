var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


var pdf = require('html-pdf');
var path = require('path');

var fs = require('fs');
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



connection.connect(function (error) {
    if (error) console.log('DataBase not connected commande');
    else console.log('database connected Commande ');
});

router.get('/getCmdTrackTele',function (req, res) {
    connection.query("SELECT tracking,Tele from Commande ",function (error,data) {
        if (error) res.json({success:false});
        else {
            res.json({success:true,data:data});
        }
    } )
})

router.get('/getCmd/:user',function (req, res) {
   if (req.params.user != 'admin'){
       connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking from Commande where username = '"+req.params.user+"'",function (error, data,fields) {
           if (error) res.json({success:false});
           else {
               res.json({success:true,commande:data});
           }
       })
   }else {
       connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking from Commande",function (error, data,fields) {
           if (error) res.json({success:false});
           else {
               res.json({success:true,commande:data});
           }
       })
   }

});

router.get('/getDashUser/:user',function (req, res) {

        connection.query("SELECT COUNT(id) AS nombre,Statut FROM `Commande`  where username = '"+req.params.user+"' GROUP BY Statut",function (error, data,fields) {
            if (error) res.json({success:false});
            else {
                res.json({success:true,commande:data});
            }
        })


});

router.get('/getData',function (req, res) {
    

    connection.query("SELECT COUNT(id) AS nombre,Statut FROM `Commande` GROUP BY Statut ",function (error, data) {
        if (error) res.json({success:false});
        else {

            res.json({
                success:true,
                cmd:data
            })
        }
    })
});

router.get('/search/:search',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` WHERE  Statut = '"+ req.params.search+"' or id = '"+req.params.search+"' or Tele = '"+req.params.search+"' or tracking = '"+req.params.search+"' or Nom = '"+req.params.search+"'  or Ville = '"+req.params.search+"' ;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/searchStatut/',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` WHERE  Statut = '"+ req.query.statut+"' AND id = '"+req.query.term+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/getCmdByStatus/:status',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` WHERE  Statut = '"+ req.params.status+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/getCmd',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` ;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});


router.get('/searchDate/twoDateDash/',function (req, res) {


    connection.query("SELECT COUNT(id) AS nombre,Statut from Commande WHERE Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"'  GROUP BY Statut;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
  console.log(req.query.date1+' '+req.query.date2);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});
router.get('/searchDate/twoDateDashWithTerm/',function (req, res) {


    connection.query("SELECT COUNT(id) AS nombre,Statut from Commande WHERE Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"' And (Statut = '"+ req.query.term+"' or id = '"+req.query.term+"' or Tele = '"+req.query.term+"' or tracking = '"+req.query.term+"' or Nom = '"+req.query.term+"'  or Ville = '"+req.query.term+"') GROUP BY Statut;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
  console.log(req.query.date1+' '+req.query.date2);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/searchDate/twoDateDashUser/',function (req, res) {


    connection.query("SELECT COUNT(id) AS nombre,Statut from Commande WHERE Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"' AND username = '"+req.query.user+"'  GROUP BY Statut;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});
router.get('/searchDate/twoDate/',function (req, res) {

console.log(req.query.date1+' '+req.query.date2);
    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking from Commande WHERE Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
  console.log(data);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/searchDate/twoDateUser/',function (req, res) {

    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking from Commande WHERE username = '"+req.query.user+"' AND Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
            console.log(data);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});
router.get('/searchDate/twoDateStatut/',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking from Commande WHERE Statut= '"+req.query.statut+"' And Date BETWEEN '"+ req.query.date1+"' AND '"+req.query.date2+"';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {
            res.json({
                success:true,
                commande:data
            })
        }
    })


});
router.get('/searchDate/getUserCmd/',function (req, res) {

});

router.get('/searchDate/:search',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` WHERE  Date BETWEEN '"+ req.params.search+" 00:00:00' AND '"+req.params.search+" 23:59:59';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});



router.get('/searchDateDash/OneDateUser/',function (req, res) {


    connection.query("SELECT COUNT(id) AS nombre,Statut FROM `Commande` WHERE  Date BETWEEN '"+ req.query.date1+" 00:00:00' AND '"+req.query.date1+" 23:59:59' AND username = '"+req.query.user+"' GROUP BY Statut ;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            console.log(req.params.search);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});



router.get('/searchDateDash/:search',function (req, res) {


    connection.query("SELECT COUNT(id) AS nombre,Statut FROM `Commande` WHERE  Date BETWEEN '"+ req.params.search+" 00:00:00' AND '"+req.params.search+" 23:59:59' GROUP BY Statut ;",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

console.log(req.params.search);
            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.get('/searchDateStatut/',function (req, res) {


    connection.query("SELECT id,Nom,Tele,Ville,Adress,Produit,Quantite,Prix,Statut,Note,date_format(Date,'%d-%m-%Y') as Date,username,tracking FROM `Commande` WHERE Statut = '"+req.query.statut+"' And BETWEEN '"+ req.params.search+" 00:00:00' AND '"+req.params.search+" 23:59:59';",function (error, data) {
        if (error) {
            console.log(error);
            res.json({success:false});}
        else {

            res.json({
                success:true,
                commande:data
            })
        }
    })


});

router.post('/newCmd',function (req, res) {

    var Nom = req.body.Nom;
    var Tele = req.body.Tele;
    var Adresse = req.body.Adresse;
    var Ville = req.body.Ville;
    var Produit = req.body.Produit;
    var Quantite = req.body.Quantite;
    var Prix = req.body.Prix;
    var Statut = req.body.Statut;
    var Note = req.body.Note;
    var user = req.body.user;
    var tracking = req.body.tracking;

    connection.query(
        "INSERT INTO Commande (Nom, Tele, Ville,Adress,Produit,Quantite,Prix,Statut,Note,Date,username,tracking ) VALUES ('"+Nom+"','"+Tele+"','"+Ville+"','"+Adresse+"','"+Produit+"','"+Quantite+"','"+Prix+"','"+Statut+"','"+Note+"',NOW(),'"+user+"','"+tracking+"');",
        function (error,data) {
            if (error) {res.send(error);
                console.log(error);
            }
            else{

                connection.query("INSERT INTO cmd_user (commande,username,action,date) VALUES ('"+data.insertId+"','"+user+"','Ajout Commande',NOW());",function (error) {
                    if (error)res.send(error);
                    else res.json({success:true,tele:true});

                })     }
        }
    )



});
router.post('/alterCmd',function (req, res) {
   var id = req.body.id;
    var Nom = req.body.Nom;
    var Tele = req.body.Tele;
    var Adresse = req.body.Adress;
    var Ville = req.body.ville;
    var Produit = req.body.Produit;
    var Quantite = req.body.Quantite;
    var Prix = req.body.Prix;
    var Statut = req.body.Statut;
    var Note = req.body.Note;
    var user = req.body.user;
    var tracking = req.body.tracking;
    var date;


    connection.query("SELECT date_format(Date,'%Y-%m-%d %H:%i:%s') as Date from Commande where id = '"+id+"'",function (error, data,fields) {
        if (error) res.json({success:false});
        else {
            console.log(data[0].Date);
            connection.query(
                "UPDATE Commande SET Nom = '"+Nom+"' , Tele = '"+Tele+"', Adress = '"+Adresse+"' ,Ville = '"+Ville+"'," +
                "Produit = '"+Produit+"',Quantite = '"+Quantite+"', Prix = '"+Prix+"', Statut = '"+Statut+"', Note = '"+Note+"'," +
                "tracking = '"+tracking+"',Date = '"+data[0].Date+"'  WHERE id= '"+id+"';",
                function (error,data) {
                    if (error) {res.send(error);
                        console.log(error);
                    }
                    else{

                        connection.query("INSERT INTO cmd_user (commande,username,action,date) VALUES ('"+id+"','"+user+"','Modifier Commande',NOW());",function (error) {
                            if (error)res.send(error);
                            else res.json({success:true});

                        })     }
                }
            )
        }
    })



});
router.post('/alterUser',function (req, res) {
   var id = req.body.id;
   var username= req.body.username;
    var Nom = req.body.Nom;
    var prenom = req.body.Prenom;
    var Telephone = req.body.Telephone;
    var Addresse = req.body.Adresse;
    var Ville = req.body.Ville;
    var Email = req.body.Email;
    var type = req.body.type;
    var pass = req.body.pass;
    var usernameChanged  =req.body.usernameChanged;
    var oldUsername  =req.body.oldUsername;



if (!usernameChanged){
    bcrypt.hash(pass, null, null, function(err, hash) {

        connection.query(
            "UPDATE `Utilisateurs` SET   Nom = '" + Nom + "' ,Prenom = '" + prenom + "', Telephone = '" + Telephone + "' , Adresse = '" + Addresse + "' ,Ville = '" + Ville + "' ,Email = '" + Email + "',Pass = '" + hash + "' WHERE id= '" + id + "';",
            function (error, data) {
                if (error) {
                    res.send(error);
                    console.log(error);
                }
                else {


                }res.json({success: true});
            }
        )


    })
}else {


    connection.query("SELECT * from utilisateurs WHERE username = '"+username+"';",function (error,rows,fields) {
        if (error) res.json({error:error});
        if (rows.length == 0) {


            connection.query("SELECT username from utilisateurs WHERE id = '"+id+"';",function (error,rows,fields) {
                if (error) {res.send(error);
                    console.log(error);
                }
                else{
                    console.log();

                    bcrypt.hash(pass, null, null, function(err, hash) {

                        connection.query(
                            "UPDATE `Utilisateurs` SET  username ='" + username + "', Nom = '" + Nom + "' ,Prenom = '" + prenom + "', Telephone = '" + Telephone + "' , Adresse = '" + Addresse + "' ,Ville = '" + Ville + "' ,Email = '" + Email + "',Pass = '" + hash + "' WHERE id= '" + id + "';",
                            function (error, data) {
                                if (error) {
                                    res.send(error);
                                    console.log(error);
                                }
                                else{

                                    connection.query("UPDATE `cmd_user` SET username = '"+username+"' where username = '"+rows[0].username+"';",function (error) {
                                        if (error) {
                                            console.log(error);
                                            res.json({success:false});}
                                        else{
                                            console.log(username+' '+ rows[0].username);
                                            connection.query("UPDATE `Commande` SET username = '"+username+"' where username = '"+rows[0].username+"';",function (error) {
                                                if (error) {
                                                    console.log(error);
                                                    res.json({success:false});}
                                                else{
                                                    res.json({success:true});

                                                }
                                            });

                                        }
                                    });

                                }
                            }
                        )


                    })
                }
            })
        }else
        {
            res.json({success:false,msg:true})
        }
    });

}



});



router.post('/suivre',function (req, res) {

    var username = req.body.username;
    var id = req.body.id;
    connection.query("SELECT * from cmd_user WHERE commande = '"+id+"' and username = '"+username+"';",function (error, data) {
        if (error) res.json({success:false,msg:error});
        else {

            if (data.length == 0 ){

                connection.query("INSERT INTO cmd_user  (commande,username) VALUES ( '"+id+"','"+username+"');",function (error) {
                    if (error) {
                        console.log(error);
                        res.json({success:false});}
                    else{ console.log('true');
                        res.json({success:true});}
                });
            }


        }
    })



});

router.delete('/suppCmd/:id',function (req, res) {
    connection.query("DELETE from Commande WHERE id = '"+req.params.id +"';",function (error, rep) {
        if (error) res.json({success:false,msg:error});
        else {
            connection.query("DELETE from cmd_user WHERE commande = '"+req.params.id+"';",function (error, msg) {
                if (error) res.json({success:false,msg:error});
                else res.json({success:true,msg:'commande supprimer'})

            });
        }
    });
});


router.delete('/suppUser/:id',function (req, res) {
    connection.query("DELETE from utilisateurs WHERE id = '"+req.params.id +"';",function (error, rep) {
        if (error) res.json({success:false,msg:error});
        else {
            res.json({success:true,msg:'user supprimer'})
        }
    });
});

router.get('/updateStatut/',function (req, res) {

    connection.query("UPDATE Commande SET Statut = '"+ req.query.statut +"' WHERE id = '"+req.query.id+"';",function (error, data) {
        if (error) res.json({success:false,msg:error});
        else {


            connection.query("INSERT INTO cmd_user (commande,username,action,date) VALUES ("+req.query.id+",'"+req.query.user+"','Statut = "+req.query.statut+"',NOW());",function (error) {
                if (error)console.log(error);
                else res.json({success:true,msg:error});
            })
        }
    })
});


router.post('/ticket',function (req, res) {
    var option = {

        "orientation": "landscape"
    };


    var html='<div style="margin-bottom: 5px"> ';
    var img = "data:image/png;base64,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"
    for (var i=0;i<req.body.length;i++){
        if (i%2 == 0){

            html+='<div  style="width: 45%;height:46%;margin: 7px;page-break-inside: avoid;padding:4px;float: left">' +
                '<div><table><tr><td><img src='+img+'/></td><td><span style="float: right;margin-left: 95px;">Commande #'+req.body[i].tracking+'#</span></td></tr></table></div>' +
                '<strong>Nom<span style="margin-left: 50px;margin-right: 10px;margin-bottom:0px;">:</span> </strong><span>'+req.body[i].Nom+'</span><br>' +
                '<strong>Adresse <span style="margin-left: 25px;margin-right: 14px;">:</span></strong><span>'+req.body[i].Adress+'</span><br>' +
                '<strong>Ville <span style="margin-left: 45px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Ville+'</span><br>' +
                '<strong>Tele <span style="margin-left: 50px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Tele+'</span><br>' +
                '<strong>Prix <span style="margin-left: 50px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Prix+'</span><br>' +
                '<strong>Quantite <span style="margin-left: 19px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Quantite+'</span><br>' +
                '<strong>Produit <span style="margin-left: 27px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Produit+'</span></div>';
        }
        else {

            html+='<div style="width: 45%;height:46%;margin: 7px;page-break-inside: avoid;padding:4px;float: right">' +
                '<div><table><tr><td><img src='+img+'></td><td><span style="float: right;margin-left: 95px;">Commande #'+req.body[i].tracking+'#</span></td></tr></table></div>' +
                '<strong>Nom<span style="margin-left: 50px;margin-right: 10px;">:</span> </strong><span>'+req.body[i].Nom+'</span><br>' +
                '<strong>Adresse <span style="margin-left: 25px;margin-right: 14px;">:</span></strong><span>'+req.body[i].Adress+'</span><br>' +
                '<strong>Ville <span style="margin-left: 45px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Ville+'</span><br>' +
                '<strong>Tele <span style="margin-left: 50px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Tele+'</span><br>' +
                '<strong>Prix <span style="margin-left: 50px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Prix+'</span><br>' +
                '<strong>Quantite <span style="margin-left: 19px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Quantite+'</span><br>' +
                '<strong>Produit <span style="margin-left: 27px;margin-right: 15px;">:</span></strong><span>'+req.body[i].Produit+'</span></div></div>';
        }



    }


    pdf.create(html,option).toStream(function(err, stream){
        //  stream.pipe(fs.createWriteStream( '/home/thrilaaj/MShop/pro2/project/foo2.pdf'));
        stream.pipe(fs.createWriteStream( './foo2.pdf'));

    });
    setTimeout(function(){

        //   var data =fs.readFileSync('/home/thrilaaj/MShop/pro2/project/foo2.pdf');
        var data =fs.readFileSync( 'foo2.pdf');
        res.contentType("application/pdf");
        res.send(data);
    }, 500);


});






module.exports = router;