import useStyles from './styles.js'
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const FeaturesMovies = ({movies}) => {
    const classes = useStyles()
    if (!movies) return null

    return (
        <Box component={Link} to={`/movie/${movies.id}`}  className={classes.featuredCardContainer}>
        <Card className={classes.card} classes={{root: classes.cardRoot}}>
            <CardMedia
                media="picture"
                alt={movies.title}
                image={`https://image.tmdb.org/t/p/original/${movies?.backdrop_path}`}
                title={movies.title}
                className={classes.cardMedia}
            />
            <Box padding="20px">
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {movies.title}
                    </Typography>
                    <Typography variant="body2">
                        {movies.overview}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
        </Box>
    )
}
export default FeaturesMovies