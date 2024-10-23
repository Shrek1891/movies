import {createBrowserRouter,} from "react-router-dom";
import Actors from "../components/Actors/Actors.jsx";
import Profile from "../components/Profile.jsx";
import Movies from "../components/Movies/Movies.jsx";
import AppLayout from "../components/AppLayout.jsx";
import MovieInfo from "../components/MovieInfo/MovieInfo.jsx";


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
            },
            {
                path: "/approved*",
                element: <Movies/>
            }

        ]
    },

    ]
);