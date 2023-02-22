import { Route, Routes } from "react-router-dom";
import WebLayout from "~/components/Layouts/WebLayout";
import HomePage from "~/pages/HomePage";
import ShowPage from "~/pages/ShowPage";
function WebRouter() {
    return (
        <Routes>
            <Route element={<WebLayout />}>
                <Route index element={<HomePage />} />
                <Route path=":id" element={<ShowPage />} />
            </Route>
        </Routes>
    );
}

export default WebRouter;
