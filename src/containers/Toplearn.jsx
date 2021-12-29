import React, { useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";
import Register from "./../components/Register/Register";
import Archive from "./../components/Course/Archive";
import SingleCourse from "./../components/Course/SingleCourse";
import UserProfile from "./../components/Profile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { paginate } from "./../utils/paginate";
import { decodeToken } from "../utils/decodeToken"
import { addUser, clearUser } from "../actions/user";
import { Logout } from "../components/Login/Logout";
import NotFound from "../components/common/NotFound";
import PrivateLayout from "../components/Layouts/PrivateLayout";
import Dashboard from "../components/admin/Dashboard";
import CourseTable from "../components/admin/CourseTable";
import { isEmpty } from 'lodash';
import AdminContext from "../components/context/AdminContext";

const Toplearn = () => {
    const courses = useSelector(state => state.courses);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const indexCourses = paginate(courses, 1, 8);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            const dateNow = Date.now() / 1000;

            if (decodedToken.payload.exp < dateNow) {
                localStorage.removeItem("token");
                dispatch(clearUser());
            } else dispatch(addUser(decodedToken.payload.user));
        }
    }, []);


    return (
        <Fragment>

            <Routes >
                <Route path="/dashboard" element={<PrivateLayout />} >
                    <Route path="/dashboard" element={<Dashboard courses={courses} />} />
                    <Route path="/dashboard/courses" element={
                            <AdminContext courses={courses} >
                                <CourseTable /> 
                            </AdminContext>
                  
                        }/>
                </Route>

                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<Course courses={indexCourses} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/archive" element={<Archive />} />
                    {/* <Route path="/course" element={<Course />} /> */}
                    <Route path="course/:id" element={<SingleCourse />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                
            </Routes>


        </Fragment>
    );
};

export default Toplearn;
