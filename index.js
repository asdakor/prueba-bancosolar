import 'dotenv/config'
import express from 'express';
import path from 'path';


const __dirname = import.meta.dirname;

const app = express()

app.use(express.static(path.join(__dirname, '/public')));
//MIDELWARES BODY
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('estas en el index');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})