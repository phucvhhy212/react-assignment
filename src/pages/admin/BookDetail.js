import TextField from '@mui/material/TextField';

import LayoutAdmin from '../../components/LayoutAdmin';
import { Grid, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getBookDetail } from '../../services/bookService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export function BookDetail() {
  const params = useParams()
  const [book, setBook] = useState({})
  useEffect(() => {
    getBookDetail(params.id)
      .then(res => setBook(res.data.body))
      .catch(e => toast.error("Server error"))
  }, [])
  return (
    <LayoutAdmin>
      <Typography variant='h4'>Book Detail</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.id}
            id="outlined-disabled"
            label="Id"
            margin="dense"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.name}
            id="outlined-disabled"
            label="Name"
            margin="dense"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.publisher}
            id="outlined-disabled"
            label="Publisher"
            margin="dense"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.author}
            id="outlined-disabled"
            label="Author"
            margin="dense"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.publicationDate?.slice(0,10)}
            id="outlined-disabled"
            label="Publication Date"
            margin="dense"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={book.category}
            id="outlined-disabled"
            label="Category"
            margin="dense"
          />
        </Grid>
        <Grid item xs={6} back>
          <img width={"200px"} src={book.image}></img>
        </Grid>
      </Grid>
    </LayoutAdmin>
  );
}