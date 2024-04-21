const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});