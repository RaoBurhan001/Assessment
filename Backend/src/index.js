const http = require('http');
const app = require('./app');
require('dotenv').config();

/** Setting the port number */
const port = process.env.PORT || '3000';

app.set('port', process.env.PORT);

/**  Create HTTP server*/
const server = http.createServer(app);

/** Listening to the specified port */
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
