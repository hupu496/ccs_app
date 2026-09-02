import {
    Search,
    Bell,
    User,
    ShoppingBag,
    Package,
    FileText,
    CreditCard,
    Home,
    Users,
    Clock,
    Upload,
    CheckCircle,
    AlertCircle,
    Briefcase,
    ArrowRight,
    Menu,
    X
} from "lucide-react";

import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showProfile, setShowProfile] = useState(false);

    // Sample data - replace with actual API data
    const caseStats = {
        total: 156,
        pending: 42,
        accepted: 28,
        pendingUpload: 18,
        inProgress: 35,
        completed: 33
    };

    const pendingCases = [
        { id: "CASE-2024-001", client: "Rajesh Kumar", type: "Civil", date: "2024-01-15", priority: "High" },
        { id: "CASE-2024-002", client: "Priya Sharma", type: "Criminal", date: "2024-01-14", priority: "Medium" },
        { id: "CASE-2024-003", client: "Amit Singh", type: "Family", date: "2024-01-13", priority: "Low" },
        { id: "CASE-2024-004", client: "Sneha Patel", type: "Corporate", date: "2024-01-12", priority: "High" },
    ];

    const acceptedCases = [
        { id: "CASE-2024-005", client: "Vikram Reddy", type: "Civil", date: "2024-01-10", status: "In Progress" },
        { id: "CASE-2024-006", client: "Anita Desai", type: "Family", date: "2024-01-09", status: "Review" },
        { id: "CASE-2024-007", client: "Suresh Nair", type: "Criminal", date: "2024-01-08", status: "In Progress" },
    ];

    const pendingUploadCases = [
        { id: "CASE-2024-008", client: "Deepak Gupta", type: "Corporate", date: "2024-01-07", documents: 3 },
        { id: "CASE-2024-009", client: "Meera Iyer", type: "Civil", date: "2024-01-06", documents: 5 },
        { id: "CASE-2024-010", client: "Ravi Joshi", type: "Family", date: "2024-01-05", documents: 2 },
    ];

    const handleViewCase = (caseId) => {
        navigate(`/case/${caseId}`);
    };

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
        if (!showProfile) {
            setActiveTab("profile");
        } else {
            setActiveTab("dashboard");
        }
    };

    return (
        <div className={`app ${showProfile ? 'profile-active' : ''}`}>
            {/* Header */}
            <header className="app-header">
                <div className="header-left">
                    <h2>
                        Hello, Aadarsh 👋
                        <span className="header-subtitle">Welcome back</span>
                    </h2>
                </div>
                <div className="header-icons">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={22} />
                    </button>
                    <button className="icon-btn notification-btn" aria-label="Notifications">
                        <Bell size={22} />
                        <span className="notification-dot"></span>
                    </button>
                    <button 
                        className={`icon-btn profile-btn ${showProfile ? 'active' : ''}`} 
                        onClick={handleProfileClick}
                        aria-label="Profile"
                    >
                        <User size={22} />
                    </button>
                </div>
            </header>

            {/* Search Box */}
            <div className="search-box">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search cases, clients, documents..."
                    className="search-input"
                />
                <button className="search-btn">Search</button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon-wrapper">
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{caseStats.total}</span>
                        <span className="stat-label">Total Cases</span>
                    </div>
                </div>
                <div className="stat-card pending">
                    <div className="stat-icon-wrapper">
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{caseStats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
                <div className="stat-card accepted">
                    <div className="stat-icon-wrapper">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{caseStats.accepted}</span>
                        <span className="stat-label">Accepted</span>
                    </div>
                </div>
                <div className="stat-card upload">
                    <div className="stat-icon-wrapper">
                        <Upload size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{caseStats.pendingUpload}</span>
                        <span className="stat-label">Pending Upload</span>
                    </div>
                </div>
            </div>

            {/* Case Sections */}
            <div className="cases-container">
                {/* Pending Cases */}
                <section className="case-section">
                    <div className="section-header">
                        <div className="section-title-group">
                            <div className="section-icon pending-icon">
                                <Clock size={20} />
                            </div>
                            <h3>Pending Cases</h3>
                            <span className="section-badge pending-badge">
                                {caseStats.pending}
                            </span>
                        </div>
                        <button className="view-all-btn">
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="case-cards">
                        {pendingCases.map((caseItem) => (
                            <div 
                                key={caseItem.id} 
                                className="case-card pending-card"
                                onClick={() => handleViewCase(caseItem.id)}
                            >
                                <div className="case-card-header">
                                    <span className="case-id">{caseItem.id}</span>
                                    <span className={`priority-badge ${caseItem.priority.toLowerCase()}`}>
                                        {caseItem.priority}
                                    </span>
                                </div>
                                <div className="case-card-body">
                                    <h4 className="case-client">{caseItem.client}</h4>
                                    <div className="case-meta">
                                        <span className="case-type">{caseItem.type}</span>
                                        <span className="case-date">{caseItem.date}</span>
                                    </div>
                                </div>
                                <div className="case-card-footer">
                                    <button className="case-action-btn">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accepted Cases */}
                <section className="case-section">
                    <div className="section-header">
                        <div className="section-title-group">
                            <div className="section-icon accepted-icon">
                                <CheckCircle size={20} />
                            </div>
                            <h3>Accepted Cases</h3>
                            <span className="section-badge accepted-badge">
                                {caseStats.accepted}
                            </span>
                        </div>
                        <button className="view-all-btn">
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="case-cards">
                        {acceptedCases.map((caseItem) => (
                            <div 
                                key={caseItem.id} 
                                className="case-card accepted-card"
                                onClick={() => handleViewCase(caseItem.id)}
                            >
                                <div className="case-card-header">
                                    <span className="case-id">{caseItem.id}</span>
                                    <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                                        {caseItem.status}
                                    </span>
                                </div>
                                <div className="case-card-body">
                                    <h4 className="case-client">{caseItem.client}</h4>
                                    <div className="case-meta">
                                        <span className="case-type">{caseItem.type}</span>
                                        <span className="case-date">{caseItem.date}</span>
                                    </div>
                                </div>
                                <div className="case-card-footer">
                                    <button className="case-action-btn">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pending Upload Cases */}
                <section className="case-section">
                    <div className="section-header">
                        <div className="section-title-group">
                            <div className="section-icon upload-icon">
                                <Upload size={20} />
                            </div>
                            <h3>Pending Upload</h3>
                            <span className="section-badge upload-badge">
                                {caseStats.pendingUpload}
                            </span>
                        </div>
                        <button className="view-all-btn">
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="case-cards">
                        {pendingUploadCases.map((caseItem) => (
                            <div 
                                key={caseItem.id} 
                                className="case-card upload-card"
                                onClick={() => handleViewCase(caseItem.id)}
                            >
                                <div className="case-card-header">
                                    <span className="case-id">{caseItem.id}</span>
                                    <span className="doc-count">
                                        <Upload size={14} />
                                        {caseItem.documents} docs
                                    </span>
                                </div>
                                <div className="case-card-body">
                                    <h4 className="case-client">{caseItem.client}</h4>
                                    <div className="case-meta">
                                        <span className="case-type">{caseItem.type}</span>
                                        <span className="case-date">{caseItem.date}</span>
                                    </div>
                                </div>
                                <div className="case-card-footer">
                                    <button className="case-action-btn upload-action">
                                        Upload Documents
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Fixed Bottom Navigation */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Profile Overlay */}
            {showProfile && (
                <div className="profile-overlay">
                    <div className="profile-modal">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <User size={48} />
                            </div>
                            <h3>Aadarsh Kumar</h3>
                            <p className="profile-email">aadarsh@example.com</p>
                            <p className="profile-role">Legal Professional</p>
                        </div>
                        <div className="profile-menu">
                            <div className="profile-menu-item">
                                <User size={18} />
                                <span>My Profile</span>
                                <ArrowRight size={16} className="menu-arrow" />
                            </div>
                            <div className="profile-menu-item">
                                <FileText size={18} />
                                <span>My Cases</span>
                                <ArrowRight size={16} className="menu-arrow" />
                            </div>
                            <div className="profile-menu-item">
                                <Clock size={18} />
                                <span>Recent Activity</span>
                                <ArrowRight size={16} className="menu-arrow" />
                            </div>
                            <div className="profile-menu-item logout">
                                <span>Logout</span>
                            </div>
                        </div>
                        <button className="profile-close-btn" onClick={handleProfileClick}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;