import bodyParser from "body-parser";
import express, { Router } from "express"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.render("index.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})
app.listen(port, () => {
    console.log(`Running in port ${port}`)
})