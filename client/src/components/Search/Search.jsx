import React from 'react';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import { useInput } from '../../customHooks';
import classes from './styles.module.css';
/* import { actionTypes } from '../../context/actionTypes.js';
import { useAppContext } from '../../context/AppContext.js'; */

const Search = ({ handleSearch, clearSearch, style }) => {
    const searchInput = useInput('');
    /* const { dispatch } = useAppContext(); */
    return (
        <div style={style} className={classes.search}>
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
                            /* dispatch({
                                type: actionTypes.SET_TRIGGER_RERENDER,
                            }); */
                        }}
                    />
                )}
                <Button
                    text="Search"
                    style={{ padding: '0.5rem 1rem' }}
                    onClick={() => {
                        handleSearch(searchInput.value);
                    }}
                    disabled={searchInput.value === ''}
                />
            </div>
        </div>
    );
};

export default Search;
