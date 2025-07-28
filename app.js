const http = require('http');

const server = http.createServer((req, resp) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<html>');
    resp.write('<head><title>My First Page</title></head>');
    resp.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    resp.write('</html>');
    resp.end();
})

server.listen(3000);