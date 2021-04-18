const usernames = ['Ahmed'];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<h1 style="text-align:center">WELCOME TO MY NODE WEBSITE</h1>')
        res.write(
            '<body><form action="/create_user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>'
          );
        res.write('</html>');
        return res.end();
    };
    if (url === '/users') {
        res.write('<html>');
        res.write("<h3>list of users</h3><ul>");
        usernames.forEach(i => res.write(`<li>${i}</li>`))
        res.write('</html>');
        return res.end();
    }
    if (url === '/create_user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
          console.log(chunk);
          body.push(chunk);
        });
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const user = parsedBody.split('=')[1];
          usernames.push(user);
          res.statusCode = 302;
          res.setHeader('Location', '/users');
          return res.end();
        });
      }
};

module.exports.handler = requestHandler;
 