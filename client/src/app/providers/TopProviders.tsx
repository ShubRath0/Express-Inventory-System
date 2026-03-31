import { store } from "@/app/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

interface TopProviders {
    children: React.ReactNode;
}

export const TopProviders = ({ children }: TopProviders) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    );
};