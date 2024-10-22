import {useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import {useGetListQuery} from "../services/TMDB.ts";
import RateCards from "./RateCards/RateCards.tsx";
import {useEffect} from "react";
import {favoriteProps, watchListProps} from "./types/types.ts";

const Profile = () => {
    const {user} = useSelector((state) => state.user)
    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    const {data: favoriteMovies, refetch: refetchFavorite}: {
        data: favoriteProps,
        refetch: () => void
    } = useGetListQuery({
        listName: 'favorite/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1
    })
    const {data: watchListMovies, refetch: refetchWatchList}: {
        data: watchListProps,
        refetch: () => void
    } = useGetListQuery({
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