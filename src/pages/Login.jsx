import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Shield, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../assets/Login.css"; // We'll create this file

function Login() {
    const [mobile, setMobile] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mobile.length !== 10) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        login(mobile);
        navigate("/otp");
    };

    return (
        <div className="login-page">
            {/* Background decorative elements */}
            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>

            <div className="login-container">
                {/* Brand Header */}
                <div className="brand-header">
                    <div className="brand-icon">
                        <Smartphone size={28} color="#fff" />
                    </div>
                    <div className="brand-text">
                        <h1>J2C Your Baseline</h1>
                        <p>Explore. Shop. Enjoy.</p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="login-card">
                    <div className="card-header">
                        <h2>Welcome Back!</h2>
                        <p className="subtitle">
                            Login to continue your shopping journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-wrapper">
                            <label className="input-label">Mobile Number</label>
                            <div className={`mobile-input ${isFocused ? 'focused' : ''}`}>
                                <span className="country-code">+91</span>
                                <div className="input-divider"></div>
                                <input
                                    type="tel"
                                    maxLength="10"
                                    placeholder="Enter 10-digit number"
                                    value={mobile}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={(e) =>
                                        setMobile(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    className="mobile-field"
                                />
                                {mobile.length > 0 && mobile.length === 10 && (
                                    <div className="input-check">
                                        <span className="check-mark">✓</span>
                                    </div>
                                )}
                            </div>
                            {mobile.length > 0 && mobile.length !== 10 && (
                                <span className="error-message">
                                    Please enter a valid 10-digit number
                                </span>
                            )}
                        </div>

                        <button type="submit" className="primary-btn">
                            <span>Continue</span>
                            <ArrowRight size={20} className="btn-icon" />
                        </button>

                        <div className="divider">
                            <span className="divider-line"></span>
                            <span className="divider-text">or</span>
                            <span className="divider-line"></span>
                        </div>

                        <button type="button" className="secondary-btn">
                            <Shield size={18} />
                            <span>Login with OTP</span>
                        </button>
                    </form>

                    <div className="card-footer">
                        <p className="terms">
                            By continuing, you agree to our 
                            <a href="#" className="terms-link"> Terms & Conditions</a>
                            <span className="dot">•</span>
                            <a href="#" className="terms-link"> Privacy Policy</a>
                        </p>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                    <div className="trust-item">
                        <span className="trust-icon">🛡️</span>
                        <span>100% Secure</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <span className="trust-icon">⚡</span>
                        <span>Fast Delivery</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <span className="trust-icon">💳</span>
                        <span>Easy Returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;