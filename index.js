const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const app = express();
const device = require('express-device');

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded());
app.use(express.static("public"));
app.use(device.capture());

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds143754.mlab.com:43754/linkcurve`);

var schema = new mongoose.Schema({
    nick: String,
    class: String,
    role: String
});

var Raider = mongoose.model("Raider", schema);

function listRaiders(role, cb) {

    Raider.find({"role": role}).sort({class: 1}).exec(function(err, raiders) {

        if(err) {
            cb(err);
        } else {
            cb(null, raiders);
        }

    });

}



function sendMail(content) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: 'lukasz1004@gmail.com',
        subject: 'Link Curve - nowe zgłoszenie',
        text: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

app.post("/", function(req, res){

    sendMail(`
    Nick: ${req.body.nick}
    Battletag: ${req.body.btag}
    Treść ogłoszenia:
    ${req.body.about}`);
    res.status(200).end();


});




app.get("/", (req, res) => {

    request.get('https://raider.io/api/v1/guilds/profile?region=EU&realm=burning-legion&name=link%20curve&fields=raid_progression', function(err, response, body){

        progress_uldir = JSON.parse(body).raid_progression.uldir.summary;

        listRaiders("tank", (err, tanks) => {

            listRaiders("healer", (err, healers) => {

                listRaiders("rdps", (err, rdps) => {

                    listRaiders("mdps", (err, mdps) => {

                        if(req.device.type === 'phone'){
                            res.render("mobile",{

                                title: "Link Curve | Burning Legion",
                                progress: progress_uldir,
                                tanks: err ? [] : tanks,
                                healers: err ? [] : healers,
                                rdps: err ? [] : rdps,
                                mdps: err ? [] : mdps
                            });
                        }
                        else
                        {
                            res.render("home",{

                                title: "Link Curve | Burning Legion",
                                progress: progress_uldir,
                                tanks: err ? [] : tanks,
                                healers: err ? [] : healers,
                                rdps: err ? [] : rdps,
                                mdps: err ? [] : mdps
                            });
                        }





                    });



                });



            });



        });




    });

});

app.get("/sweealert2.all.min.js",  (req, res) => {

    res.send(sweetAlert);


});


app.get("*", (req, res) => {

    res.status(404).send("<h1>Error 404: Not found</h1>");

});

app.listen(process.env.PORT || 8080, () => {

   console.log("Uruchomiono serwer pod adresem http://localhost:8080/");

});