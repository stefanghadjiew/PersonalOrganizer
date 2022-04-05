export const appState = {
    isLoading: false,
    theme: {
        dark: false,
        light: true,
    },
    backdrop: {
        open: false,
        child: {
            component: null,
            isOpen: false,
            componentId: null,
        },
    },
    results_per_page: 12,
    user: null,
    messageToast: [],
    javascript: [],
    css: [],
    reactjs: [],
    testing: [],
    databases: [],
    nodejs: [],
    npmPackages: [],
    projects: [],
    books: [],
    futureProjects: [],
    others: [],
    triggerRerender: false, // just change value from true to false to force a re-render and use it in the useLearningResources hook to fetch latest data
};
