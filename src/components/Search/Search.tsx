import useStyles from './style.ts'
import {InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import {Search as SearchIcon} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {searchMovie} from "../../features/currentGenreOrCategory.ts";
import {useLocation} from "react-router-dom";

const Search = () => {
    const classes = useStyles()
    const [query, setQuery] = useState('')
    const dispatch = useDispatch();
    const location = useLocation()
    if (location.pathname !== '/') return null

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchMovie(query))
        }
    }
    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyDown={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                placeholder="Search for movies"
                size="small"
                slotProps={{
                    input: {
                        className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }
                }}
            />
        </div>
    )
}

export default Search