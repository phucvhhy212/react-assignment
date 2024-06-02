
import {
    Box, Button, ClickAwayListener, Container, Grow, Link, MenuItem, MenuList, Paper, Popper, Stack, TextField, Typography
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';


export default function Navs() {
    const [open, setOpen] = useState(false);
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
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box sx={{ backgroundColor: '#F5F5F5'}}>
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
                                placement="bottom-start"
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
                                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
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
                    <img style={{ height: '100%' }} src='https://www.pngitem.com/pimgs/m/665-6657133_library-management-system-logo-png-transparent-png.png'></img>
                </Box>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField size='small' label='Search for books by title, description, publisher,...' sx={{ width: '70%' }} />
                    <Button>Search</Button>
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
                <Link underline='none' href="#" color="white">Home</Link>
                <Link underline='none' href="#" color="white">Categories</Link>
                <Link underline='none' href="#" color="white">Books</Link>
                <Link underline='none' href="#" color="white">About</Link>
                <Link underline='none' href="#" color="white">Contact</Link>
            </Box>
        </>
    )
}