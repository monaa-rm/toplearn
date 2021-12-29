import React, { useState, useEffect ,useRef } from "react";
import { dashContext } from "./dashContext";
import { orderBy } from "lodash";
import { paginate } from "./../../utils/paginate";
import NewCourseDialog from "./../admin/dialogs/NewCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditCourseDialog";
import DeleteCourseDialog from "../admin/dialogs/DeleteCourseDialog";
import SimpleReactValidator from "simple-react-validator";

const AdminContext = ({ courses, children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const [search, setSearch] = useState("")
    const [courseList, setCourselist] = useState([]);
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(false);
    const [currentCourse, setCurrentCourse] = useState({});
    const [newCourseDialog, setNewCourseDialog] = useState(false);
    const [editCourseDialog, setEditCourseDialog] = useState(false);
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

    useEffect(() => setCourselist(courses), [courses])

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer: "مقدار وارد شذه باید عدد باشد."
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );

    const openNewCourseDialog = () => setNewCourseDialog(true);
    const closeNewCourseDialog = () => setNewCourseDialog(false);

    const openEditCourseDialog = (course) => {
        setEditCourseDialog(true);
        setCurrentCourse(course);
    };
    const closeEditCourseDialog = () => setEditCourseDialog(false);

    const openDeleteCourseDialog = (course) => {
        setDeleteCourseDialog(true);
        setCurrentCourse(course);
    };
    const closeDeleteCourseDialog = () => setDeleteCourseDialog(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const filteredCourses = courseList.filter(course => course.title.includes(search));

    const sortCoursesAsc = () => { 
        setCourselist(orderBy(courseList, "price", "asc"));
        setOrderAsc(true);
        setOrderDesc(false);
    };
    const sortCoursesDes = () => { 
        setCourselist(orderBy(courseList, "price", "desc"));
        setOrderDesc(true);
        setOrderAsc(false);

     };



    const courseData = paginate(filteredCourses, currentPage, perPage);

    return (
        <dashContext.Provider
            value={{
                currentPage,
                perPage,
                handlePageChange,
                courseData,
                openNewCourseDialog,
                openEditCourseDialog,
                openDeleteCourseDialog,
                setSearch,
                filteredCourses,
                sortCoursesAsc,
                sortCoursesDes,
                orderAsc,
                orderDesc,
                validator
            }}
        >
            <NewCourseDialog
                showDialog={newCourseDialog}
                closeDialog={closeNewCourseDialog}
            />
            <EditCourseDialog
                showDialog={editCourseDialog}
                closeDialog={closeEditCourseDialog}
                course={currentCourse}
            />
            <DeleteCourseDialog
                showDialog={deleteCourseDialog}
                closeDialog={closeDeleteCourseDialog}
                course={currentCourse}
            />
            {children}
        </dashContext.Provider>
    );
};

export default AdminContext;
