import React from 'react';
import pageNotFoundSvg from '../../assets/images/PageNotFound.svg';
import { Page } from '../../containers';
import { Title, Subtitle, Button } from '../../components';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Page orientation="horizontal">
            <div className={classes.content}>
                <Title text="404" textStyle={{ fontSize: '5rem' }} />
                <Subtitle
                    text="Looks like this page is missing."
                    wrapperStyle={{ paddingBottom: '1rem' }}
                    textStyle={{ fontSize: '2rem' }}
                />
                <Subtitle
                    text="It is not safe to be alone in the unknown"
                    textStyle={{ fontSize: '1.5rem' }}
                />
                <Subtitle
                    type="h4"
                    text="Let us navigate you back to safety :)"
                    wrapperStyle={{ paddingBottom: '1rem' }}
                />
                <Button
                    text="Back Home"
                    onClick={() => navigate('/javascript')}
                />
            </div>
            <div className={classes.illustration}>
                <img
                    src={pageNotFoundSvg}
                    alt="page not found"
                    className={classes.image}
                />
            </div>
        </Page>
    );
};

export default ErrorPage;
