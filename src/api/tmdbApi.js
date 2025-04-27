import Genre from "../pages/genre/Genre";   
import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

export const movieType = {
    
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

export const genre = [
]

export const getMovieByGenre = async (genreId, params) => {
    try {
        const movieRes = await axiosClient.get('discover/movie', {
            params: {
                with_genres: genreId,
                ...params,
            },
        });

        const tvRes = await axiosClient.get('discover/tv', {
            params: {
                with_genres: genreId,
                ...params,
            },
        });

        const combinedResults = [...(movieRes.results || []), ...(tvRes.results || [])];

        return {
            results: combinedResults,
            total_pages: Math.max(movieRes.total_pages || 0, tvRes.total_pages || 0),
        };
    } catch (err) {
        console.error('Error fetching movies and tv shows by genre:', err);
        return { results: [], total_pages: 0 };
    }
};


const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
    personDetail: (personId) => {
        const url = `person/${personId}`;
        return axiosClient.get(url, {params: {}});
    },
    personMovieCredits: (personId) => {
        const url = `person/${personId}/movie_credits`;
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;