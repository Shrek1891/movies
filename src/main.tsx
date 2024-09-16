import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {router} from "./routes/routes.tsx";
import {RouterProvider} from "react-router-dom";
import {NavBar} from "./components";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NavBar/>
        <RouterProvider router={router}/>
    </StrictMode>,
)
