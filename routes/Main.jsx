import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../src/components/Root";
import Home from "../src/pages/Home/Home";
import ViewDetails from "../src/pages/ViewDetails";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import AddAFood from "../src/pages/AddAFood";
import Error from "../src/pages/Error";
import AvailableFoods from "../src/pages/AvailableFoods";
import MyFoodRequest from "../src/pages/MyFoodRequest";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/food/:id',
                element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`, {
                    credentials: 'include'
                })
            },
            {
                path: '/addAFood',
                element: <PrivateRoute><AddAFood></AddAFood></PrivateRoute>
            },
            {
                path: '/availableFoods',
                element: <AvailableFoods></AvailableFoods>
            },
            {
                path: '/myFoodReq',
                element: <MyFoodRequest></MyFoodRequest>
            }
        ]
    },
]);

export default router;