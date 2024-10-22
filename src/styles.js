import {makeStyles} from "@mui/styles";

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        color: 'black',
        background: theme.palette.mode === 'light' ? 'white' : 'black',



    },
    toolbar: {
        height: '70px',

    },
    content: {
        flexGrow: 1,

    }
}))