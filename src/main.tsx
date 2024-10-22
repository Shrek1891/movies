import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from "./components/App.tsx";
import {Provider} from "react-redux";
import store from "./app/store.ts";
import './index.css'
import ToggleColorMode from "./components/utils/ToggleColorMode.tsx";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToggleColorMode>
            <StrictMode>
                <App/>
            </StrictMode>
        </ToggleColorMode>
    </Provider>
)
