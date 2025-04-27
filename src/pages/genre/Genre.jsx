import React, { useState } from 'react';
import MovieGrid from '../../components/movie-grid/MovieGrid';

const Genre = ({ match }) => {
    const genreId = match.params.genreId;

    const [activeCategory, setActiveCategory] = useState('movie'); 
    

    return (
        <div className="container">
            
            <MovieGrid genreId={genreId} category={activeCategory} />
        </div>
    );
};

export default Genre;
