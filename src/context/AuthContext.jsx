import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [phone, setPhone] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (mobile) => {
        setPhone(mobile);
    };

    const verifyOTP = (otp) => {
        // Demo OTP
        if (otp === "123456") {
            setIsLoggedIn(true);
            return true;
        }

        return false;
    };

    const logout = () => {
        setPhone("");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                phone,
                isLoggedIn,
                login,
                verifyOTP,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);