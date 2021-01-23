const http = require("http");

const server = http.createServer((req, res) => {
  let body = [];
  console.log(req.method, req.url);
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    body = Buffer.concat(body).toString('base64');
    let userName = "Passenger Who are you?";
    if (body) {
      userName = body.split("=")[1];
    }
    console.log(body);
    res.setHeader("Content-Type", "text/html", "charset=utf-8");
    res.write(
      ` <h1>hi ${userName}</h1><form action="/" method="POST"><input name="username" type="text"><button type="submit">SEND</button></form>`
    );
    res.end();
  });
});

server.listen(8080);
