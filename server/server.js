const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
// const axios = require('axios');

app.use(express.static('dist'));
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file')

app.get('/upload', function (req, res) {
    res.send('hello world')
  })

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log('something went wrong', res ,err)
        res.sendStatus(500);
      }
      res.send(req.file);
    });
  });



app.use(express.static('upload'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));