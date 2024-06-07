import TextField from '@mui/material/TextField';

import LayoutAdmin from '../../components/LayoutAdmin';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCategoryDetail } from '../../services/categoryService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export function CategoryDetail() {
  const params = useParams()
  const [category, setCategory] = useState({})
  useEffect(() => {
    getCategoryDetail(params.id)
      .then(res => setCategory(res.data.body))
      .catch(e => toast.error("Server error"))
  }, [])
  return (
    <LayoutAdmin>
      <Typography variant='h4'>Category Detail</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={category.id}
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
            value={category.name}
            id="outlined-disabled"
            label="Name"
            margin="dense"
          />
        </Grid>
        <Grid item xs={6} back>
          <img width={"200px"} src={category.image}></img>
        </Grid>
        <Button href="/admin/categories">Back to List</Button>
      </Grid>
    </LayoutAdmin>
  );
}