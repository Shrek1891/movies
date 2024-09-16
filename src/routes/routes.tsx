import {createBrowserRouter,} from "react-router-dom";
import {Actors, MovieInformation, Movies, Profile} from "../components";

export const router = createBrowserRouter(
    [{
        path: "/",
        element: <Movies/>,
    },
        {
            path: "/movie/:id",
            element: <MovieInformation/>
        },
        {
            path: "actors/:id",
            element: <Actors/>
        },
        {
            path: "profile/:id",
            element: <Profile/>
        }
    ]
);