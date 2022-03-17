import React from 'react';
import { Page } from '../../containers';
import { Card, Title, Subtitle, Search } from '../../components';
import { learningResourcesType } from '../../context/learningResourcesType';
import { GridLayout } from '../../layouts';
import { useLearningResources, useSearchResults } from '../../customHooks';

const JavascriptResources = () => {
    const resources = useLearningResources(
        learningResourcesType.JAVASCRIPT
    );

    const [searchResults, handleSearch, clearSearchResults] =
        useSearchResults(resources);

    const renderLearningResources = resources?.map(learningResource => (
        <Card key={learningResource._id} content={learningResource} />
    ));

    const renderSearchResults = searchResults?.map(result => (
        <Card key={result._id} content={result} />
    ));

    return (
        <Page>
            <Title text="javascript" />
            <Subtitle
                text={`Number of resources: ${
                    searchResults
                        ? searchResults.length
                        : resources?.length
                }`}
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

export default JavascriptResources;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
