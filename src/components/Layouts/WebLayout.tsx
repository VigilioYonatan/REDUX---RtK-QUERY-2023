import { Outlet } from "react-router-dom";

function WebLayout() {
    return (
        <div>
            <header>this is a header</header>
            <Outlet />
            <footer>this is a footer</footer>
        </div>
    );
}

export default WebLayout;
