import useStyles from "./style.ts"
import {Grid2} from "@mui/material";
import Movie from "../Movie/Movie.tsx";


const MovieList = ({movies, numberOfMovies}) => {
    const classes = useStyles()
    return (
        <Grid2 container className={classes.moviesContainer}>
            {movies.results.slice(0, numberOfMovies).map((movie, i) => (
                <div key={i}>
                    <Movie movie={movie} i={i}/>
                </div>

            ))}
        </Grid2>
    )
}

export default MovieList