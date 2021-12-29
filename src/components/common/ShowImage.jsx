import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ShowImage = ({ image }) => {
    return (
        <LazyLoadImage
        effect="blur"
            src={`https://toplearnapi.ghorbany.dev/${image}`}
            onError={e => e.target.src = 'https://via.placeholder.com/150x100'} 
        />

    )
}
export default ShowImage