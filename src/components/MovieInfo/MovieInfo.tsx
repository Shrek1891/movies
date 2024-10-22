import {Link, useParams} from "react-router-dom";
import {tmdbApiKey, useGetListQuery, useGetMovieQuery, useGetRecomandationsQuery} from "../../services/TMDB.ts";
import {Box, Button, ButtonGroup, CircularProgress, Grid2, Modal, Rating, Typography} from "@mui/material";
import useStyles from "./style.ts";
import genreIcons from "../../assets/genres/index.js";
import {useDispatch, useSelector} from "react-redux";
import {selectGenreCategory} from "../../features/currentGenreOrCategory.ts";
import {
    ArrowBack,
    Favorite,
    FavoriteBorderOutlined,
    Language,
    MovieCreation,
    PlusOne,
    Remove,
    Theaters
} from "@mui/icons-material";
import MovieList from "../MovieList/MovieList.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {favoriteProps, MovieInfoProps, watchListProps} from "../types/types.ts";


const MovieInfo = () => {
    const {user} = useSelector((state) => state.user)
    const classes = useStyles()
    const {id} = useParams()
    const {data: recomandations,}: { data: MovieInfoProps, isFetching: boolean } = useGetRecomandationsQuery({
        list: 'recommendations',
        id
    })
    const {data: favoriteMovies,}: { data: favoriteProps, isFetching: boolean } = useGetListQuery({
        listName: 'favorite/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1
    })
    const {data: watchListMovies}: { data: watchListProps, isFetching: boolean } = useGetListQuery({
        listName: 'watchlist/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1
    })
    const [open, setOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isWatchList, setIsWatchList] = useState(false)
    const {data, isFetching, error}: {
        data: MovieInfoProps,
        isFetching: boolean,
        error: boolean
    } = useGetMovieQuery(id)
    useEffect(() => {
        setIsFavorite(
            !!favoriteMovies?.results.find((movie) => movie?.id === data?.id)
        )
    }, [favoriteMovies, data])
    useEffect(() => {
        setIsWatchList(
            !!watchListMovies?.results.find((movie) => movie?.id === data?.id)
        )
    }, [watchListMovies, data])
    const dispatch = useDispatch()
    if (isFetching) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            > <CircularProgress size="8rem"/> </Box>
        )
    }
    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            > <Link to="/"> Something went wrong - go back</Link> </Box>
        )
    }
    const addToFavorite = async () => {
        await axios.post(
            `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('session_id')}`,
            {
                media_type: 'movie',
                media_id: id,
                favorite: !isFavorite
            }
        );
        setIsFavorite((prev) => !prev)
    }
    const addToWatchList = async () => {
        await axios.post(
            `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('session_id')}`,
            {
                media_type: 'movie',
                media_id: id,
                watchlist: !isWatchList
            }
        );
        setIsWatchList((prev) => !prev)
    }
    return (
        <Grid2 container className={classes.containerSpaceAround}>
            <Grid2 item sm={12} lg={4}>
                <img
                    className={classes.poster}
                    src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                    alt={data?.title}
                />
            </Grid2>
            <Grid2 item container>
                <Grid2 item container direction="column" lg={7}>
                    <Typography variant="h3" align="center" gutterBottom>
                        {data?.title} ({data?.release_date.split('-')[0]})
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        {data?.tagline}
                    </Typography>
                    <Grid2 item className={classes.conteinerSpaceAround}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Rating readOnly value={data?.vote_average / 2}/>
                            <Typography variant="subtitle1" gutterBottom style={{marginLeft: '10px'}}>
                                {data?.vote_average} / 10
                            </Typography>
                        </Box>
                        <Typography variant="h6" align="center" gutterBottom>
                            {data?.runtime} minutes
                            / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : 'No data'}
                        </Typography>
                    </Grid2>
                    <Grid2 item className={classes.genreContainer}>
                        {data?.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                onClick={() => dispatch(selectGenreCategory(genre.id))}
                                className={classes.links}
                                to={`/`}
                            >
                                <img src={genreIcons[genre.name.toLowerCase()]} alt="logo"
                                     className={classes.genreImage}
                                     height={30}/>
                                <Typography color="textPrimary" variant="subtitle1">
                                    {genre.name}
                                </Typography>
                            </Link>
                        ))}
                    </Grid2>
                    <Typography variant="h5" gutterBottom style={{marginTop: '10px'}}>
                        Overview
                    </Typography>
                    <Typography style={{marginBottom: '2rem'}}>
                        {data?.overview}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Top Cast
                    </Typography>
                    <Grid2 item container spacing={2}>
                        {data && data.credits?.cast.map((credit, i) => (
                            credit.profile_path && (<Grid2
                                key={i}
                                item
                                xs={4}
                                md={2}
                                component={Link}
                                to={`/actors/${credit.id}`}
                                style={{textDecoration: 'none'}}
                            >
                                <img
                                    style={{display: 'block', margin: '0 auto'}}
                                    className={classes.castImage}
                                    src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                                    alt={credit.name}
                                />
                                <Typography color="textPrimary" align="center">{credit.name}</Typography>
                                <Typography color="textSecondary"
                                            align="center">{credit.character.split('/')[0]}</Typography>

                            </Grid2>)
                        )).slice(0, 12)}
                    </Grid2>
                    <Grid2 item container style={{marginTop: '2rem'}}>
                        <div className={classes.buttonsContainer}>
                            <Grid2 item xs={12} sm={6} className={classes.buttonsContainer}>
                                <ButtonGroup size="medium" variant='outlined'>
                                    <Button target="_blank" rel="noopener noreferrer" href={data.homepage}
                                            endIcon={<Language/>}>
                                        Website
                                    </Button>
                                    <Button target="_blank" rel="noopener noreferrer"
                                            href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                            endIcon={<MovieCreation/>}>
                                        IMDB
                                    </Button>
                                    <Button onClick={() => setOpen(true)}
                                            endIcon={<Theaters/>}>
                                        Trailer
                                    </Button>
                                </ButtonGroup>
                            </Grid2>
                            <Grid2 item xs={12} sm={6} className={classes.buttonsContainer}>
                                <ButtonGroup size="small" variant='outlined'>
                                    <Button onClick={addToFavorite}
                                            endIcon={isFavorite ? <FavoriteBorderOutlined/> : <Favorite/>}>
                                        {isFavorite ? 'UnFavorite' : 'Favorite'}
                                    </Button>
                                    <Button onClick={addToWatchList}
                                            endIcon={isWatchList ? <Remove/> : <PlusOne/>}>
                                        {isWatchList ? 'Remove' : 'Add to watchlist'}
                                    </Button>
                                    <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main'}} component={Link}
                                            to="/">
                                        <Typography color="inherit" variant="subtitle2"
                                                    style={{textDecoration: 'none'}}>
                                            Back
                                        </Typography>
                                    </Button>
                                </ButtonGroup>
                            </Grid2>
                        </div>
                    </Grid2>
                </Grid2>
                <Box marginTop='5rem' width="100%">
                    <Typography variant="h3" gutterBottom align="center">
                        You may also like
                    </Typography>
                    {recomandations && <MovieList movies={recomandations} numberOfMovies={8}/>}
                </Box>
                <Modal
                    closeAfterTransition
                    className={classes.modal}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {data?.videos?.results?.length > 0 ? (
                        <iframe
                            className={classes.video}
                            title="Trailer"
                            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                        />
                    ) : (
                        <div className={classes.noVideo}>
                            <Typography variant="h5">
                                No Trailer
                            </Typography>
                        </div>
                    )

                    }

                </Modal>
            </Grid2>
        </Grid2>
    )
}

export default MovieInfo