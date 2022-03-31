import React from 'react';
import classes from './styles.module.css';
import imgSrc from '../../assets/images/login-page.jpg';
import { Button } from '../';
import { Image } from '../../containers';

const Card = ({ content }) => {
    const { title, description, img, link } = content || null;

    return (
        <div className={classes.card}>
            <a href={link} className={classes.link}>
                {link}
            </a>
            <Image src={img || imgSrc} alt={description} />
            <div className={classes.cardContent}>
                <div className={classes.title}>
                    <h3>{title}</h3>
                </div>
                <div className={classes.description}>
                    <p>{description || 'No description avaliable'}</p>
                </div>
            </div>
            <div className={classes.actions}>
                <Button
                    style={{ backgroundColor: '#4caf50' }}
                    text="View Resource"
                />
                <Button
                    style={{ backgroundColor: '#d32f2f' }}
                    text="Delete Resource"
                />
            </div>
        </div>
    );
};

export default Card;
