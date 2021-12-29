import { useDispatch } from "react-redux";
import { clearUser } from "../../actions/user";
import { useNavigate , Navigate } from "react-router-dom";
import { useEffect } from "react";
import { isEmpty } from 'lodash';
import { useSelector } from "react-redux";

export const Logout = () => {
 
    localStorage.removeItem("token");
    const user = useSelector(state => state.user )
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    useEffect(() => {
            // if(isEmpty(user)) return <Navigate to="/"  />   
        dispatch(clearUser());
        navigate("/");
    },[])

    return null
} 