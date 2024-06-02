import { Box, Typography } from "@mui/material";

export default function Title(props) {
    return (
        <Box
            component="h2"
            className="section-title"
            sx={{
                position: 'relative',
                textTransform: 'uppercase',
                '&::after': {
                    position: 'absolute',
                    content: '""',
                    width: '100%',
                    height: '0',
                    top: '50%',
                    left: '0',
                    borderTop: '1px dashed #bec5cb',
                    zIndex: '-1'
                }
            }}
        >
            <Typography
                component="span"
                variant="h4"
                sx={{
                    display: 'inline-block',
                    paddingRight: 1,
                    color: '#3D464D',
                    fontWeight: 700,
                    backgroundColor: '#F5F5F5'
                }}
            >
                {props.title}
            </Typography>
        </Box>
    )
}