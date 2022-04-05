import React, { useState } from 'react';
import classes from './styles.module.css';

import { useAppContext } from '../../context/AppContext';
import { useLearningResources } from '../../customHooks';
import { setResultsPerPage } from '../../context/actions';
import { GoTriangleDown, GoTriangleLeft } from 'react-icons/go';

const Select = ({ learningResourceType }) => {
    const [openSelect, setOpenSelect] = useState(false);
    const resources = useLearningResources(learningResourceType);
    const { dispatch, applicationState } = useAppContext();
    const { results_per_page } = applicationState;
    const handleSelectChange = e => {
        setResultsPerPage(dispatch, +e.currentTarget.textContent);
        setOpenSelect(false);
    };
    const perPageValues = [6, 12, 24];

    const renderSelectItems = perPageValues.map(value => (
        <div
            key={value}
            onClick={handleSelectChange}
            className={
                resources.length < value
                    ? `${classes.selectItem} ${classes.disabled}`
                    : classes.selectItem
            }
        >
            {value}
        </div>
    ));

    return (
        <div className={classes.wrapper}>
            <div className={classes.select}>
                <div className={classes.label}>
                    Per page:
                    <div className={classes.perPageValue}>
                        {results_per_page}
                        <div
                            className={classes.icon}
                            onClick={() => setOpenSelect(!openSelect)}
                        >
                            {openSelect ? (
                                <GoTriangleDown />
                            ) : (
                                <GoTriangleLeft />
                            )}
                        </div>
                    </div>
                </div>
                {openSelect && (
                    <div className={classes.selectItems}>
                        {renderSelectItems}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;
