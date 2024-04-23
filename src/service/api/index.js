import {toast} from "react-toastify";

import storage from "../../store/local-storage";
import request from "../http";
import config from "../../config.json";
import history from "../../router/history";

class Auth {

    static Login = (data) => {
        request
            .post(`auth/sign-in`, data)
            .then(res => {
                storage.set(config.storageKey, {isAuthenticated: true, auth: {token: res.data.body}});

                // get current user data after sign in
                Auth.GetMe()
                    .then(() =>
                        history.go('/'));
            })
            .catch(err => {
                storage.set(config.storageKey, {isAuthenticated: false});

                toast.error(err.response.data.errors[0].message)
            });

    };

    static SignUp = (data) => {
        request
            .post(`auth/sign-up`, data)
            .then(res => {
                storage.set(config.storageKey, {isAuthenticated: true, auth: {token: res.data.body}});

                // get current user data after sign up
                Auth.GetMe()
                    .then(() =>
                        history.go('/'));
            })
            .catch(() => storage.set(config.storageKey, {isAuthenticated: false}));
    };

    static GetMe = () => {
        return request
            .get('/user/me')
            .then(res => {
                storage.set(config.storageKey, { user: res.data?.body });
            })
            .catch(err => {
                console.log('user/me error', err)
                storage.set(config.storageKey, {isAuthenticated: false, auth: {}})
            });
    };

    static Logout = () => {
        storage.set(config.storageKey, {isAuthenticated: false}, true);
    };

    // For all FETCH requests
    static FetchData = (url) => {
        return request
            .get(url, config)
            .then(res => res.data.body)
            .catch(err => {
                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response.data.errors[0].message);
            });
    };

    // For all PUT requests
    static PutData = (url, data) => {
        return request
            .put(url, data)
            .then(res => {
                if (res.data?.message)
                    toast.success(res.data.message);

                return res.data;
            })
            .catch(err => {
                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response.data.errors[0].message);
            });
    };

    // For all DELETE requests
    static Delete= (url, data) => {
        return request
            .delete(url, { data })
            .then(res => {
                if (res.data?.message)
                    toast.success(res.data.message);

                return res.data;
            })
            .catch(err => {
                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response.data.errors[0].message);
            })
    }
}

export default Auth;