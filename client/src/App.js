import AppRouter from './Router.js';
import { MessageToast, ScrollToTopButton } from './components/index.js';
import { AppContextProvider } from './context/AppContext';
import { AppLayout, PageLayout } from './layouts';
import { SideBar, Navbar } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import BackdropPortal from './BackdropPortal/BackdropPortal.jsx';
import { useMediaQueries } from './responsive/useMediaQueries.js';

function App() {
    const { isMobile } = useMediaQueries();

    return (
        <AppLayout>
            <AppContextProvider>
                <Router>
                    <ScrollToTopButton />
                    {!isMobile && <SideBar />}
                    <PageLayout>
                        <Navbar />
                        <AppRouter />
                    </PageLayout>
                    <MessageToast />
                    <BackdropPortal />
                </Router>
            </AppContextProvider>
        </AppLayout>
    );
}

export default App;
