
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, InputLabel, TextField, Pagination, Box, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Modal } from '@mui/material';

import { changeBorrowingRequestStatus, getBorrowingRequests } from '../../services/borrowingRequestService';
import LayoutAdmin from '../../components/LayoutAdmin';
import { ArrowDownward, ArrowUpward, Create, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function BorrowingRequest() {
    const navigate = useNavigate();
    const [borrowingRequests, setBorrowingRequests] = useState([])
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('')
    const [name, setName] = useState('')
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState();
    const handleOpen = (request) => {
        setSelectedRequest(request)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleChangeStatus = () => {
        const params = {
            id: selectedRequest.id,
            status: selectedRequest.status
        }
        changeBorrowingRequestStatus(params).then(res => {
            if (res.data.statusCode === 200) {
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch(e => { console.log(e); toast.error("Server error") })
            .finally(() => { setOpen(false); setLoad(!load) })
    }
    const handleOnChangePageSize = (e) => {
        setPageSize(e.target.value)
        setCurrentPage(1)
    }

    const handleOnSearch = (value) => {
        setName(value)
        setCurrentPage(1)
    }

    const handleOnChangeSortOrder = (key, order) => {
        setSortBy(key)
        setSortOrder(order)
    }

    useEffect(() => {
        const params = {
            currentPage,
            pageSize,
            name,
            sortOrder,
            sortBy
        }
        getBorrowingRequests(params)
            .then(response => {
                setBorrowingRequests(response.data.body);
                return response
            })
            .then(response => setTotalItem(response.data.total))
            .catch(e => { console.log(e); toast.error("Server error") })
    }, [pageSize, currentPage, name, sortBy, sortOrder, load])


    return (
        <>
            <LayoutAdmin>
                <Box p={4}>
                    <Typography variant='h3' mb={2}>Borrowing Requests</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box>
                            <InputLabel id="page-size-label">Entries per page</InputLabel>
                            <Select
                                labelId="page-size-label"
                                id="page-size-select"
                                value={pageSize}
                                onChange={handleOnChangePageSize}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                            <TextField
                                id="search"
                                label="Search"
                                type="search"
                                variant="outlined"
                                onChange={(e) => handleOnSearch(e.target.value)}
                                inputProps={{ maxLength: 25 }}
                            />
                        </Box>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Id
                                    <span>
                                        <ArrowUpward onClick={() => handleOnChangeSortOrder("Id", "asc")} />
                                        <ArrowDownward onClick={() => handleOnChangeSortOrder("Id", "desc")} />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    Requester
                                    <span>
                                        <ArrowUpward onClick={() => handleOnChangeSortOrder("Requester", "asc")} />
                                        <ArrowDownward onClick={() => handleOnChangeSortOrder("Requester", "desc")} />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    Request Date
                                    <span>
                                        <ArrowUpward onClick={() => handleOnChangeSortOrder("Date", "asc")} />
                                        <ArrowDownward onClick={() => handleOnChangeSortOrder("Date", "desc")} />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    Status
                                    <span>
                                        <ArrowUpward onClick={() => handleOnChangeSortOrder("Status", "asc")} />
                                        <ArrowDownward onClick={() => handleOnChangeSortOrder("Status", "desc")} />
                                    </span>
                                </TableCell>

                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {borrowingRequests.map(borrowingRequest =>
                                <TableRow key={borrowingRequest.id}>
                                    <TableCell>{borrowingRequest.id}</TableCell>
                                    <TableCell>{borrowingRequest.requester}</TableCell>
                                    <TableCell>{borrowingRequest.dateRequested.slice(0, 10)}</TableCell>
                                    <TableCell>{borrowingRequest.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => navigate(`/admin/borrowingRequests/${borrowingRequest.id}`)}>
                                            <Visibility />
                                        </IconButton>
                                        <IconButton disabled={borrowingRequest.status==="Approved"} onClick={() => handleOpen(borrowingRequest)}>
                                            <Create />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Box>Showing {(currentPage - 1) * pageSize + 1} to {totalItem < pageSize * currentPage ? totalItem : pageSize * currentPage} of {totalItem} entries</Box>
                        <Pagination
                            count={Math.ceil(totalItem / pageSize)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                        />
                    </Box>
                </Box>
            </LayoutAdmin>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
                    <Select fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        onChange={event =>
                            setSelectedRequest({ ...selectedRequest, status: event.target.value })
                        }
                        defaultValue={selectedRequest?.status}
                    >
                        <MenuItem value='Waiting'>Waiting</MenuItem>
                        <MenuItem value='Approved'>Approved</MenuItem>
                        <MenuItem value='Rejected'>Rejected</MenuItem>
                    </Select>
                    <Box textAlign={"end"}>
                        <Button onClick={() => handleChangeStatus()}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}