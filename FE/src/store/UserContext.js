import { useState, createContext, useEffect } from "react";
import { getUserAccountService } from "../service/userService";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(
        {
            token: '',
            isLoading: true,
            auth: false,
            account: {
                userName: '',
                email: '',
                groupWithRoles: '',
            },
            iat: '',
            exp: '',
        }

    );


    useEffect(() => {

        setTimeout(() => getUserAccount(), 1000);
    }, [])

    const getUserAccount = async () => {
        try {
            let res = await getUserAccountService();
            console.log('res 1213123', res)
            if (res && res.data.EC === 0) {
                let data = res.data.DT;

                let userData = {
                    token: data.token ? data.token : '',
                    isLoading: false,
                    auth: data.auth === false ? false : true,
                    account: {
                        userName: data.userName && data.userName,
                        email: data.email && data.email,
                        groupWithRoles: data.groupWithRoles && data.groupWithRoles,
                    },
                    iat: data.iat,
                    exp: data.exp
                }

                setUser(userData);
            }
            else {

                let data = {
                    token: '',
                    isLoading: false,
                    auth: false,
                    account: {
                        userName: '',
                        email: '',
                        groupWithRoles: '',
                    },
                    iat: '',
                    exp: ''
                };

                setUser(data);
            }
        }
        catch (e) {
            let data = {
                token: '',
                isLoading: false,
                auth: false,
                account: {
                    userName: '',
                    email: '',
                    groupWithRoles: '',
                },
                iat: '',
                exp: ''
            };

            setUser(data);
            console.log(e);
        }


    }
    // Login updates the user data with a name parameter
    const login = (data) => {
        console.log('data login', data)
        let userData = {
            token: data.token,
            isLoading: false,
            auth: data.auth ? data.auth : true,
            account: {
                userName: data && data.userName ? data.userName : '',
                email: data && data.email ? data.email : '',
                groupWithRoles: data.groupWithRoles && data.groupWithRoles,
            },
            iat: data.iat,
            exp: data.exp
        }
        console.log('data user', data)
        setUser(userData);
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