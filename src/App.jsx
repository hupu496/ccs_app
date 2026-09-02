import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";


function ProtectedRoute({ children }) {

    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}


function App() {

    return (

        <BrowserRouter basename={import.meta.env.BASE_URL}>

            <AuthProvider>

                <Routes>

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/otp"
                        element={<OTP />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>

    );
}

export default App;