const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const prompts = require('./routes/api/prompts');

app.use('/api/prompts', prompts);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/dist/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
