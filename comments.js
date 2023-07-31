// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const status = content.includes('orange') ? 'rejected' : 'approved';

    // Emit event to event bus
    axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        status,
        content,
      }
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});