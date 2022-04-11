import React, { useRef, useEffect, useState } from 'react';
import classes from './styles.module.css';
import imgSrc from '../../assets/images/login-page.jpg';
import { Button } from '../';
import { Image } from '../../containers';
import { openBackdropWithChild } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const Card = ({ content, learningResourceType }) => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
        useState(false);
    const cardRef = useRef();
    const viewResourceButtonRef = useRef();
    const { dispatch, applicationState } = useAppContext();
    const { backdrop } = applicationState;
    const { title, description, img, link, _id } = content || null;

    const openInVideoPlayer = () => {
        openBackdropWithChild(<VideoPlayer url={link} />, dispatch);
    };

    const confirmationDialogState = {
        isConfirmationDialogOpen,
        setIsConfirmationDialogOpen,
    };

    useEffect(() => {
        if (!backdrop.open && cardRef.current) {
            cardRef.current.parentElement.style.zIndex = 1;
        }
    }, [backdrop.open]);

    const openConfirmDialog = () => {
        if (cardRef.current) {
            setIsConfirmationDialogOpen(true);
            openBackdropWithChild(null, dispatch);
            cardRef.current.parentElement.style.zIndex = 11;
            if (viewResourceButtonRef.current)
                viewResourceButtonRef.current.classList.add(
                    classes.disableButton
                );
        }
    };

    return (
        <div className={classes.card} ref={cardRef}>
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
                    onClick={openInVideoPlayer}
                />
                <Button
                    ref={viewResourceButtonRef}
                    style={{ backgroundColor: '#d32f2f' }}
                    text="Delete Resource"
                    onClick={openConfirmDialog}
                />
            </div>
            <ConfirmationDialog
                confirmationDialogState={confirmationDialogState}
                resourceId={_id}
                learningResourceType={learningResourceType}
            />
        </div>
    );
};

export default Card;
