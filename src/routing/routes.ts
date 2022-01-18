import Login from "../components/Login";
import Register from "../components/Register";


const LOGGED_OUT_NO_LAYOUT_ROUTES = [

    {
        path: "/register",
        element: Register,
    },
    {
        path: "/login",
        element: Login,
    },

];

export { LOGGED_OUT_NO_LAYOUT_ROUTES };