import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";
import { HardHat, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");

        const validationErrors = validateLogin(email, password);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);

        // simulate brief loading
        await new Promise((resolve) => setTimeout(resolve, 600));

        const result = login(email, password);
        if (result.success) {
            navigate("/projects");
        } else {
            setAuthError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">

            <div className="w-full max-w-md relative">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-surface-900 rounded-xl shadow-sm mb-4">
                        <HardHat size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-surface-900 tracking-tight">
                        FieldSync
                    </h1>
                    <p className="text-surface-500 text-sm mt-1">
                        Construction Field Management
                    </p>
                </div>


                <div className="bg-white rounded-2xl border border-surface-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-surface-900 tracking-tight">Welcome back</h2>
                        <p className="text-sm text-surface-500 mt-1.5">
                            Sign in to manage your field operations
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" id="login-form">

                        {authError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                {authError}
                            </div>
                        )}


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors((prev) => ({ ...prev, email: undefined }));
                                        setAuthError("");
                                    }}
                                    placeholder="you@company.com"
                                    className={`w-full pl-11 pr-4 py-2.5 rounded-lg border text-sm
                                        placeholder:text-surface-400 transition-colors duration-200
                                        focus:outline-none focus:ring-1 focus:ring-surface-900 focus:border-surface-900 shadow-sm
                                        ${errors.email ? "border-red-300 bg-red-50/50" : "border-surface-200 bg-white hover:border-surface-300"}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors((prev) => ({ ...prev, password: undefined }));
                                        setAuthError("");
                                    }}
                                    placeholder="Enter your password"
                                    className={`w-full pl-11 pr-4 py-2.5 rounded-lg border text-sm
                                        placeholder:text-surface-400 transition-colors duration-200
                                        focus:outline-none focus:ring-1 focus:ring-surface-900 focus:border-surface-900 shadow-sm
                                        ${errors.password ? "border-red-300 bg-red-50/50" : "border-surface-200 bg-white hover:border-surface-300"}`}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
                            )}
                        </div>


                        <button
                            id="login-button"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-surface-900 hover:bg-black text-white font-medium py-2.5 px-4 rounded-lg
                                shadow-sm transition-colors duration-200 
                                disabled:opacity-70 disabled:cursor-not-allowed
                                flex items-center justify-center gap-2 text-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>


                    <div className="mt-6 pt-5 border-t border-surface-100">
                        <p className="text-xs text-surface-400 text-center">
                            Demo credentials:{" "}
                            <span className="text-surface-600 font-medium">test@test.com</span>
                            {" / "}
                            <span className="text-surface-600 font-medium">123456</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
