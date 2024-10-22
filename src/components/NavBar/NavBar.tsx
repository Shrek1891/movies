import {AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import useStyles from "./stylesNavBar.ts";
import {AccountCircle, Brightness4, Brightness7, Menu,} from "@mui/icons-material";
import Search from "../Search/Search.tsx";
import {useContext, useEffect, useState} from "react";
import Sidebar from "../SideBar/Sidebar.tsx";
import {Link} from "react-router-dom";
import {fetchToken, getSessionId, moviesApi} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../features/auth.ts";
import {ColorModeContext} from "../utils/ToggleColorMode.tsx";

const NavBar = () => {
    const {isAuthenticated, user} = useSelector((state) => state.user)
    const [mobileOpen, setMobileOpen] = useState(false)
    const matches = useMediaQuery('(max-width:600px)');
    const theme = useTheme()
    const classes = useStyles(theme)
    const colorMode = useContext(ColorModeContext)
    const token = localStorage.getItem('token')
    const sessionIdFromLocalStorage = localStorage.getItem('session_id')
    const dispatch = useDispatch()
    useEffect(() => {
        const logUser = async () => {

            if (token) {
                if (sessionIdFromLocalStorage) {
                    const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                    dispatch(setUser(userData))
                } else {
                    const sessionId = await getSessionId()
                    const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`)
                    dispatch(setUser(userData))
                }
            }
        }

        logUser();
    }, [token])

    return (
        <>
            <AppBar position="fixed" className={theme.palette.mode === 'dark' ? classes.appBarDark : classes.root}>
                <Toolbar className={classes.toolbar}>
                    {matches && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{outline: 'none'}}
                            onClick={() => {
                                setMobileOpen((prevState) => !prevState)

                            }}
                            className={classes.menuButton}
                        >
                            <Menu/>
                        </IconButton>
                    )}
                    <IconButton color="inherit" sx={{ml: 1}} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                    </IconButton>
                    {!matches && <Search/>}
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={fetchToken}>
                                Login &nbsp; <AccountCircle/>
                            </Button>
                        ) : (
                            <Button color="inherit" component={Link} to={`/profile/${user.id}`}
                                    className={classes.linkButton} onClick={() => console.log('clicked')}>
                                {!matches && <>My movies &nbsp;  </>}
                                <Avatar
                                    style={{width: 24, height: 24}}
                                    alt="Remy Sharp"
                                    src="https://avatar.iran.liara.run/public/31"
                                />
                            </Button>
                        )
                        }
                    </div>
                    {matches && 'Search...'}
                </Toolbar>
            </AppBar>
            <div>
                <nav className={classes.drawer}>
                    {matches ? (
                        <Drawer
                            onClose={() => setMobileOpen((prevState) => !prevState)}
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            className={classes.drawerBackground}
                            classes={{paper: classes.drawerPaper}}
                            ModalProps={{keepMounted: true}}
                        >
                            <Sidebar setMobileOpen={setMobileOpen}/>
                        </Drawer>

                    ) : (
                        <Drawer
                            open
                            variant={"permanent"}
                            classes={{paper: classes.drawerPaper}}>
                            <Sidebar setMobileOpen={setMobileOpen}/>
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    )
}

export default NavBar