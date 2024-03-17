// import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { getInfoFromToken } from '../../../functions';
const MyContext = React.createContext();

export function MyProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    console.log("🚀 ~ MyProvider ~ isLogin:", isLogin)
    const [contentNotifi, SetContentNotifi] = useState('');
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = getInfoFromToken();
        if (token) {
            setIsLogin(true);
            setUser(token);
        }
    }, [])
    return (
        <MyContext.Provider value={{ isLogin, setIsLogin, contentNotifi, SetContentNotifi, user }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};