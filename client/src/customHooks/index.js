import { useState, useEffect } from 'react';
import { validateInput } from '../utils';
import { useAppContext } from '../context/AppContext';
import { setLearningResources } from '../context/actions';
import { useNavigate } from 'react-router-dom';

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
    const { user, triggerRerender } = applicationState;
    const { id } = user;
    const resources = applicationState[learningResourceType];

    const getData = async () => {
        await setLearningResources(dispatch, id, learningResourceType);
    };

    useEffect(() => {
        if (resources.length === 0) {
            getData();
        }
    }, [learningResourceType]);

    useEffect(() => {
        getData();
    }, [triggerRerender]);

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
        /* document.getElementById('root').prepend(div); */
        setLoaded(true);
        return () => {
            document.getElementsByTagName('body')[0].removeChild(div);
        };
    }, []);

    return { loaded, portalId };
};

export const usePagination = resources => {
    const navigate = useNavigate();
    const { applicationState } = useAppContext();
    const { results_per_page } = applicationState;
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedResources, setPaginatedResources] = useState([]);

    useEffect(() => {
        setCurrentPage(1);
    }, [navigate]);

    useEffect(() => {
        setPages(Math.ceil(resources.length / results_per_page));
    }, [resources, results_per_page]); // calculate number of pages

    useEffect(() => {
        getPaginatedData();
    }, [currentPage, resources, results_per_page]);

    const goToNextPage = () => {
        setCurrentPage(currentPage => currentPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage => currentPage - 1);
    };

    const changePage = e => {
        const pageNumber = +e.currentTarget.innerText;
        setCurrentPage(pageNumber);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pages) * pages;
        return new Array(pages).fill().map((_, idx) => start + idx + 1);
    };

    const getPaginatedData = () => {
        const startIndex =
            currentPage * results_per_page - results_per_page;
        const endIndex = startIndex + results_per_page;
        setPaginatedResources(resources.slice(startIndex, endIndex));
    };

    return {
        currentPage,
        pages,
        setPages,
        paginatedResources,
        goToNextPage,
        goToPreviousPage,
        changePage,
        setCurrentPage,
        getPaginationGroup,
    };
};
