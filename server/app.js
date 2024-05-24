import express from 'express'
import fileUpload from 'express-fileupload';
import cors from 'cors'


const app = express();

app.use(cors());
app.use(fileUpload);
app.use(express.json());

app.get('/upload', (req, res) => {
    res.send('Hellow word')
});

app.post('/upload', (req, res) => {
    console.log(req.files.file);
    res.send(`Archivo ${req.files.file.name} subido correctamente`);
});

app.listen(3000, () => {
    console.log('server on por 3000')
});