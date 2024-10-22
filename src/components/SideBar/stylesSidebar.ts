import {makeStyles} from "@mui/styles";

export default makeStyles((theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0'
    },
    image: {
        width: '70%',
    },
    highleiter: {
        fontWeight: 'bold',
        color: "white",
        fontSize: '2.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
        textShadow: '2px 2px 1px #000000,2px -1px 1px #000000, -1px 1px 1px #000000, -1px -1px 1px #000000',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        [theme.palette.mode === 'dark' ? 'textShadow' : 'textShadow']: '2px 2px 1px #000000,2px -1px 1px #000000, -1px 1px 1px #000000, -1px -1px 1px #000000',
    },

    link: {
        textDecoration: 'none',
        color:theme.palette.text.primary
    },
    genreImages: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
    }
}))