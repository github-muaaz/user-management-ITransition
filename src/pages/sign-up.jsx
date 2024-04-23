import React, {useState} from "react";
import {Link} from "react-router-dom";

import LoginImage from "../assets/images/login.webp";
import Api from "../service/api";

const SignUp = () => {

    const [errors, setErrors] = useState({});

    const validate = (formData) => {
        const currentErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
            currentErrors.email = "Email format is not correct";

        if (!formData?.email?.trim())
            currentErrors.email = "Email cannot be empty";

        if (!formData?.name?.trim())
            currentErrors.name = "Name cannot be empty";

        if (!formData?.password?.trim())
            currentErrors.password = "Password cannot be empty";

        setErrors(currentErrors);

        return currentErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const formData = {
            email: form.email.value,
            name: form.name.value,
            password: form.password.value,
        };

        if (!(Object.keys(validate(formData)).length === 0))
            return;

        Api.SignUp(formData);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="row gap-5 mb-5 shadow p-5 rounded" style={{width: '65%'}}>
                    <div className="col">
                        <h2 className="text-center mb-5">Register</h2>

                        <form noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className={`form-control ${errors.name && "is-invalid"}`}
                                    id="name"
                                    placeholder="Name"
                                    required
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    className={`form-control ${errors.email && "is-invalid"}`}
                                    id="email"
                                    placeholder="Email"
                                    required
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    className={`form-control ${errors.password && "is-invalid"}`}
                                    id="password"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>

                            <div className="mb-4" id='rere'>
                                <p className="text-center mb-0">Already have an account?</p>
                                <Link to="/sign-in" className="d-block text-center">Sign in here</Link>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>

                    <div className="col">
                        <img src={LoginImage} className="img-fluid rounded" alt="Sign Up"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
