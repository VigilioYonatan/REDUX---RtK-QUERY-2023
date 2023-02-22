import { useState } from "react";
import { Provider } from "react-redux/es/exports";
import { store } from "~/app/store";
import Router from "~/routers/Router";
function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
