import AnswerDetails from "../components/answer/AnswerDetails";
import Home from "../components/home/Home";
import Login from "../components/Login";
import HotQuestions from "../components/question/HotQuestions";
import QuestionDetails from "../components/question/QuestionDetails";
import QuestionsList from "../components/question/QuestionsList";
import Register from "../components/Register";
import UserDetails from "../components/user/UserDetails";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
    {
        path: "/",
        element: QuestionsList,
    },
    {
        path: "/questions/:id",
        element: QuestionDetails,
    },
    {
        path: "/answer/:id",
        element: AnswerDetails,
    },
    {
        path: "/new-questions",
        element: Home,
    },
    {
        path: "/hot-questions",
        element: HotQuestions,
    },
    {
        path: "/my-questions",
        element: Home,
    },
    {
        path: "/user/:id",
        element: UserDetails,
    },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
    {
        path: "/",
        element: Register,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/questions",

        element: QuestionsList,
    },
    {
        path: "/questions/:id",
        element: QuestionDetails,
    },
    {
        path: "/answer/:id",
        element: AnswerDetails,
    },
    {
        path: "/new-questions",
        element: Home,
    },
    {
        path: "/hot-questions",
        element: HotQuestions,
    },

];

export { LOGGED_OUT_NO_LAYOUT_ROUTES, LOGGED_IN_DEFAULT_LAYOUT_ROUTES };