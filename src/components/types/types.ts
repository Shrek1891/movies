export interface ActorProps {
    id: string,
    name: string,
    birthday: string,
    place_of_birth: string,
    profile_path: string,
    biography: string,
    popularity: number,
    imdb_id: string,
    homepage: string
}

export interface MovieProps {
    results: MovieInfoProps[]
    id: string,
    title: string,
    release_date: string,
    vote_average: number,
    overview: string,
    poster_path: string
    total_pages: number
}

export interface MovieInfoProps {
    id: string
    title: string
    release_date: string
    vote_average: number
    overview: string
    genres: { id: number, name: string }[]
    runtime: number
    production_companies: { id: number, name: string }[]
    production_countries: { iso_3166_1: string, name: string }[]
    spoken_languages: { iso_639_1: string, name: string }[]
    homepage: string
    tagline: string
    poster_path: string
    credits: {
        cast: { name: string, character: string, profile_path: string, id: number }[],
        crew: { name: string, job: string, profile_path: string }[]
    }
    videos: { results: { name: string, key: string }[] }
    imdb_id: string

}

export interface favoriteProps {
    results: { id: number, poster_path: string, backdrop_path: string, title: string, vote_average: number }[]

}

export interface watchListProps {
    results: { id: number, poster_path: string, backdrop_path: string, title: string, vote_average: number }[]
}


export interface Actors {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: string
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string

}

export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}