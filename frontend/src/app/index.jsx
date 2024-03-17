import { Login } from "./Auth/Login";
import { useMyContext } from '../component/context/AppContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
    const { isLogin } = useMyContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) {
            return navigate("/Dashboard");
        }
    }, [isLogin]);
    return (
        <>
            <Login />
        </>
    )
}