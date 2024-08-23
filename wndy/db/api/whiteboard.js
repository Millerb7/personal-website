const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Save whiteboard data (strokes) to the database
router.post('/save', (req, res) => {
  const { strokes } = req.body;
  console.log('in save');
  
  // Save strokes in the database, update the single row for global whiteboard state
  const query = 'UPDATE global_whiteboard SET strokes = ?';

  connection.query(query, [JSON.stringify(strokes)], (err, results) => {
    if (err) {
      console.error('Error saving whiteboard data:', err);
      res.status(500).send('Error saving whiteboard data');
      return;
    }
    res.send('Whiteboard data saved successfully');
  });
});

// Retrieve global whiteboard data
router.get('/retrieve', (req, res) => {
  const query = 'SELECT strokes FROM global_whiteboard LIMIT 1';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving whiteboard data:', err);
      res.status(500).send('Error retrieving whiteboard data');
      return;
    }

    if (results.length > 0) {
      res.json(JSON.parse(results[0].strokes)); // Send the strokes as JSON
    } else {
      res.status(404).send('No whiteboard data found');
    }
  });
});

module.exports = router;