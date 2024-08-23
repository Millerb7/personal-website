const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get all categories
router.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

// Create a new category
router.post('/categories', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO categories (name) VALUES (?)';
  
  connection.query(query, [name], (err) => {
    if (err) {
      console.error('Error inserting into the database:', err.stack);
      res.status(500).send('Error inserting into the database');
      return;
    }
    res.send('Category created successfully');
  });
});

// Update a category
router.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE categories SET name = ? WHERE id = ?';

  connection.query(query, [name, id], (err) => {
    if (err) {
      console.error('Error updating the database:', err.stack);
      res.status(500).send('Error updating the database');
      return;
    }
    res.send('Category updated successfully');
  });
});

module.exports = router;
