const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(express.json());

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

app.use(cors());

app.get('/items', (req, res) => {
  res.json(data.items);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});