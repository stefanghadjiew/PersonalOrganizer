import React from 'react';
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
import { useLearningResources, useSearchResults } from '../../customHooks';
import { CreateResourceDialog } from '../../components';
import { useAppContext } from '../../context/AppContext';
import { AnimatePresence } from 'framer-motion';
import { openBackdropWithChild } from '../../context/actions';

const DisplayLearningResourceByType = ({ learningResourceType }) => {
    const resources = useLearningResources(learningResourceType);
    const { dispatch } = useAppContext();

    const [searchResults, handleSearch, clearSearchResults] =
        useSearchResults(resources);

    const renderLearningResources = resources?.map(learningResource => (
        <FramerMotionAnimations
            key={learningResource._id}
            animationType="left-to-right"
        >
            <Card content={learningResource} key={learningResource._id} />
        </FramerMotionAnimations>
    ));

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
        </Page>
    );
};

export default DisplayLearningResourceByType;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
