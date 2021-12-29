import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <ul className="nav navbar-nav side-nav" style={{ height: "100vh" }}>
                <li
                    className={
                        location.pathname === "/dashboard" ? "active" : ""
                    }
                >
                    <Link to="/dashboard">
                        <i className="fa fa-fw fa-dashboard"></i> داشبورد
                    </Link>
                </li>

                <li
                    className={
                        location.pathname === "/dashboard/courses"
                            ? "active"
                            : ""
                    }
                >
                    <Link to="/dashboard/courses">
                        <i className="fa fa-fw fa-graduation-cap"></i> دوره ها
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
