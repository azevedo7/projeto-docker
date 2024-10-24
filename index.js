const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const words = fs.readFileSync(path.join(__dirname, 'words.txt'), 'utf8').split('\n');

app.get('/random-word', (req, res) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json({ word: randomWord});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});