import {
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    useTheme
} from "@mui/material";
import {Link} from "react-router-dom";
import useStyles from "./stylesSidebar.ts";
import {useGetGenresQuery} from "../../services/TMDB.ts";
import genreIcons from "../../assets/genres/index.js";
import {useDispatch, useSelector} from "react-redux";
import {selectGenreCategory} from "../../features/currentGenreOrCategory.ts";
import {useEffect} from "react";

const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'}
]

interface GenresProps {
    genres: { name: string, id: number }[]
}


const Sidebar = ({setMobileOpen}) => {
    const theme = useTheme()
    const {data, isFetching}: { data: GenresProps, error: boolean, isFetching: boolean } = useGetGenresQuery()
    const classes = useStyles()
    const dispatch = useDispatch()
    const {genreCategoryName} = useSelector((state) => state.currentGenreOrCategory)
    useEffect(() => {
        setMobileOpen(false)
    }, [genreCategoryName])
    return (
        <>
            <Link to="/" style={{textDecoration: 'none'}}>
                {theme.palette.mode === 'light' ? <p className={classes.highleiter}>Film Library</p> :
                    <p className={classes.highleiter}>Film Library</p>}
            </Link>
            <Divider/>
            <List>
                <ListSubheader>Categories</ListSubheader>
                {isFetching ? <Box display={"flex"} justifyContent={"center"}><CircularProgress
                    size="4rem"/></Box> : data.genres.map(({name: label, id: value}) => (
                    <Link key={value} className={classes.link} to="/">
                        <ListItem onClick={() => {
                            dispatch(selectGenreCategory(value))
                        }}>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} alt="logo" className={classes.genreImages}
                                     height={30}/>
                            </ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                <ListSubheader>Genres</ListSubheader>
                {categories.map(({label, value}) => (
                    <Link key={value} className={classes.link} to="/">
                        <ListItem onClick={() => {
                            dispatch(selectGenreCategory(label))
                        }}>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} alt="logo" className={classes.genreImages}
                                     height={30}/>
                            </ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItem>
                    </Link>
                ))}
            </List>

        </>

    )
}

export default Sidebar