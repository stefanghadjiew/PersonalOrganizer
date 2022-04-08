import React from 'react';
import './styles.css';
import { useAppContext } from '../../context/AppContext';

const Page = ({ children }) => {
    const { applicationState } = useAppContext();
    const { theme } = applicationState;
    return (
        <div
            className={
                theme.light ? 'page-wrapper' : 'page-wrapper darkTheme'
            }
        >
            {children}
        </div>
    );
};

export default Page;
