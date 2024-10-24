const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World again! Now with Docker!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});