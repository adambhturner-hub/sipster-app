const http = require('http');
http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      console.log('\n\n--- CAUGHT CLIENT ERROR ---\n' + body + '\n---------------------------\n');
      res.end('ok');
    });
  } else {
    res.end('ok');
  }
}).listen(8080, () => console.log('Error beacon listening on 8080...'));
