const http = require('http');
const port = 3000;

const server = http.createServer((requsest, response) => {
    response.writeHead(200, {
        "Content-Type": "text/html"
      });

    const responseMessage = "<h1>Hello, World!</h1>";
    response.end(responseMessage);
    console.log(`Sent a message: ${responseMessage}`);
});

server.listen(port);
console.log(`Server is running at http://localhost:${port}`);