"use strict"

const port = 3000;
const http = require("http");
const fs = require("fs");

function readFile(file, response) {
    fs.readFile(`./${file}`, (error, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        response.end(data);
    });
}

const app = http.createServer((request, response) => {
    if (request.url === "/" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        readFile("view/index.html", response);
    } else if (request.url === "/public/image/nodejs.png" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "image/png"
        });
        readFile("public/image/nodejs.png", response);
    } else if (request.url === "/public/css/style.css" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "text/css"
        });
        readFile("public/style.css", response);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/html"
        });
        readFile("view/404.html", response);
        console.log();
    }
});

app.listen(port);
console.log(`Server running at http://localhost:${port}/`);