import NavBar from "./NavBar/NavBar.tsx";
import {Outlet} from "react-router-dom";
import useStyles from "../styles.ts";
import {useTheme} from "@mui/material";

const AppLayout = () => {
    const theme = useTheme()
    const classes = useStyles(theme)
    return (
        <>
            <div className={classes.root}>
                <NavBar/>
                <main className={classes.content}>
                    <div className={classes.toolbar}>
                        <Outlet/>
                    </div>
                </main>
            </div>
        </>
    )

}
export default AppLayout