import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function BlogPost({ title, content, id }) {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h5" component="h3">{title}</Typography>
      <Typography component="p">{content}</Typography>
      <Button href={`/posts/${id}`} style={{ marginTop: '10px' }}>Read More</Button>
    </Paper>
  );
}

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    axios.post('/posts', newPost)
      .then(response => {
        setPosts(prevPosts => [...prevPosts, response.data]);
        setOpen(false);
        setNewPost({ title: '', content: '' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Blog</Typography>
          <Button color="inherit" onClick={handleClickOpen}>New Post</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {posts.map((post) => (
              <BlogPost key={post.id} {...post} />
            ))}
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={newPost.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BlogPage;
