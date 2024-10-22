import {createBrowserRouter,} from "react-router-dom";
import Actors from "../components/Actors/Actors.tsx";
import Profile from "../components/Profile.tsx";
import Movies from "../components/Movies/Movies.tsx";
import AppLayout from "../components/AppLayout.tsx";
import MovieInfo from "../components/MovieInfo/MovieInfo.tsx";


export const router = createBrowserRouter(
    [{
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/movie/:id",
                element: <MovieInfo/>
            },
            {
                path: "actors/:id",
                element: <Actors/>
            },
            {
                path: "profile/:id",
                element: <Profile/>
            },
            {
                path: "/",
                element: <Movies/>
            },
            {
                path: "*",
                element: <Movies/>
            }

        ]
    },

    ]
);