const express = require('express');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
  }); 

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/index.js');
    });

app.post('/uploaded', upload.single('file-to-upload'), (req, res) => {
    res.redirect('/');
    console.log('There is a file uplaoded now')
    });

// app.get('/uploaded', (req, res) =>)
app.use(express.static('dist'));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));