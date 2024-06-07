
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, InputLabel, TextField, Pagination, Box, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { deleteCategory, getCategories } from '../../services/categoryService';
import LayoutAdmin from '../../components/LayoutAdmin';
import { ArrowDownward, ArrowUpward, Create, Visibility, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('')
    const [name, setName] = useState('')
    const [load,setLoad] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedCategory(id);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
    const handleDelete = (id) => {
        deleteCategory(id)
            .then(res => {
                if (res.data.statusCode === 200) {
                    toast.success(res.data.message)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch(e => toast.error("Server error"))
            .finally(() => {setOpen(false); setLoad(true)})
    }
    useEffect(() => {
        const params = {
            currentPage,
            pageSize,
            name,
            sortOrder,
            sortBy
        }
        getCategories(params)
            .then(response => {
                setCategories(response.data.body);
                return response
            })
            .then(response => setTotalItem(response.data.total))
            .catch(e => { console.log(e); toast.error("Server error") })
    }, [pageSize, currentPage, name, sortBy, sortOrder,load])


    return (
        <>
            <LayoutAdmin>
                <Box p={4}>
                    <Typography variant='h3' mb={2}>Categories</Typography>
                    <Button href='/admin/categories/create'>Create New</Button>
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
                                    Name
                                    <span>
                                        <ArrowUpward onClick={() => handleOnChangeSortOrder("Name", "asc")} />
                                        <ArrowDownward onClick={() => handleOnChangeSortOrder("Name", "desc")} />
                                    </span>
                                </TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category =>
                                <TableRow key={category.id}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => navigate(`/admin/categories/${category.id}`)}>
                                            <Visibility />
                                        </IconButton>
                                        <IconButton onClick={() => navigate(`/admin/categories/edit/${category.id}`)}>
                                            <Create />
                                        </IconButton>
                                        <IconButton onClick={() => handleClickOpen(category.id)}>
                                            <Delete />
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete category {selectedCategory} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => handleDelete(selectedCategory)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}