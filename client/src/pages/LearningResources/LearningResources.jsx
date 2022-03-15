import React, { useEffect } from 'react';
import { setLearningResources } from '../../context/actions';
import { Page } from '../../containers';
import { Card } from '../../components';
import { useAppContext } from '../../context/AppContext';

const LearningResources = () => {
    const { dispatch, applicationState } = useAppContext();
    const { user } = applicationState;
    const { id } = user;
    const { learningResources } = applicationState || null;

    const getData = async () => {
        await setLearningResources(dispatch, id);
    };

    useEffect(() => {
        getData();
    }, []);

    const renderLearningResources = learningResources?.map(
        learningResource => (
            <Card key={learningResource._id} content={learningResource} />
        )
    );

    return (
        <Page>
            {renderLearningResources}
            {/* <Title/>
                <Search/>
                <GridLayout/> */}
        </Page>
    );
};

export default LearningResources;

//CREATE USER AVATAR COMPONENT
//CREATE SIGN UP PAGE
//FIX NAVBAR FOR LOGGED USER
//SEARCH COMPONENT
//CREATE CARD COMPONENT
