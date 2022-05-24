import React, { useState } from 'react';
import classes from './styles.module.css';
import IconButton from '../IconButton/IconButton';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Accordion = ({ children, content, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    const renderItems = children ? children : content;

    return (
        <div className={classes['accordion-wrapper']}>
            <div
                className={
                    isExpanded
                        ? `${classes.accordion} ${classes['accordion-expanded']}`
                        : classes.accordion
                }
            >
                <div
                    className={
                        isExpanded
                            ? `${classes['accordion-heading']} ${classes['accordion-heading-expanded']}`
                            : classes['accordion-heading']
                    }
                >
                    {title || 'No Title'}
                </div>
                <div className={classes.actionButton}>
                    <IconButton
                        tooltip={isExpanded ? 'Close' : 'Expand'}
                        icon={
                            <MdKeyboardArrowDown
                                className={
                                    isExpanded
                                        ? classes['icon-expanded']
                                        : classes.icon
                                }
                            />
                        }
                        onClick={handleExpandAccordion}
                    />
                </div>
            </div>
            <div
                className={
                    isExpanded
                        ? `${classes['accordion-content']} ${classes['accordion-content-expanded']}`
                        : classes['accordion-content']
                }
            >
                {renderItems}
            </div>
        </div>
    );
};

export default Accordion;
