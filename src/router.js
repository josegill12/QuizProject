import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizComponent from "./components/QuizComponent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";





const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>,
          <Route path='/' element={<HomePage />} />,
          <Route path="/quiz" element={<QuizComponent />} />,
          <Route path="/register" element={<Register />} />,
          <Route path="/login" element={<Login />} />,
          <Route path="/profile" element={<UserProfile />} />
        </Route>
    )
);

export default routes;