import React, { useState, useRef } from "react";
import Helmet from "react-helmet";
import { isEmpty } from 'lodash';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { registerUser } from "../../services/userService";
import { successMessage, errorMessage } from "../../utils/toastMessages";
import { showLoading, hideLoading } from "react-redux-loading-bar";


const Register = ({ history }) => {
    const [fullname, setFullname] = useState("");
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
        setFullname("");
        setEmail("");
        setPassword("");
        setPolicy("");
    };


    const handleRegister = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        };

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status } = await registerUser(user);
                if (status === 201) {
                    successMessage("کاربر با موفقیت ساخته شد.")
                    //  history.push("/login");
                    dispatch(hideLoading())
                    navigate("/login")
                    //resetState();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);

            }
        } catch (ex) {
            console.log(ex)
            errorMessage("مشکلی پیش آمده.")
            dispatch(hideLoading())
        }
    };


    if (!isEmpty(user)) return <Navigate to="/" />

    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> عضویت در سایت </h2>
                </header>
                <Helmet>
                    <title>تاپلرن | عضویت در سایت</title>
                </Helmet>


                <div className="form-layer">
                    <form onSubmit={e => handleRegister(e)}>
                        <div className="input-group">
                            <span className="input-group-addon" id="username">
                                <i className="zmdi zmdi-account"></i>
                            </span>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                placeholder="نام و نام خانوادگی"
                                aria-describedby="username"
                                value={fullname}
                                onChange={e => {
                                    setFullname(e.target.value);
                                    validator.current.showMessageFor(
                                        "fullname"
                                    );
                                }}
                            />
                            {validator.current.message(
                                "fullname",
                                fullname,
                                "required|min:5"
                            )}
                        </div>

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

                        <div className="accept-rules">
                            <label>
                                <input
                                    type="checkbox"
                                    name="policy"
                                    value={policy}
                                    onChange={e => {
                                        setPolicy(e.currentTarget.checked);
                                        validator.current.showMessageFor(
                                            "policy"
                                        );
                                    }}
                                />{" "}
                                قوانین و مقررات سایت را میپذیرم{" "}
                            </label>
                            {validator.current.message(
                                "policy",
                                policy,
                                "required"
                            )}
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-assignment"></i> قوانین
                                و مقررات سایت !
                            </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> ورود به
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            عضویت در سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;
