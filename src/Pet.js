import React from 'react';
import { Link } from '@reach/router';

export default function Pet({ animal, name, breed, media, location, id }) {

    let hero = "http://placecorgi.com/300/300";
    if (media.length > 0) {
        hero = media[0].small;
    }

    return (
        /*
        * when we a, it unmounts the present component and
        * mounts the new component whereas Link looks for the 
        * new component in browser history 
        * something like that happens ..............*/
        <Link to={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{`${animal} - ${breed} - ${location}`}</h2>
            </div>
        </Link>
    )
};