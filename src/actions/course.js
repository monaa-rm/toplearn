import { getCourse } from "../services/courseService"

export const getSingleCourses = courseId => {
    return async dispatch => {
        const { data } = await getCourse(courseId);
        await dispatch({ type : "GET_COURSE" , payload : data.course})
    }
}