import React from 'react';
import { Page } from '../../containers';
import { Card, Title, Subtitle, Search, Button } from '../../components';
import { GridLayout } from '../../layouts';
import { useLearningResources, useSearchResults } from '../../customHooks';
import { actionTypes } from '../../context/actionTypes';
import { CreateResourceDialog } from '../../components';
import { useAppContext } from '../../context/AppContext';

const DisplayLearningResourceByType = ({ learningResourceType }) => {
    const resources = useLearningResources(learningResourceType);
    const { dispatch } = useAppContext();

    const [searchResults, handleSearch, clearSearchResults] =
        useSearchResults(resources);

    const renderLearningResources = resources?.map(learningResource => (
        <Card key={learningResource._id} content={learningResource} />
    ));

    const renderSearchResults = searchResults?.map(result => (
        <Card key={result._id} content={result} />
    ));

    const addNewResource = () => {
        dispatch({
            type: actionTypes.SET_BACKDROP,
            payload: {
                open: true,
                child: (
                    <CreateResourceDialog
                        learningResourceType={learningResourceType}
                    />
                ),
            },
        });
    };

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
                onClick={addNewResource}
            />
            <Search
                handleSearch={handleSearch}
                clearSearch={clearSearchResults}
            />
            <GridLayout>
                {searchResults
                    ? renderSearchResults
                    : renderLearningResources}
            </GridLayout>
        </Page>
    );
};

export default DisplayLearningResourceByType;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
