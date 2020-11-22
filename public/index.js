const server = require('../server/server');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));