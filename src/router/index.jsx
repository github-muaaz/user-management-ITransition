import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Login from "../pages/login";
import SignUp from "../pages/sign-up";
import NotFound from "../pages/notFound";
import Home from "../pages/home";
import IsAuth from "../service/auth/IsAuth";
import IsGuest from "../service/auth/IsGuest";
import Users from "../pages/users";

const Router = () => {
    return (
        <BrowserRouter>
                <Routes>
                    {/* All users can access these routes */}
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/404" element={<NotFound/>}/>

                    {/* Not found page */}
                    <Route path="*" element={<Navigate to="/404"/>}/>

                    {/* Only authenticated users can visit */}
                    <Route
                        path="/users"
                        element={
                            <IsAuth>
                                <Users/>
                            </IsAuth>
                        }
                    />

                    {/* Unauthenticated users can visit (authenticated users cannot visit) */}
                    <Route
                        path="/sign-in"
                        element={
                            <IsGuest>
                                <Login/>
                            </IsGuest>
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <IsGuest>
                                <SignUp/>
                            </IsGuest>
                        }
                    />
                </Routes>
        </BrowserRouter>
    );
};

export default Router;
