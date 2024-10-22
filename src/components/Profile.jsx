import {useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import {useGetListQuery} from "../services/TMDB.js";
import RateCards from "./RateCards/RateCards.jsx";
import {useEffect} from "react";

const Profile = () => {
    const {user} = useSelector((state) => state.user)
    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    const {data: favoriteMovies, refetch: refetchFavorite} = useGetListQuery({
        listName: 'favorite/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1
    })
    const {data: watchListMovies, refetch: refetchWatchList} = useGetListQuery({
        listName: 'watchlist/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1
    })

    useEffect(() => {
        refetchFavorite()
        refetchWatchList()
    }, [])

    return (
        <div>
            <Box>
                <Box display="flex" justifyContent="space-between" mt="70px">
                    <Typography variant="h4" gutterBottom>
                        My Profile
                    </Typography>
                    <Button color="inherit" onClick={logout}>
                        Logout &nbsp; <ExitToApp/>
                    </Button>
                </Box>
                {!favoriteMovies?.results?.length && !watchListMovies?.results?.length ?
                    <Typography variant="h5"> Add favorite movies </Typography>
                    : (
                        <Box>
                            <RateCards title="Favorite Movies" data={favoriteMovies}/>
                            <RateCards title="Watchlist Movies" data={watchListMovies}/>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}

export default Profile