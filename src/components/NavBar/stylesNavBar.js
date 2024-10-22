import {makeStyles} from "@mui/styles";

const drawerWidth = 240

export default makeStyles((theme) => ({

    appBarDark: {
        background: "black"
    },
    toolbar: {
        marginLeft: '240px',
        background:theme.palette.mode === 'light' ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' : 'dark',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexWrap: 'wrap',
        }
    },


    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },

    },
    drawerPaper: {
        width: drawerWidth,
    },
    linkButton: {
        '&:hover': {
            color: 'white !important',
            textDecoration: 'none'
        }
    }

}))