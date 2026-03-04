import { Route, Routes, useNavigate, useHref } from "react-router-dom";
import AppPage from "@pages/MainPage";
import TestPage from "./pages/TestPage";
import type { NavigateOptions } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
    // Here we will give each page a path and route to it
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" element={<AppPage />}></Route>
        <Route path="/inventory/products"></Route>
        <Route path="/inventory/restock"></Route>
        <Route path="/reports"></Route>
        <Route path="/purchasing"></Route>
        <Route path="/admin"></Route>
        <Route path="/help"></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </HeroUIProvider>
  );
}

export default App;
