import React, { useEffect } from 'react';
import { Page } from '../../containers';
import {
    Card,
    Title,
    Subtitle,
    Search,
    Button,
    FramerMotionAnimations,
} from '../../components';
import { GridLayout } from '../../layouts';
import {
    useLearningResources,
    useSearchResults,
    usePagination,
} from '../../customHooks';
import { CreateResourceDialog, Pagination } from '../../components';
import { useAppContext } from '../../context/AppContext';
import { AnimatePresence } from 'framer-motion';
import { openBackdropWithChild } from '../../context/actions';

const DisplayLearningResourceByType = ({ learningResourceType }) => {
    const resources = useLearningResources(learningResourceType);

    const {
        paginatedResources,
        goToNextPage,
        goToPreviousPage,
        changePage,
        getPaginationGroup,
        currentPage,
        pages,
    } = usePagination(resources);

    const { dispatch } = useAppContext();

    const [searchResults, handleSearch, clearSearchResults] =
        useSearchResults(paginatedResources);

    const renderLearningResources = paginatedResources?.map(
        learningResource => (
            <FramerMotionAnimations
                key={learningResource._id}
                animationType="left-to-right"
            >
                <Card
                    content={learningResource}
                    key={learningResource._id}
                />
            </FramerMotionAnimations>
        )
    );

    const renderSearchResults = searchResults?.map(result => (
        <Card key={result._id} content={result} />
    ));

    return (
        <Page>
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

            <Button
                text="Add New Resource"
                style={{ width: '200px', marginBottom: '3rem' }}
                onClick={() => {
                    openBackdropWithChild(
                        <CreateResourceDialog
                            learningResourceType={learningResourceType}
                            componentId="createResourceDialog-id"
                        />,

                        dispatch
                    );
                }}
            />

            <Search
                handleSearch={handleSearch}
                clearSearch={clearSearchResults}
            />
            <GridLayout>
                <AnimatePresence exitBeforeEnter>
                    {searchResults
                        ? renderSearchResults
                        : renderLearningResources}
                </AnimatePresence>
            </GridLayout>
            <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                changePage={changePage}
                getPaginationGroup={getPaginationGroup}
                currentPage={currentPage}
                pages={pages}
            />
        </Page>
    );
};

export default DisplayLearningResourceByType;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
