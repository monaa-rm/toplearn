import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { context } from "./context";
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { registerUser, loginUser } from "../../services/userService";
import { decodeToken } from "../../utils/decodeToken";
import { addUser } from "../../actions/user";
import { errorMessage, successMessage } from "../../utils/toastMessages";


export const UserContext = ({ children }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();

    const [, forceUpdate] = useState();
    useEffect(() => {
        return () => {
            setFullname();
            setEmail();
            setPassword();
            setPolicy();
            forceUpdate()
        }
    },[])

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
    // const resetState = () => {
    //     setFullname("");
    //     setEmail("");
    //     setPassword("");
    //     setPolicy("");
    // };

    const handleLogin = async event => {
        event.preventDefault();
        const user = { email, password };

        try {

            if (validator.current.allValid()) {
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    successMessage("ورود موفقیت آمیز بود.")
                    localStorage.setItem("token", data.token);
                    dispatch(addUser(decodeToken(data.token).payload.user));
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

        }
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
                const { status } = await registerUser(user);
                if (status === 201) {
                    successMessage("کاربر با موفقیت ساخته شد.")
                    //  history.push("/login");
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
        }
    };


    return (
        <context.Provider
            value={{
                fullname,
                setFullname,
                email,
                setEmail,
                password,
                setPassword,
                policy,
                setPolicy,
                validator,
                handleLogin,
                handleRegister
            }}
        >

            {children}
        </context.Provider>
    )
}