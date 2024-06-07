import { useEffect, useState } from "react";
import { getBorrowingRequestDetail } from "../../services/borrowingRequestService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutAdmin from "../../components/LayoutAdmin";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function BorrowingRequestDetail() {
    const params = useParams()
    const [request, setRequest] = useState()
    useEffect(() => {
        getBorrowingRequestDetail(params.id).then(res => {
            if (res.data.statusCode == 200) {
                setRequest(res.data.body);
            }
        }).catch(e => { console.log(e); toast.error("Server error") })
    }, [])
    return (
        <LayoutAdmin>
            <Typography variant='h4'>Request Detail</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={request?.status}
                        id="outlined-disabled"
                        label="Status"
                        margin="dense"
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={request?.requester}
                        id="outlined-disabled"
                        label="Requester"
                        margin="dense"
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={request?.dateRequested.slice(0,10)}
                        id="outlined-disabled"
                        label="Date requested"
                        margin="dense"
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={request?.approver}
                        id="outlined-disabled"
                        label="Approver"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={6} back>
                    <Typography variant='h5'>Books</Typography>
                    {
                        request?.books?.map(item => (
                            <Box>
                                <Typography variant="subtitle2">{item.id}</Typography>
                                <Typography variant="subtitle2">{item.name}</Typography>
                                <img width={"100px"} src={item.image}></img>
                            </Box>
                        ))
                    }
                </Grid>
                <Button href="/admin/borrowingRequests">Back to List</Button>

            </Grid>
        </LayoutAdmin>
    )
}