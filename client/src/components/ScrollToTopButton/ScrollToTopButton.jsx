import React, { useState, useEffect } from 'react';
import IconButton from '../IconButton/IconButton';
import { MdKeyboardArrowUp } from 'react-icons/md';
import classes from './styles.module.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        /* scrolled > 300 ? setIsVisible(true) : setIsVisible(false); */
        if (scrolled > 300) {
            setIsVisible(true);
        } else if (scrolled <= 300) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible, {
            passive: true,
        });
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={classes['icon-button-container']}>
            <IconButton
                style={{ display: isVisible ? 'block' : 'none' }}
                tooltip="Scroll To Top"
                onClick={scrollToTop}
                icon={<MdKeyboardArrowUp className={classes.icon} />}
            />
        </div>
    );
};

export default ScrollToTopButton;
