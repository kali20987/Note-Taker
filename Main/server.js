const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
app.use(clog);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './routes/index.js'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './routes/notes.js'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

module.exports = app;