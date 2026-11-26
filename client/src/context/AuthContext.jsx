import { createContext, useState, useEffect, useContext } from "react";
import { apiFetch } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider ({children}) {
    //store the currrently signed in user, null means no user is sined in.
    const [user, setUser] = useState(null);

    // Loading stays true while a saved token is begin verified with the server.
    const [loading, setLoading] = useState (Boolean(localStorage.getItem('token')));

    // If a token exists, it asks the server for the matching user account
    // Invalid or expired tokens are removed; loading stops with validation ends.
    useEffect(() => {
        if(!localStorage.getItem('token')) return;
        apiFetch('/auth/me')
        .then((data) => setUser (data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    },[]);

    // sends credentials or registration values to an authentication endpoint.
    // On success, saves the returned token to and updates the current user.
    async function authenticate( path, values) {
        const data = await apiFetch(path, {method: "POST", body: values});
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    }
    //Wraps authenticate() with the registration endpoint.
    const login = (values) => authenticate ('/auth/login', values);

    const register = (values) => authenticate ('/auth/register', values);

    //Removes the saved token and clears the current user without calling the server.
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value= {{user, loading, login, register,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);