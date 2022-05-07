import React from 'react';
import ReactPlayer from 'react-player';
import classes from './styles.module.css';

const VideoPlayer = ({ url }) => {
    return (
        <div className={classes.responsiveReactPlayer}>
            <ReactPlayer url={url} controls={true} />
        </div>
    );
};

export default VideoPlayer;
