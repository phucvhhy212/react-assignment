import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import LayoutAdmin from "../../components/LayoutAdmin";
import { DatePicker } from "@mui/x-date-pickers";
import { getStorageUrl, uploadFile,getObjectVersionId } from "../../services/storageService";
import { createBook } from "../../services/bookService";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";
import * as Yup from 'yup';
export default function CreateBook() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required').max(40),
    publisher: Yup.string().required('Required').max(40),
    description: Yup.string().nullable(),
    author: Yup.string().required('Required').max(40),
    publicationDate: Yup.date().required('Required'),
    categoryId: Yup.string().required('Required'),
    image: Yup.mixed().required('Required'),
  });
  const initialValue = {
    name: "",
    publisher: "",
    description: "",
    author: "",
    categoryId: "",
    publicationDate: "",
    image: ""
  };
  const handleSubmit = (values) => {
    let key = values.image.name
    let imageUrl = ""
    console.log(values);
    getStorageUrl(values)
      .then(res => uploadFile(res.data.body, values.image))
      .then(res => {
        imageUrl = res.url.split("?", 1)
        return res
      })
      .then(() => getObjectVersionId(key)).then(res => {
        imageUrl += "?versionId=" + res.data.body
        values = { ...values, image: imageUrl }
        console.log(values);
      })
      .then(() => createBook(values))
      .then((res) => {
        if(res.data.statusCode === 200) {
          toast.success("Add new book successfully!")
        }
        else{
          toast.error("Add new book failed!")
        }
      })
      .catch((e) => toast.error("Something wrong!"))
  };
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(res => setCategories(res.data.body)).catch(e=>toast.error("Server error"))
  }, [])

  return (
    <LayoutAdmin>
      <Grid>
        <Grid item sm={6} xs={12}>
          <Box m={3} p={1}>
            <Typography variant="h5">Add new Book</Typography>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => {
                const { name } = props.values;
                return (
                  <Form>
                    <TextField
                      label="Name"
                      name="name"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      value={name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="name" />}
                      error={props.errors.name && props.touched.name}
                      required
                    />
                    <Field
                      as={TextField}
                      label="Publisher"
                      name="publisher"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="publisher" />}
                      error={props.errors.publisher && props.touched.publisher}
                      required
                    />

                    <Field
                      as={TextField}
                      label="Description"
                      name="description"
                      type="textarea"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="description" />}
                      error={
                        props.errors.description && props.touched.description
                      }
                    />

                    <Field
                      as={TextField}
                      label="Author"
                      name="author"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="author" />}
                      error={props.errors.author && props.touched.author}
                      required
                    />

                    <DatePicker
                      label="Date"
                      value={props.values.date}
                      onChange={(date) => props.setFieldValue('publicationDate', date.format("YYYY-MM-DD"))}
                      sx={{ width: '100%' }}
                      required
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={props.touched.date && Boolean(props.errors.date)}
                          helperText={props.touched.date && props.errors.date}
                          
                        />
                      )}
                    />

                    <InputLabel  id="demo-simple-select-label">Category</InputLabel>
                    <Select fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      value={props.values.categoryId}
                      onChange={(event) =>
                        props.setFieldValue("categoryId", event.target.value)
                      }
                      required
                    >
                      {categories.map(c=>(
                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                      ))}
                    </Select>

                    <TextField
                      name="image"
                      type="file"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      onChange={(event) =>
                        props.setFieldValue("image", event.target.files[0])
                      }
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="image" />}
                      error={props.errors.image && props.touched.image}
                      required
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Grid>
        <Button href="/admin/books">Back to List</Button>
        <Grid item sm={3} xs={false}></Grid>
      </Grid>
    </LayoutAdmin>
  );
};


