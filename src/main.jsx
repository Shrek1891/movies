import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from "./components/App.jsx";
import {Provider} from "react-redux";
import store from "./app/store.js";
import './index.css'
import ToggleColorMode from "./components/utils/ToggleColorMode.jsx";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToggleColorMode>
            <StrictMode>
                <App/>
            </StrictMode>
        </ToggleColorMode>
    </Provider>
)
