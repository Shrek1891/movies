import {makeStyles} from "@mui/styles";


export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px 0 !important',
        padding: '20px',
        color:theme.palette.mode === 'light' ? 'black' : 'white',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
        }
    },
    poster: {
        borderRadius: '20px',
        boxShadow: '0 0 40px -10px rgba(0, 0, 0, 0.25)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '50%',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
        },

    },
    genreContainer: {
        margin: '10px 0 !important',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    genreImage: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
        marginRight: '10px',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem',
        },
    },
    castImage: {
        width: '100%',
        maxWidth: '7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '50%',
        height: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '90%',
        },
    },



}))