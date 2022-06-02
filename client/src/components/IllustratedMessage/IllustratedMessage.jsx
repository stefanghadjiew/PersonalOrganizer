import React from 'react';
import classes from './styles.module.css';
import NoResultsFoundSvg from '../../assets/images/NoResultsFound.svg';
import Title from '../Title/Title.jsx';
import Subtitle from '../Subtitle/Subtitle.jsx';

const IllustratedMessage = ({
    title = 'No results found',
    description = 'Try changing your search criteria.',
    imgSrc = NoResultsFoundSvg,
    button,
}) => {
    return (
        <div className={classes['illustrated-message-container']}>
            <img src={imgSrc} alt="No results found" />
            <Title type="h2" text={title} style={{ paddingBottom: 0 }} />
            <Subtitle text={description} />
        </div>
    );
};

export default IllustratedMessage;
