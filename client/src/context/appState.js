export const appState = {
    theme: {
        dark: false,
        light: true,
    },
    backdrop: {
        open: false,
        child: {
            component: null,
            isOpen: false,
        },
    },
    results_per_page: 6,
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
    currentlyDisplayedProject: null,
    triggerRerender: false, // just change value from true to false to force a re-render and use it in the useLearningResources hook to fetch latest data
};
