import {Link} from "react-router-dom";

import storage from "../store/local-storage";
import configJson from "../config.json";

const Home = () => {

    const storeItem = storage.get(configJson.storageKey);

    const currentUser = storeItem?.user;

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="row gap-5 mb-5 shadow p-5 rounded" style={{width: '65%'}}>
                    <h1 className="mb-3">Home page</h1>

                    <div className={'row'}>
                        {currentUser
                            ? <h4>Hello, {currentUser?.name}</h4>
                            : <h4>Please, Login or Sign Up</h4>
                        }
                    </div>

                    <div className="row">
                        <div className="col">
                            <Link to={'/users'}><h4>Users</h4></Link>
                        </div>
                        <div className="col">
                            <Link to={'/sign-in'}><h4>Sign In</h4></Link>
                        </div>
                        <div className="col">
                            <Link to={'/sign-up'}><h4>Sign Up</h4></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;