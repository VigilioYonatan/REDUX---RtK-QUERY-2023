import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebRouter from "./WebRouter";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<WebRouter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
