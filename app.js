const http = require('http');
const fs = require('fs');

const server = http.createServer((req, resp) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        resp.write('<html>');
        resp.write('<head><title>Send a message</title></head>');
        resp.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        resp.write('</html>');
        return resp.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
        resp.statusCode = 302;
        resp.setHeader('Location', '/');
        return resp.end();
    }

    resp.setHeader('Content-Type', 'text/html');
    resp.write('<html>');
    resp.write('<head><title>My First Page</title></head>');
    resp.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    resp.write('</html>');
    resp.end();
})

server.listen(3000);