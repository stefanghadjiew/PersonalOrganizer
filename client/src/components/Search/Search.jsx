import React from 'react';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import { useInput } from '../../customHooks';
import classes from './styles.module.css';

const Search = ({ handleSearch, clearSearch }) => {
    const searchInput = useInput('');

    return (
        <div className={classes.search}>
            <Input
                type="text"
                label="Search resources"
                value={searchInput.value}
                onChange={searchInput.onChange}
                error={searchInput.error}
                style={{ height: '40px' }}
            />
            <div className={classes.actions}>
                {searchInput.value && (
                    <Button
                        text="Clear"
                        style={{
                            padding: '.5rem 1rem',
                            width: '125px',
                            transform: 'translateX(37.5px)',
                        }}
                        companion={true}
                        onClick={() => {
                            clearSearch();
                            searchInput.setValue('');
                        }}
                    />
                )}
                <Button
                    text="Search"
                    style={{ padding: '0.5rem 1rem' }}
                    onClick={() => {
                        handleSearch(searchInput.value);
                    }}
                />
            </div>
        </div>
    );
};

export default Search;
