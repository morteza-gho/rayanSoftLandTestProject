import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    const { status, data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    if (status === 200) {
      setPosts(data);
    }
  };

  const deletePost = async (item) => {
    if (window.confirm('Are You Sure To Delete This Post')) {
      const { status } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${item.id}`);
      if (status === 200) {
        const itemIndex = posts.findIndex(x => x.id === item.id);
        posts.splice(itemIndex, 1);
        setPosts([...posts]);
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const addPost = () => {
    setEditingPost(null);
    setPostTitle('');
    setPostBody('');
    setOpen(true);
  }

  const editPost = (item) => {
    setEditingPost(item);
    setPostTitle(item.title);
    setPostBody(item.body);
    setOpen(true);
  };

  const afterAddEditPost = () => {
    setPosts([...posts]);
    setPostTitle('');
    setPostBody('');
    setOpen(false);
  }

  const submitPostForm = async (e) => {
    e.preventDefault();

    const dataModel = {
      title: postTitle,
      body: postBody
    };

    if (editingPost) {
      // update post
      const { status, data } = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${editingPost.id}`, dataModel);
      if (status === 200) {
        const editedItem = posts.find(x => x.id === editingPost.id);
        Object.assign(editedItem, dataModel);
        afterAddEditPost();
      }

    } else {

      // add new post
      const { status, data } = await axios.post('https://jsonplaceholder.typicode.com/posts', dataModel);
      if (status === 201) {
        posts.unshift(data);
        setEditingPost(null);
        afterAddEditPost();
      }

    }

  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Posts List
        </Typography>

        <Grid container spacing={3}>

          <TableContainer component={Paper} sx={{ p: 3 }}>

            <Button variant="contained" size="large" sx={{ mb: 3 }} onClick={() => addPost()}>Add Post</Button>

            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Row</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="item" align="center">{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.body.length > 50 ? item.body.substring(0, 50) : item.body}</TableCell>
                    <TableCell>
                      <ButtonGroup size="small" variant="outlined">
                        <Button color="secondary" onClick={() => editPost(item)}>Edit</Button>
                        <Button color="error" onClick={() => deletePost(item)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={(event) => submitPostForm(event)}>
            <DialogTitle>Add New Post</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                type="text"
                label="Enter Post Title"
                fullWidth
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />

              <TextField
                margin="dense"
                type="text"
                label="Enter Post Body"
                fullWidth
                required
                multiline
                value={postBody}
                minRows="5"
                onChange={(e) => setPostBody(e.target.value)}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="success" type="submit">{editingPost ? 'Update' : 'Submit'}</Button>
            </DialogActions>
          </form>
        </Dialog>

      </Container>
    </>
  );
}
