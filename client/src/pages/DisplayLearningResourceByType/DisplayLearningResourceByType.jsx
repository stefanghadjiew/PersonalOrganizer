import React from 'react';
import { Page } from '../../containers';
import {
    Card,
    Title,
    Subtitle,
    Search,
    Button,
    FramerMotionAnimations,
    CreateResourceDialog,
    Pagination,
    Select,
    IllustratedMessage,
} from '../../components';
import { GridLayout } from '../../layouts';
import {
    useLearningResources,
    useSearchResults,
    usePagination,
} from '../../customHooks';

import { useAppContext } from '../../context/AppContext';
import { AnimatePresence } from 'framer-motion';
import { openBackdropWithChild } from '../../context/actions';
import { useNavigate } from 'react-router-dom';

const DisplayLearningResourceByType = ({ learningResourceType }) => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const resources = useLearningResources(learningResourceType);

    const {
        paginatedResources,
        goToNextPage,
        goToPreviousPage,
        changePage,
        getPaginationGroup,
        currentPage,
        setCurrentPage,
        pages,
        setPages,
    } = usePagination(resources);

    const [searchResults, handleSearch, clearSearchResults] =
        useSearchResults(paginatedResources);

    const renderLearningResources = paginatedResources?.map(
        learningResource => (
            <FramerMotionAnimations
                animationType="left-to-right"
                key={learningResource._id}
            >
                <Card
                    key={learningResource._id}
                    content={learningResource}
                    learningResourceType={learningResourceType}
                />
            </FramerMotionAnimations>
        )
    );

    const renderSearchResults = searchResults?.map(result => (
        <FramerMotionAnimations
            animationType="left-to-right"
            key={result._id}
        >
            <Card
                key={result._id}
                content={result}
                learningResourceType={learningResourceType}
            />
        </FramerMotionAnimations>
    ));

    return (
        <Page>
            <Button
                text="Error"
                onClick={() => {
                    navigate('/dasdwads');
                }}
            />
            <Title text={learningResourceType} />
            <Subtitle
                text={`Number of resources: ${
                    searchResults
                        ? searchResults.length
                        : resources?.length
                }`}
            />
            <Subtitle
                text={`Displayed: ${
                    searchResults
                        ? searchResults.length
                        : paginatedResources?.length
                }`}
            />
            <Select learningResourceType={learningResourceType} />

            <Button
                text="Add New Resource"
                style={{ width: '200px', marginBottom: '3rem' }}
                onClick={() => {
                    openBackdropWithChild(
                        <CreateResourceDialog
                            learningResourceType={learningResourceType}
                        />,
                        dispatch
                    );
                }}
            />

            <Search
                handleSearch={handleSearch}
                clearSearch={clearSearchResults}
            />
            {searchResults !== null && searchResults.length === 0 ? (
                <IllustratedMessage />
            ) : (
                <GridLayout>
                    <AnimatePresence exitBeforeEnter>
                        {searchResults
                            ? renderSearchResults
                            : renderLearningResources}
                    </AnimatePresence>
                </GridLayout>
            )}

            <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                changePage={changePage}
                getPaginationGroup={getPaginationGroup}
                currentPage={currentPage}
                pages={pages}
                //passing search results and functionality so that i can build a logic not to display pagination if there are no search results
                handleSearch={handleSearch}
                searchResults={searchResults}
                setCurrentPage={setCurrentPage}
                setPages={setPages}
            />
        </Page>
    );
};

export default DisplayLearningResourceByType;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
