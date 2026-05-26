import {createContext, useState, useEffect  } from "react";


export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() =>{
        const user = localStorage.getItem("user");
        const token =  localStorage.getItem("token");

        if(user && token){
            setUser(JSON.parse(user));
            setToken(token);
        }

        setLoading(false);

    }, []);

    const login = (userData, tokenData) => {
        setUser(userData)
        setToken(tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value ={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
1}
