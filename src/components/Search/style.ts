import {makeStyles} from "@mui/styles";

export default makeStyles((theme) => ({
    searchContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            width: '100%',
        },
    },
    input: {
        color:theme.palette.mode === 'light' ? 'white' : 'black',
        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'invert(0)',
        [theme.breakpoints.down('sm')]: {
            marginTop: '-10px',
            marginBottom: '10px',
        }
    }
}))