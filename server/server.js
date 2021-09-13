const express = require('express');
const path = require('path');
const app = express();

app.use(express.static("public"));
app.use(express.static("public/assets"));

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));