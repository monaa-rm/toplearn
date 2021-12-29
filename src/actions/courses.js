import {
    getCourses,
    newCourse,
    updateCourse,
    deleteCourse,
} from "./../services/courseService";
import { successMessage } from "./../utils/toastMessages";

export const getAllCourses = () => {
    return async (dispatch) => {
        const { data } = await getCourses();
        console.log(data);
        await dispatch({ type: "INIT", payload: data.courses });
    };
};

export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) successMessage("دوره با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course],
        });
    };
};

export const handleCourseUpdate = (courseId, updatedCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];
        const filteredCourses = courses.filter(
            (course) => course._id !== courseId
        );
        // const updatedCourses = [...courses];
        // const courseIndex = updatedCourses.findIndex(
        //     (course) => course._id == courseId
        // );

        // let course = updatedCourses[courseIndex];

        // course = { ...Object.fromEntries(updatedCourse) };

        // updatedCourses[courseIndex] = course;


        try {
            const { data, status } = await updateCourse(
                courseId,
                updatedCourse
            );
            console.log(data);
            await dispatch({
                type: "UPDATE_COURSE",
                payload: [...filteredCourses, data.course],
            });
            if (status === 200) {
                successMessage("دوره با موفقیت ویرایش شد.");
            }
        } catch (ex) {
            await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
        }
    };
};

export const handleCourseDelete = courseId => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];
        const filteredCourses = courses.filter((course) => course._id !== courseId)

        try {
            await dispatch({ type: "DELETE_COURSE", payload: [...filteredCourses] })
            const { status } = await deleteCourse(courseId);
            if (status === 200) successMessage("دوره با موفقیت حذف شد.")
        } catch (ex) {
            await dispatch({ type: "DELETE_COURSE", payload: [...courses] })

        }
    }
}


