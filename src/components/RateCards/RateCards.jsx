import useStyles from "./style.js"
import {Box, Typography} from "@mui/material";
import Movie from "../Movie/Movie.jsx";

const RateCards = ({title, data}) => {
    const classes = useStyles()
    return (
        <Box>
            <Typography
                variant="h5"
                gutterBottom
            >
                {title}
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                className={classes.container}
            >
                {data?.results.map((movie, i) => (
                    <div key={movie.id}>
                        <Movie movie={movie} i={i}/>
                    </div>
                ))}
            </Box>
        </Box>
    )
}

export default RateCards