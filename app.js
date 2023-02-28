const express = require("express")
const path = require("path")
const fs = require("fs")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const app = express();
const port = 80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
const Contact = mongoose.model('Contact', contactSchema);


// Express Specific Stuff

app.use('/static', express.static('static'))// for serving static files
app.use(express.urlencoded())


app.set('view engine', 'pug')


app.set('views', path.join(__dirname, 'views'))

// Endpoints
app.get('/', (req, res) => {
    const con = "This is the best content in our website"
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const con = "This is the best content in our website"
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    const con = "This is the best content in our website"
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item save in database")
    }).catch(() => {
        res.status(400).send("item not saved in database")
    })
    // res.status(200).render('contact.pug', params);
});

// Start The server
app.listen(port, () => {
    console.log(`The app started successfully on port ${port}`);
});