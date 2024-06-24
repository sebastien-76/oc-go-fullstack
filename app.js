/* Import package express */
const express = require("express");

/* Création d'une application express */
const app = express();

app.use((req, res, next) => {
    console.log("Requete reçue")
    next()
})

app.use((req, res, next) => {
    res.json({
        message: "Hello World"
    })
})


/*  Export de l'application */
module.exports = app;
