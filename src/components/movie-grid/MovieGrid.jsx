import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { movieGenres, tvGenres } from '../../pages/genre/genrelist.js';
import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { getMovieByGenre } from '../../api/tmdbApi';

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [genreName, setGenreName] = useState('');

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
    
            if (props.genreId) {
                response = await getMovieByGenre(props.genreId, { page: 1 });
    
                // Set genre name dựa vào category
                if (props.category === category.movie) {
                    setGenreName(movieGenres[props.genreId] || 'Movie');
                } else {
                    setGenreName(tvGenres[props.genreId] || 'TV Series');
                }
            } else if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
    
            setItems(response.results);
            setTotalPage(response.total_pages);
            setPage(1);
        };
    
        getList();
    }, [props.category, keyword, props.genreId]);

    const loadMore = async () => {
        let response = null;
        const nextPage = page + 1;

        if (props.genreId) {
            response = await getMovieByGenre(props.genreId, { page: nextPage });
        } else if (keyword === undefined) {
            const params = { page: nextPage };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: nextPage,
                query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
        }

        setItems(prevItems => [...prevItems, ...response.results]);
        setPage(nextPage);
    };

    return (
        <div className="movie-grid-container">
           
            {props.genreId && (
                <div className="section mb-3">
                    <h2 className="genre-title">{genreName}</h2>
                </div>
            )}
            
            {props.genreId ? null : (
                <div className="section mb-3">
                    <MovieSearch category={props.category} keyword={keyword} />
                </div>
            )}
            <div className="movie-grid">
                {items.map((item, i) => (
                    <MovieCard category={props.category} item={item} key={i} />
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            )}
        </div>
    );
};

const MovieSearch = (props) => {
    const history = useHistory();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            let cat = props.category;

          
            if (!cat) {
                cat = 'movie';
            }

            history.push(`/${cat}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};

export default MovieGrid;
