const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      `<html>
    <body> 
     <form action="/create-user" method ="POST">
      <input type="text" name="userName" />
      <button type="submit">Send</button>
     </form>
      </body>
    </html>`
    );
    return res.end();
  }

  if (url === "/users") {
    res.write(
      `<html>
    <body> 
       <ul>
       <label>List of users</label>
        <li>Akshay</li>
        <li>Shivam</li>
        <li>Shubham</li>
        <li>Ravi</li>
       </ul>
      </body>
    </html>`
    );
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message, "message");
      fs.writeFileSync("note.txt", message.replaceAll("+", " "));
      res.statusCode = "302";
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html>
    <h1>Hello</h1>
  </html>`
  );
  res.end();
};

module.exports = routesHandler;
