import { Providers, TopProviders } from './providers';
import { AppRoutes } from './routes';

export const App = () => {
    return (
        <TopProviders>
            <Providers>
                <AppRoutes />
            </Providers>
        </TopProviders>
    );
};

export default App;
