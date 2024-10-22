import {makeStyles} from "@mui/styles";


export default makeStyles((theme) => ({
    image:{
        maxWidth: '90%',
        borderRadius: '20px',
        objectFit: 'cover',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        display: 'flex',
        justifyContent:'center'
    },
    container: {
        padding:"20px",
        marginTop: '60px',
        color:theme.palette.text.primary


    }

}))



