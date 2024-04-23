import {Link} from "react-router-dom";

import NotFoundImage from "../assets/images/not-found.png";

const NotFound = () => {

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="row justify-content-center">
                    <img className={'w-50'} src={NotFoundImage} alt={"not found"}/>
                </div>

                <div className="row w-50">
                    <div className="col">
                        <Link to={'/'}><h4>Home</h4></Link>
                    </div>
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
    )
}

export default NotFound;