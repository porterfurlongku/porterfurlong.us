const express = require('express');
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
