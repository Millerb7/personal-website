import React from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid, Button } from '@mui/material';

const blogPosts = [
  {
    title: 'Post 1',
    content: 'This is a snippet of the first post...',
    id: 1,
  },
  {
    title: 'Post 2',
    content: 'This is a snippet of the second post...',
    id: 2,
  },
];

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
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Blog</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {blogPosts.map((post) => (
              <BlogPost key={post.id} {...post} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BlogPage;
