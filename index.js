const express = require("express")
const cars = require("cars");
const { error } = require("console");
const app = express()

app.use(cars());
app.use(express.json())

const games = [
    { id: 1, name: "Doom"},
    { id: 2, name: "Minesweeper"},
    { id: 3, name: "lsd-simulator"},
    { id: 4, name: "hue"},
]

// get method return one game from array by id doesn't exist
app.get('/games/:id', (req, res) => {
    res.send(games)
})

app.get('/games/:id', (req, res) => {
    if (typeof games[req.parse.id-1] === "undefined") {
        return res.status(404).send({error: "Games doesn't exitst on the list"});
    }
    res.send(games[req.params.id-1]);
})


/*
    Post method, adds a new game in to the array. If paramenter is missing
    returns a bad request - 400
*/
app.post('/games', (req, res) => {
    if(!req.body.name || ! req.body.price) {
        return res.status(400).send({error: "a paramente or 2 is missing"});
    }
    let NewGame = {
        id: games.length,
        price: req.body.price,
        name: req.body.name
    };

    games.push(NewGame);
    res.status(201).location('localhost:8080/games/'+(games.length-1)).send(NewGame);

});


/*
    Delete a game where id is speicfied if game is note found.
    return statuscode 404 - not found otherwise
    return success 204 - no content.
*/

app.delete('/games/:id', (req, res) => {
    if (typeof games[req.parse.id-1] === "undefined"){
        return res.status(404).send({error: "No gaming for you buddy"})
    }
    games.splice(req.params.id -1, 1)
    res.status(204).send({error: "Context not containg (no content)"})
})

//app.put

// define the address upon which the app is running
app.listen(8080, () => console.log('Api töötab addressil: http:localhost:8080'))