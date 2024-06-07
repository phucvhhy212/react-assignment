import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
  } from "@mui/material";
  import { Formik, Form, ErrorMessage } from "formik";
  import LayoutAdmin from "../../components/LayoutAdmin";
  import * as Yup from 'yup';
  import { getStorageUrl, uploadFile,getObjectVersionId } from "../../services/storageService";
  import { createCategory } from "../../services/categoryService";
  import { useEffect, useState } from "react";
  import { getCategories } from "../../services/categoryService";
  import { toast } from "react-toastify";
  
  export default function CreateCategory() {
    const validationSchema = Yup.object({
      name: Yup.string().required('Required').max(30),
      image: Yup.mixed().required('Required'),
    });
    const initialValue = {
      name: "",
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
        .then(() => createCategory(values))
        .then((res) => {
          if(res.data.statusCode === 200) {
            toast.success("Add new category successfully!")
          }
          else{
            toast.error("Add new category failed!")
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
              <Typography variant="h5">Add new Category</Typography>
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(props) => {
                  const { name } = props.values;
                  return (
                    <Form>
                      {/* First Way */}
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
          <Button href="/admin/categories">Back to List</Button>
          <Grid item sm={3} xs={false}></Grid>
        </Grid>
      </LayoutAdmin>
    );
  };
  
  
  