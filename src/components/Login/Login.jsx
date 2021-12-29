
import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../../services/userService";
import SimpleReactValidator from "simple-react-validator";
import { decodeToken } from "../../utils/decodeToken";
import { addUser } from "../../actions/user";
import { successMessage, errorMessage } from "../../utils/toastMessages";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();

    const [, forceUpdate] = useState();

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );
    const resetState = () => {
        setEmail("");
        setPassword("");
        setPolicy("");
    };

    const handleLogin = async event => {
        event.preventDefault();
        const user = { email, password };

        try {

            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    successMessage("ورود موفقیت آمیز بود.")
                    localStorage.setItem("token", data.token);
                    dispatch(addUser(decodeToken(data.token).payload.user));
                    dispatch(hideLoading())
                    navigate("/");
                    // resetState();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }

        } catch (ex) {
            console.log(ex);
            errorMessage("مشکلی پیش آمده.")
            dispatch(hideLoading())

        }
    };
    if (!isEmpty(user)) return <Navigate to="/" />
    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> ورود به سایت </h2>
                </header>
                <Helmet>
                    <title>تاپلرن | ورود به سایت</title>
                </Helmet>

                <div className="form-layer">
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <span
                                className="input-group-addon"
                                id="email-address"
                            >
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor("email");
                                }}
                            />
                            {validator.current.message(
                                "email",
                                email,
                                "required|email"
                            )}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password">
                                <i className="zmdi zmdi-lock"></i>
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor(
                                        "password"
                                    );
                                }}
                            />
                            {validator.current.message(
                                "password",
                                password,
                                "required|min:5"
                            )}
                        </div>

                        <div className="remember-me">
                            <label>
                                <input type="checkbox" name="" /> مرا بخاطر
                                    بسپار{" "}
                            </label>
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-lock"></i> رمز عبور خود
                                    را فراموش کرده ام !
                                </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> عضویت در
                                    سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                                ورود به سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>


    );
};

export default Login;
