import AppRouter from './Router.js';
import { MessageToast } from './components/index.js';
import { AppContextProvider } from './context/AppContext';
import { AppLayout, PageLayout } from './layouts';
import { SideBar, Navbar } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import BackdropPortal from './BackdropPortal/BackdropPortal.jsx';

function App() {
    return (
        <AppLayout>
            <AppContextProvider>
                <Router>
                    <SideBar />
                    <PageLayout>
                        <Navbar />
                        <MessageToast />
                        <AppRouter />
                    </PageLayout>
                </Router>
                <BackdropPortal />
            </AppContextProvider>
        </AppLayout>
    );
}

export default App;
