const express = require('express');

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));