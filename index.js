const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001


const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';

    req.on('data', (chunk) => {
      // Collect the data from the request
      data += chunk;
    });

    req.on('end', () => {
      // Handle the POST request when all data has been received
      console.log('Received POST data:');
      console.log(data);

      // Send a response back to the client
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Data received and logged.');
    });
  } else {
    // Handle other HTTP methods or routes here
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))