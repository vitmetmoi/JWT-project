import { useState, createContext, useEffect } from "react";
import { getUserAccountService } from "../service/userService";
const UserContext = createContext({ email: '', groupWithRoles: '', token: '', auth: false });

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', groupWithRoles: '', token: '', auth: false });


    useEffect(() => {
        getUserAccount();
    }, [])

    const getUserAccount = async () => {
        let res = await getUserAccountService();
        if (res && res.data.EC === 0) {
            console.log('set user1', res.data.DT);
            login(res.data.DT);
        }

    }
    // Login updates the user data with a name parameter
    const login = (data) => {
        console.log('set user2', data);
        setUser({
            ...user,
            email: data.email,
            groupWithRoles: data.groupWithRoles,
            token: data.accessToken,
            auth: true
        });
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            email: '',
            groupWithRoles: '',
            token: '',
            auth: false
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export {
    UserProvider, UserContext
}