import axios from 'axios'

const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_REACT_APP_API_BASE_KEY
    }
})


const fetchToken = async () => {
    try {
        const {data} = await moviesApi.get('/authentication/token/new')
        const token = data.request_token
        if (data.success) {
            console.log(token)
            localStorage.setItem('token', token)
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }

    } catch (error) {
        console.log(error)
    }

}

const getSessionId = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const {data: {session_id}} = await moviesApi.post('/authentication/session/new', {
            request_token: token
        })
        localStorage.setItem('session_id', session_id)
        return session_id
    } catch (error) {
        console.log(error)
    }

}

export {fetchToken,getSessionId,moviesApi}