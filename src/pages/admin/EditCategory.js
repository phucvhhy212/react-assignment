import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import LayoutAdmin from "../../components/LayoutAdmin";
import * as Yup from 'yup';
import { getStorageUrl, uploadFile, getObjectVersionId } from "../../services/storageService";
import { editCategory, getCategoryDetail} from "../../services/categoryService";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function EditCategory() {
    const validationSchema = Yup.object({
        name: Yup.string().required('Required').max(30),
        image: Yup.mixed().required('Required'),
      });
    const params = useParams()
    const [tempImage, setTempImage] = useState()
    const [initialValue, setInitialValue] = useState({
        name: "",
        image: "",
    })
    useEffect(() => {
        getCategoryDetail(params.id)
            .then(res => setInitialValue(res.data.body))
            .catch(e => toast.error("Server error"))
    }, [])
    const handleSubmit = (values) => {
        if (tempImage) {
            let key = values.image.name
            let imageUrl = ""
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
                .then(() => {
                    var { category,id,...value } = values;
                    return editCategory(params.id,value)
                })
                .then((res) => {
                    if (res.data.statusCode === 200) {
                        toast.success("Edit new category successfully!")
                    }
                    else {
                        toast.error("Edit new category failed!")
                    }
                })
                .catch((e) => toast.error("Something wrong!"))
        }
        else {
            var { category,id,...value } = values;
            editCategory(params.id,value).then((res) => {
                if (res.data.statusCode === 200) {
                    toast.success("Edit new category successfully!")
                }
                else {
                    toast.error("Edit new category failed!")
                }
            })
            .catch((e) => toast.error("Server error"))
        }
        console.log(values);
    };
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then(res => setCategories(res.data.body)).catch(e => toast.error("Server error"))
    }, [])
    return (
        <LayoutAdmin>
            <Grid>
                <Grid item sm={6} xs={12}>
                    <Box m={3} p={1}>
                        <Typography variant="h5">Edit Category</Typography>
                        <Formik
                            initialValues={initialValue}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(props) => {
                                console.log(props);
                                return (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            label="Name"
                                            name="name"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
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
                                            onChange={(event) => {
                                                props.setFieldValue("image", event.target.files[0])
                                                if (tempImage) {
                                                    URL.revokeObjectURL(tempImage)
                                                }
                                                setTempImage(URL.createObjectURL(event.target.files[0]))
                                            }
                                            }
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="image" />}
                                            error={props.errors.image && props.touched.image}
                                            defaultValue={props.values.image}
                                        />
                                        <Box component={'img'} sx={{width:'200px'}} src={tempImage ?? props.values.image}>
                                        </Box>
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
    )
}