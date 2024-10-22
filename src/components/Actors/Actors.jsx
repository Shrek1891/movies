import {useParams} from "react-router-dom";
import {useGetActorsDetailsQuery, useGetMoviesByActorIdQuery} from "../../services/TMDB.js";
import {Box, Button, CircularProgress, Grid2, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import useStyles from "./style.js";
import MovieList from "../MovieList/MovieList.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import {useState} from "react";


const Actors = () => {
    const classes = useStyles()
    const [page, setPage] = useState(1)
    const {id} = useParams();
    const {data, isFetching, error} = useGetActorsDetailsQuery(id);
    const {data: movies} = useGetMoviesByActorIdQuery({
        id,
        page
    });
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="8rem"/>
            </Box>
        )
    }
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                    An error has occurred
                </Typography>
                <Button
                    startIcon={<ArrowBack/>}
                    onClick={() => window.history.back()}
                    color="primary"
                >
                    Back
                </Button>
            </Box>
        )
    }
    return (
        <div className={classes.container}>
            <Grid2 container spacing={3} style={{justifyContent: 'center'}}>
                < Grid2 item lg={5} xl={4} display="flex" justifyContent="center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                        alt={data.name}
                        className={classes.image}
                    />
                </Grid2>
                <Grid2
                    item lg={7}
                    md={8}
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
                >
                    <Typography variant="h4" gutterBottom>{data.name}</Typography>
                    <Typography variant="h5" gutterBottom>
                        Born : {new Date(data.birthday).toDateString()}
                    </Typography>
                    <Typography variant="h5" gutterBottom>Biography</Typography>
                    <Typography
                        variant="body2"
                        align="justify"
                    >{data.biography}</Typography>
                    <Box
                        marginTop="2rem"
                        display="flex"
                        justifyContent="space-around"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            href={'https://www.imdb.com/name/' + data.imdb_id}
                        >
                            See on IMDB
                        </Button>
                        <Button startIcon={<ArrowBack/>} onClick={() => window.history.back()}>
                            Back
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
            <Box margin="2rem 0">
                <Typography variant="h4" align="center">Films</Typography>
                {movies && <MovieList movies={movies} numberOfMovies={24}/>}
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    totalPages={movies?.total_pages}
                />
            </Box>
        </div>
    )
}

export default Actors