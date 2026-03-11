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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg relative z-10">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-surface-900 rounded-xl flex items-center justify-center shadow-md mb-4">
                        <HardHat size={24} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-surface-900">
                        FieldSync
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Construction Field Management
                    </p>
                </div>


                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-surface-900">Welcome back</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Sign in to manage your field operations
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" id="login-form">

                        {authError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                {authError}
                            </div>
                        )}


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                                    className={`w-full h-12 pl-11 pr-4 rounded-lg border text-sm
                                        placeholder:text-gray-400 transition-all duration-200
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        ${errors.email ? "border-red-300 bg-red-50/50" : "border-gray-300 bg-white"}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                                    className={`w-full h-12 pl-11 pr-4 rounded-lg border text-sm
                                        placeholder:text-gray-400 transition-all duration-200
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        ${errors.password ? "border-red-300 bg-red-50/50" : "border-gray-300 bg-white"}`}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                id="login-button"
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg
                                    transition-all duration-200
                                    disabled:opacity-70 disabled:cursor-not-allowed
                                    flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Demo hint */}
                    <p className="text-xs text-gray-400 text-center mt-5">
                        Demo credentials:{" "}
                        <span className="text-gray-500 font-medium">test@test.com</span>
                        {" / "}
                        <span className="text-gray-500 font-medium">123456</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
