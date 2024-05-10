import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../src/components/Root";
import Home from "../src/pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
        ]
    },
]);

export default router;