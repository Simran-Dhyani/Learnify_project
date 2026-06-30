import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { logout } from "@/store/authSlice";

function LogOutBtn(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logOutHandler = async () => {
    console.log("Logout clicked");

    try {
        const res = await authService.logout();
        console.log("Logout response:", res);
    } catch (err) {
        console.log("Logout error:", err.response || err);
    }

    dispatch(logout());
    navigate("/");
}
    return(
        <button
            className="inline-flex h-10 min-w-24 items-center justify-center rounded-xl bg-purple-900 px-4 text-sm font-semibold text-white transition hover:bg-blue-950"
            onClick={logOutHandler}
        >
            Logout
        </button>
    )


}
export default LogOutBtn
