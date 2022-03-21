import { useState, useEffect } from 'react';
import { validateInput } from '../utils';
import { useAppContext } from '../context/AppContext';
import { setLearningResources } from '../context/actions';
import { v4 as uuidv4 } from 'uuid';

export const useInput = initialValue => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [error, setError] = useState(false);

    const handleChange = e => {
        setInputValue(e.currentTarget.value);
        setError(
            validateInput(e.currentTarget.type, e.currentTarget.value)
        );
    };

    return {
        value: inputValue,
        setValue: setInputValue,
        error,
        onChange: handleChange,
    };
};

export const useCheckbox = initialValue => {
    const [checked, setChecked] = useState(initialValue);

    const handleChange = e => {
        setChecked(!checked);
    };

    return { checked, onChange: handleChange };
};

export const useLearningResources = learningResourceType => {
    const { dispatch, applicationState } = useAppContext();
    const { user } = applicationState;
    const { id } = user;
    const resources = applicationState[learningResourceType];

    const getData = async () => {
        await setLearningResources(dispatch, id, learningResourceType);
    };

    useEffect(() => {
        if (resources.length === 0) {
            getData();
            console.log('resources length was 0');
        }
    }, [learningResourceType]);

    return resources;
};

export const useSearchResults = initialData => {
    const [searchResults, setSearchResults] = useState();

    const handleSearch = val => {
        if (!val) return;

        const results = initialData.filter(
            resource =>
                resource.title.toLowerCase().includes(val.toLowerCase()) ||
                resource.description
                    .toLowerCase()
                    .includes(val.toLowerCase())
        );
        setSearchResults(results);
    };

    const clearSearchResults = () => {
        setSearchResults(null);
    };

    return [searchResults, handleSearch, clearSearchResults];
};

export const usePortal = () => {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`portal-${uuidv4()}`);

    useEffect(() => {
        const div = document.createElement('div');
        div.id = portalId;
        div.style = `position: fixed; z-index: 1000;`;
        document.getElementsByTagName('body')[0].prepend(div);
        setLoaded(true);
        return () => {
            document.getElementsByTagName('body')[0].removeChild(div);
        };
    }, []);

    return { loaded, portalId };
};
