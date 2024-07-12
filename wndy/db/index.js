const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // To parse JSON bodies

// Database connection details
const dbConfig = {
  host: 'server326.web-hosting.com',
  user: 'wndyhyax_wnd',
  password: 'Merber77*&',
  database: 'wndyhyax_Portfolio'
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Test database connection
app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.send(`The solution is: ${results[0].solution}`);
  });
});

// Posts Routes
app.get('/posts', (req, res) => {
  connection.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

app.post('/posts', (req, res) => {
  const { title, content, author_id, status } = req.body;
  const query = 'INSERT INTO posts (title, content, author_id, status) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, content, author_id, status], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err.stack);
      res.status(500).send('Error inserting into the database');
      return;
    }
    res.send('Post created successfully');
  });
});

app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author_id, status } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ?, author_id = ?, status = ? WHERE id = ?';
  connection.query(query, [title, content, author_id, status, id], (err, results) => {
    if (err) {
      console.error('Error updating the database:', err.stack);
      res.status(500).send('Error updating the database');
      return;
    }
    res.send('Post updated successfully');
  });
});

// Categories Routes
app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

app.post('/categories', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO categories (name) VALUES (?)';
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err.stack);
      res.status(500).send('Error inserting into the database');
      return;
    }
    res.send('Category created successfully');
  });
});

app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE categories SET name = ? WHERE id = ?';
  connection.query(query, [name, id], (err, results) => {
    if (err) {
      console.error('Error updating the database:', err.stack);
      res.status(500).send('Error updating the database');
      return;
    }
    res.send('Category updated successfully');
  });
});

// Post Categories Routes
app.get('/post_categories', (req, res) => {
  connection.query('SELECT * FROM post_categories', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.stack);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

app.post('/post_categories', (req, res) => {
  const { post_id, category_id } = req.body;
  const query = 'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)';
  connection.query(query, [post_id, category_id], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err.stack);
      res.status(500).send('Error inserting into the database');
      return;
    }
    res.send('Post category created successfully');
  });
});

app.put('/post_categories/:post_id/:category_id', (req, res) => {
  const { post_id, category_id } = req.params;
  const { new_post_id, new_category_id } = req.body;
  const query = 'UPDATE post_categories SET post_id = ?, category_id = ? WHERE post_id = ? AND category_id = ?';
  connection.query(query, [new_post_id, new_category_id, post_id, category_id], (err, results) => {
    if (err) {
      console.error('Error updating the database:', err.stack);
      res.status(500).send('Error updating the database');
      return;
    }
    res.send('Post category updated successfully');
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
