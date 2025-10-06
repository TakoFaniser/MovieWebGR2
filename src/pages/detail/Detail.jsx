import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';

import {FacebookShareButton,TwitterShareButton,TelegramShareButton,FacebookIcon,TwitterIcon,TelegramIcon} from "react-share";
import {Helmet} from 'react-helmet-async';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    const shareUrl = window.location.href;
    
    return (
        <>
            {
                item && (
                    <>
                        <Helmet>
                            <title>{`${item.title || item.name} - TakoMovies`}</title>
                            <meta name="description" content={item.overview} />
                            <meta property="og:title" content={`${item.title || item.name} - TakoMovies`} />
                            <meta property="og:description" content={item.overview} />
                            <meta property="og:image" content={apiConfig.w500Image(item.poster_path || item.backdrop_path)} />
                            <meta property="og:url" content={window.location.href} />
                        </Helmet>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span 
                                                key={i} 
                                                className="genres__item" 
                                                onClick={() => window.location.href = `/genre/${genre.id}`}>
                                                {genre.name}
                                            </span>
                                        ))
                                    }
                                    
                                </div>
                                <div className="info">
                                    {item.number_of_episodes && (
                                        <p>Number of Episodes: {item.number_of_episodes}</p>
                                    )}
                                    {item.runtime && (
                                        <p>Run Time: {item.runtime} minutes</p>
                                    )}
                                
                                    {item.release_date && (
                                        <p>Release Date: {item.release_date}</p>
                                    )}
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="social-share mt-2">
                                    <h3 style={{color: 'white', marginBottom: '1rem'}}>Share:</h3>
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote={`Watch now! ${item.title || item.name}!`}
                                        hashtag="#takomovies"
                                    >
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={shareUrl}
                                        title={`Watch now! ${item.title || item.name}!`}
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>

                                    <TelegramShareButton
                                        url={shareUrl}
                                        title={`Watch now! ${item.title || item.name}!`}
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        <TelegramIcon size={40} round />
                                    </TelegramShareButton>
                                </div>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id} clickable={true} />
                                </div>
                            
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
