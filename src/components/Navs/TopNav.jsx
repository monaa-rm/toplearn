import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from 'lodash';
const TopNav = () => {
    const user = useSelector(state => state.user)

    return (
        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                exact
                                activeStyle={{ color: "lime" }}
                            >
                                {" "}
                                صفحه اصلی{" "}
                            </NavLink>
                            <a href=""> درباره ما </a>
                            <a href=""> تماس با ما </a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea">
                        {!isEmpty(user) ? (
                            <div className="loggein ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/user-profile">
                                    {user.fullname}
                                </NavLink>
                                
                                {user.isAdmin ? (
                                    <NavLink to="/dashboard">
                                         / پنل ادمین / 
                                    </NavLink>
                                ) : "/"
                                }
                                <NavLink
                                    to="/logout"
                                    activeStyle={{ color: "lime" }}
                                >                                        {" "}
                                    خروج{" "}
                                </NavLink>
                            </div>
                        ) : (
                                <div className="signin ">
                                    <i className="zmdi zmdi-account"></i>
                                    <NavLink
                                        to="/login"
                                        activeStyle={{ color: "lime" }}
                                    >
                                        {" "}
                                ورود{" "}
                                    </NavLink>{" "}
                            /
                                    <NavLink
                                        to="/register"
                                        activeStyle={{ color: "lime" }}
                                    >
                                        {" "}
                                عضویت{" "}
                                    </NavLink>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
