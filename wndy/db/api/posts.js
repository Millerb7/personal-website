const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Get all posts
router.get('/posts', (req, res) => {
  connection.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

// Create a new post
router.post('/posts', (req, res) => {
  const { title, content, author_id, status } = req.body;
  const query = 'INSERT INTO posts (title, content, author_id, status) VALUES (?, ?, ?, ?)';
  
  connection.query(query, [title, content, author_id, status], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err.stack);
      res.status(500).send('Error inserting into the database');
      return;
    }

    const newPostId = results.insertId;
    connection.query('SELECT * FROM posts WHERE id = ?', [newPostId], (err, postResults) => {
      if (err) {
        console.error('Error retrieving the new post:', err.stack);
        res.status(500).send('Error retrieving the new post');
        return;
      }
      res.json(postResults[0]);
    });
  });
});

// Update a post
router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author_id, status } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ?, author_id = ?, status = ? WHERE id = ?';

  connection.query(query, [title, content, author_id, status, id], (err) => {
    if (err) {
      console.error('Error updating the database:', err.stack);
      res.status(500).send('Error updating the database');
      return;
    }
    res.send('Post updated successfully');
  });
});

module.exports = router;
