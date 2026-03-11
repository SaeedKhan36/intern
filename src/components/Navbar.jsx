import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    HardHat,
    LayoutDashboard,
    ClipboardList,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const navLinks = [
        { to: "/projects", label: "Projects", icon: LayoutDashboard },
        { to: "/dpr", label: "New Report", icon: ClipboardList },
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-surface-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/projects" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-surface-900 rounded-lg flex items-center justify-center shadow-sm">
                            <HardHat size={16} className="text-white" />
                        </div>
                        <span className="text-base font-semibold text-surface-900 tracking-tight">
                            FieldSync
                        </span>
                    </Link>

                    {/* Desktop Nav - Centered */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200
                                        ${isActive(link.to)
                                            ? "text-surface-900"
                                            : "text-surface-500 hover:text-surface-800"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User + Logout */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-medium text-surface-700">{user?.name}</p>
                            <p className="text-xs text-surface-400">{user?.role}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-surface-100 border border-surface-200 flex items-center justify-center text-surface-700 text-xs font-semibold">
                            {user?.name?.charAt(0)}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-1 p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-surface-200 bg-white">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.to)
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-surface-600 hover:bg-surface-100"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-2 mt-2 border-t border-surface-100">
                            <div className="flex items-center gap-3 px-3 py-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-surface-100 border border-surface-200 flex items-center justify-center text-surface-700 text-xs font-semibold">
                                    {user?.name?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-surface-700">{user?.name}</p>
                                    <p className="text-xs text-surface-400">{user?.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
