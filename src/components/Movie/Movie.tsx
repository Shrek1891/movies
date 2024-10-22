import useStyles from "./style"
import {Grid2, Grow, Rating, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Movie = ({movie, i}) => {
    const classes = useStyles()
    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
            <Grow in key={i} timeout={250 * (i + 1)}>
                <Link className={classes.links} to={`/movie/${movie.id}`}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className={classes.image}
                        />
                    ) : (
                        <img
                            src={"https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/268c4b03-533f-4e81-aec1-0c22df466a90/defb7131-2643-4637-aea6-aaabeda85b18.png"}
                            alt={movie.title}
                            className={classes.image}
                        />
                    )}
                    <Typography className={classes.title} variant="h5">{movie.title}</Typography>
                    <Tooltip disableTouchListener title={`${(movie.vote_average)}/10`}>
                        <div>
                            <Rating readOnly value={movie.vote_average / 2} precision={0.1}/>
                        </div>
                    </Tooltip>
                </Link>
            </Grow>
        </Grid2>
    )
}

export default Movie