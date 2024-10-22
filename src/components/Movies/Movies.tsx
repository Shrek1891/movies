import {useGetMoviesQuery} from "../../services/TMDB.ts";
import MovieList from "../MovieList/MovieList.tsx";
import {Box, CircularProgress, Typography, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import FeaturesMovies from "../FeaturesMovie/featuresMovies.tsx";
import {MovieProps} from "../types/types.ts";

const Movies = () => {
    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'))
    const [page, setPage] = useState(1)
    const {genreCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory)
    const {data, error, isFetching}: { data: MovieProps, error: boolean, isFetching: boolean } = useGetMoviesQuery({genreCategoryName, page, searchQuery})
    const numberOfMovies = lg ? 18 : 16
    const randomNumber = Math.floor(Math.random() * 20) + 1
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem"/>
            </Box>
        )
    }
    if (!data.results.length) {
        return (
            <Box display="flex" alignItems="center" mt="20px">
                <Typography variant="h4">
                    No movies found
                </Typography>
            </Box>
        )
    }
    if (error) return 'An error has occurred'

    return (
        <div style={{padding: '2rem'}}>
            <FeaturesMovies movies={data.results[randomNumber]}/>
            <MovieList movies={data} numberOfMovies={numberOfMovies}/>
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
        </div>
    )
}

export default Movies