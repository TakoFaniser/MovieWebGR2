import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../../components/movie-card/MovieCard';

import './actor.scss';

const Actor = () => {
    const { id } = useParams();

    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12); // 👈 Bắt đầu hiện 12 phim

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const actorRes = await tmdbApi.personDetail(id);
                setActor(actorRes);

                const movieRes = await tmdbApi.personMovieCredits(id);
                setMovies(movieRes.cast || []);
            } catch (err) {
                console.error('Failed to fetch actor:', err);
            }
        };
        fetchActor();
    }, [id]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 12); // 👈 Mỗi lần Load More +12 phim
    };

    if (!actor) return <div>Loading...</div>;

    return (
        <div className="actor-page container">
            <div className="actor-info">
                <div className="actor-info__image">
                    <img src={apiConfig.originalImage(actor.profile_path)} alt={actor.name} />
                </div>
                <div className="actor-info__details">
                    <h1>{actor.name}</h1>
                    <p>{actor.biography ? actor.biography : "No biography available."}</p>
                </div>
            </div>

            <div className="actor-movies">
                <h2>Movies</h2>
                <div className="movie-grid">
                    {movies.slice(0, visibleCount).map((item, i) => (
                        <MovieCard category="movie" item={item} key={i} />
                    ))}
                </div>

                {visibleCount < movies.length && (
                    <div className="actor-movies__loadmore">
                        <button onClick={loadMore}>Load More</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Actor;
