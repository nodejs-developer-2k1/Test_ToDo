import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
// import { useNavigate } from "react-router-dom";
// import { useMyContext } from "../src/component/context/AppContext";

export const POST = async (url, conditions, token_Todo) => {
    let headers = { "Content-Type": "multipart/form-data" };
    const token = Cookies.get(`Todo`);
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_Todo) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_Todo}`,
        };
    }
    try {

        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_ENDPOINT}/${url}`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        if (error?.response?.status === 403) {
            console.log(22222)
        }
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 400,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
};

export const GET = async (url, conditions, token_Todo) => {
    // const navigate = useNavigate();
    // const { setIsLogin } = useMyContext()
    let headers = { "Content-Type": "multipart/form-data" };
    const token = Cookies.get(`Todo`);
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_Todo) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_Todo}`,
        };
    }
    try {

        const response = await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_ENDPOINT}/${url}`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error) {
        // if (error?.response?.status === 403) {
        //     setIsLogin(false)
        //     return navigate('/')
        // }
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 400,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
};

export const PUT = async (url, conditions, token_Todo) => {
    // const navigate = useNavigate();
    // const { setIsLogin } = useMyContext()
    let headers = { "Content-Type": "multipart/form-data" };
    const token = Cookies.get(`Todo`);
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_Todo) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_Todo}`,
        };
    }
    try {

        const response = await axios({
            method: "put",
            url: `${import.meta.env.VITE_API_ENDPOINT}/${url}`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error) {
        // if (error?.response?.status === 403) {
        //     setIsLogin(false)
        //     return navigate('/')
        // }
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 400,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
};

export const DELETE = async (url, conditions, token_Todo) => {
    // const navigate = useNavigate();
    // const { setIsLogin } = useMyContext()
    let headers = { "Content-Type": "multipart/form-data" };
    const token = Cookies.get(`Todo`);
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_Todo) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_Todo}`,
        };
    }
    try {

        const response = await axios({
            method: "delete",
            url: `${import.meta.env.VITE_API_ENDPOINT}/${url}`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error) {
        // if (error?.response?.status === 403) {
        //     setIsLogin(false)
        //     return navigate('/')
        // }
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 400,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
};

export const getInfoFromToken = () => {
    try {
        const token = Cookies.get('Todo');
        if (token) {
            const response = jwtDecode(token);

            if (typeof response === 'object' && response !== null) {
                const tokenInfo = response;
                return tokenInfo;
            } else {
                return null
            }
        }
        return null
    } catch (error) {
        return null
    }
}

export const getDate = (time) => {
    try {
        var date = new Date(time); // * 1000 để chuyển đổi sang milliseconds

        // Lấy ngày, tháng và năm
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
        var year = date.getFullYear();

        // Trả về chuỗi biểu diễn ngày tháng năm
        return day + '/' + month + '/' + year;
    } catch (error) {
        return "";
    }
};

