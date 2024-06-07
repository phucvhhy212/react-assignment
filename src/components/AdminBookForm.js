export default function AdminBookForm(props) {
    const initialValue = {
        name: "",
        publisher: "",
        description: "",
        author: "",
        categoryId: "",
        publicationDate: "",
        image: ""
    };
    return (
        <LayoutAdmin>
            <Typography variant='h4'>Book Detail</Typography>
            <Formik
              initialValues={initialValue}
              // validationSchema={}
              onSubmit={props.handleSubmit}
            ></Formik>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        InputProps={{
                            readOnly: props.readOnly
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
                            readOnly: props.readOnly
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
                            readOnly: props.readOnly
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
                            readOnly: props.readOnly
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
                            readOnly: props.readOnly
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={book.publicationDate}
                        id="outlined-disabled"
                        label="Publication Date"
                        margin="dense"
                    />
                    <TextField
                        InputProps={{
                            readOnly: props.readOnly
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
                    <img src={book.image}></img>
                </Grid>
            </Grid>
        </LayoutAdmin>
    )
}