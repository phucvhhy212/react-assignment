
import {
    Box, Button, ClickAwayListener, Container, Grow, Link, MenuItem, MenuList, Paper, Popper, Stack, TextField, Typography
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { useBookFilterContext } from '../context/bookFilterContext';
import { getUserRequest } from '../services/userRequestService';
import { toast } from 'react-toastify';
import { useCountBookInRequestContext } from '../context/countBookInRequestContext';
import { jwtDecode } from 'jwt-decode';


export default function Navs() {
    const {filter,setFilter,categoryId,setCategoryId} = useBookFilterContext()
    const {requestCount,setRequestCount} = useCountBookInRequestContext()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [filterBackground,setFilterBackground] = useState('')
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/Login")
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    const handleSearch = () => {
        setCategoryId("")
        setFilter(filterBackground)
        setFilterBackground("")
        navigate("/books")
    }
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    useEffect(() => {
        if(localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")).role == "User"){
            getUserRequest().then(res => {
                if (res.data.statusCode === 200) {
                    setRequestCount(res.data.total)
                }
                else{
                    toast.error(res.data.message)
                }
            }).catch(e => {console.log(e); toast.error("Server error")})
        }
    },[requestCount])

    return (
        <>
            <Box sx={{ backgroundColor: '#F5F5F5' }}>
                <Container component="section" sx={{ p: 1, textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }} >
                        <div>
                            <Button
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                sx={{ backgroundColor: 'white', color: 'black' }}
                            >
                                My Account
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-end"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    {localStorage.getItem("token") ? (
                                                        <>
                                                            {jwtDecode(localStorage.getItem("token")).role == "User" ?
                                                            <><MenuItem component={'a'} href='/borrowing' sx={{width: '150px'}} onClick={handleClose}>My Request</MenuItem>
                                                            <MenuItem component={'a'} href='/history' sx={{width: '150px'}} onClick={handleClose}>Request History</MenuItem></> : <MenuItem component={'a'} href='/admin/books' sx={{width: '150px'}} onClick={handleClose}>Admin Page</MenuItem>}
                                                            <MenuItem sx={{width: '150px'}} onClick={handleLogout}>Logout</MenuItem>
                                                        </>
                                                    ) : (
                                                        <MenuItem component={'a'} href='/Login' sx={{width: '150px'}} onClick={handleClose}>Login</MenuItem>
                                                    )}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ display: 'flex', height: '70px' }}>
                <Box>
                    <img style={{ height: '100%' }} src={`${process.env.PUBLIC_URL}/library.png`}></img>
                </Box>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField size='small' inputProps={{ maxLength: 25 }} label='Search for books by title, description, publisher,...' sx={{ width: '70%' }} onChange={(e) => setFilterBackground(e.target.value)}/>
                    <Button onClick={handleSearch}>Search</Button>
                </Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography variant='subtitle2'>Library Service</Typography>
                    <Typography variant='h6'>+0123456789</Typography>
                </Box>
            </Container>
            <Box sx={{ backgroundColor: '#3D464D', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mb: 4 }}>
                <Link underline='none' href="/" color="white">Home</Link>
                <Link underline='none' href="#" color="white">Categories</Link>
                <Link underline='none' href="/books" color="white">Books</Link>
                <Link underline='none' href="#" color="white">About</Link>
                <Link underline='none' href="#" color="white">Contact</Link>
                {localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")).role == "User" && <Link underline='none' href="/borrowing" color="white"><CardMembershipIcon/>{requestCount}</Link>}
                
            </Box>
        </>
    )
}