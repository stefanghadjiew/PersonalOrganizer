import React from 'react';
import ReactPlayer from 'react-player';

import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';

const VideoPlayer = ({ url }) => {
    return (
        <ClickAwayListener>
            <div>
                <ReactPlayer url={url} controls={true} />
            </div>
        </ClickAwayListener>
    );
};

export default VideoPlayer;
