import React, { useEffect } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import IconButton from '../IconButton/IconButton';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Pagination = ({
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginationGroup,
    currentPage,
    pages,
    handleSearch,
    searchResults,
    setCurrentPage,
    setPages,
}) => {
    const { applicationState } = useAppContext();
    const { theme } = applicationState;

    useEffect(() => {
        if (searchResults?.length === 0) {
            setCurrentPage(1);
            setPages(1);
        }
    }, [handleSearch]);

    const renderPaginationButtons = getPaginationGroup().map(
        (item, idx) => (
            <button
                key={idx}
                onClick={changePage}
                className={
                    currentPage === item
                        ? `${classes.paginationButton} ${classes.currentPageButton}`
                        : classes.paginationButton
                }
            >
                {item}
            </button>
        )
    );

    return (
        <div className={classes.pagination}>
            <IconButton
                icon={
                    <AiOutlineDoubleLeft
                        className={
                            theme.light
                                ? `${classes.iconColorLight}`
                                : `${classes.iconColorDark}`
                        }
                    />
                }
                tooltip="previous page"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
            />
            {renderPaginationButtons}
            <IconButton
                icon={
                    <AiOutlineDoubleRight
                        className={
                            theme.light
                                ? classes.iconColorLight
                                : classes.iconColorDark
                        }
                    />
                }
                tooltip="next page"
                onClick={goToNextPage}
                disabled={currentPage === pages}
            />
        </div>
    );
};

export default Pagination;
