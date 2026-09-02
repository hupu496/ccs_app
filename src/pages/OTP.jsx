import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Check, Shield, ArrowLeft, Smartphone } from "lucide-react";
import "../assets/OTP.css"; // We'll create this file

function OTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { phone, verifyOTP } = useAuth();

    // Auto-focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Timer for resend OTP
    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    const handleChange = (index, value) => {
        // Only allow digits
        const digit = value.replace(/\D/g, "");
        if (digit === "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            return;
        }

        // Update current input
        const newOtp = [...otp];
        newOtp[index] = digit.slice(0, 1);
        setOtp(newOtp);
        setError("");

        // Auto-advance to next input
        if (index < 5 && digit.length === 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }

        // Handle arrow keys for navigation
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Handle paste
        if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, "").slice(0, 6);
                const newOtp = [...otp];
                for (let i = 0; i < digits.length && i < 6; i++) {
                    newOtp[i] = digits[i];
                }
                setOtp(newOtp);
                setError("");
                // Focus the next empty input or last filled
                const nextIndex = Math.min(digits.length, 5);
                inputRefs.current[nextIndex].focus();
            });
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const digits = pastedData.replace(/\D/g, "").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < digits.length && i < 6; i++) {
            newOtp[i] = digits[i];
        }
        setOtp(newOtp);
        setError("");
        // Focus the next empty input or last filled
        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex].focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsVerifying(true);

        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter all 6 digits");
            setIsVerifying(false);
            // Focus the first empty input
            const emptyIndex = otp.findIndex((digit) => digit === "");
            if (emptyIndex !== -1) {
                inputRefs.current[emptyIndex].focus();
            }
            return;
        }

        // Simulate verification process
        setTimeout(() => {
            const result = verifyOTP(otpString);
            if (result) {
                setIsVerified(true);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 600);
            } else {
                setError("Invalid OTP. Please try again.");
                setIsVerifying(false);
                // Clear all inputs on error
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0].focus();
            }
        }, 800);
    };

    const handleResend = () => {
        if (!canResend) return;
        // Reset OTP inputs
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setTimer(30);
        setCanResend(false);
        inputRefs.current[0].focus();
        // Call your resend API here
        console.log("Resending OTP...");
    };

    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className="otp-page">
            {/* Background decorative elements */}
            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>

            <div className="otp-container">
                {/* Back button */}
                <button className="back-btn" onClick={handleBack}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                {/* Brand Header */}
                <div className="brand-header">
                    <div className="brand-icon">
                        <Smartphone size={28} color="#fff" />
                    </div>
                    <div className="brand-text">
                        <h1>ShopHub</h1>
                        <p>Secure Verification</p>
                    </div>
                </div>

                {/* OTP Card */}
                <div className="otp-card">
                    <div className="card-header">
                        <div className="header-icon-wrapper">
                            <Shield size={32} className="header-icon" />
                        </div>
                        <h2>Verify OTP</h2>
                        <p className="subtitle">
                            We've sent a 6-digit code to
                        </p>
                        <p className="phone-number">
                            <span className="phone-icon">📱</span>
                            +91 {phone || "XXXXXXXXXX"}
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="otp-form">
                        <div className="otp-input-container">
                            <div className="otp-input-group">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="tel"
                                        maxLength="1"
                                        inputMode="numeric"
                                        pattern="[0-9]"
                                        value={digit}
                                        onChange={(e) =>
                                            handleChange(index, e.target.value)
                                        }
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className={`otp-digit ${
                                            digit ? "filled" : ""
                                        } ${error ? "error" : ""} ${
                                            isVerified ? "verified" : ""
                                        }`}
                                        autoFocus={index === 0}
                                        aria-label={`OTP digit ${index + 1}`}
                                        disabled={isVerified}
                                    />
                                ))}
                            </div>

                            {error && (
                                <div className="error-message">
                                    <span className="error-icon">⚠️</span>
                                    {error}
                                </div>
                            )}

                            {isVerified && (
                                <div className="success-message">
                                    <div className="success-icon">
                                        <Check size={20} color="#fff" />
                                    </div>
                                    <span>OTP Verified Successfully!</span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`primary-btn ${isVerifying ? "loading" : ""}`}
                            disabled={isVerifying || isVerified}
                        >
                            {isVerifying ? (
                                <>
                                    <span className="spinner"></span>
                                    Verifying...
                                </>
                            ) : isVerified ? (
                                <>
                                    <Check size={20} />
                                    Verified ✓
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                    </form>

                    <div className="card-footer">
                        <div className="resend-section">
                            <button
                                className={`resend-btn ${canResend ? "active" : ""}`}
                                onClick={handleResend}
                                disabled={!canResend || isVerified}
                            >
                                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                            </button>
                        </div>

                        <p className="help-text">
                            Didn't receive the code?{" "}
                            <span className="help-highlight">
                                Check your spam folder
                            </span>
                        </p>

                        <div className="divider"></div>

                        <p className="terms">
                            By continuing, you agree to our{" "}
                            <a href="#" className="terms-link">Terms & Conditions</a>
                        </p>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                    <div className="trust-item">
                        <span className="trust-icon">🔒</span>
                        <span>Secure</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <span className="trust-icon">⚡</span>
                        <span>Instant</span>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <span className="trust-icon">🛡️</span>
                        <span>Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTP;