const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve index.html or a simple response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <html>
        <body>
          <h1>Movie Tracker - Manual Test</h1>
          <button onclick="testAPI()">Test TMDB API</button>
          <div id="result"></div>
          
          <script>
            async function testAPI() {
              try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=8265bd1679663a7ea12ac168da84d2e8');
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                  '<h2>API Response:</h2><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                document.getElementById('result').innerHTML = 
                  '<h2 style="color: red;">Error:</h2><p>' + error.message + '</p>';
              }
            }
          </script>
        </body>
      </html>
    `);
  } else if (req.url === '/api/test') {
    // API endpoint test
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      message: 'API works!',
      tmdbApiKey: process.env.TMDB_API_KEY || '8265bd1679663a7ea12ac168da84d2e8'
    }));
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
