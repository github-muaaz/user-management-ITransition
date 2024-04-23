import {useEffect} from "react";
import {get} from "lodash";

import history from "../../router/history";
import storage from "../../store/local-storage";
import config from "../../config.json";

const Auth = ({children}) => {

    const checkAuth = () => {
        const store = storage.get(config.storageKey);

        return store && get(store, "isAuthenticated", false) && get(store, "auth.token.accessToken", '');
    }

    useEffect(()=>{
        const path = window.location.pathname;

        if ((path.includes("sign-in") || path.includes('sign-up')) && checkAuth())
            history.goBack();
    }, []);

    return children;
}

export default Auth;