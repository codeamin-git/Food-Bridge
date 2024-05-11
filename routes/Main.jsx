import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../src/components/Root";
import Home from "../src/pages/Home/Home";
import ViewDetails from "../src/pages/ViewDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/food/:id',
                element: <ViewDetails></ViewDetails>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`)
            }
        ]
    },
]);

export default router;