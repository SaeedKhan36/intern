import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { projects } from "../data/projects";
import { validateDPR } from "../utils/validation";
import ImageUploader from "../components/ImageUploader";
import Navbar from "../components/Navbar";
import {
    ClipboardList,
    Calendar,
    Cloud,
    FileText,
    Users,
    Send,
    ArrowLeft,
    Loader2,
    CheckCircle2,
} from "lucide-react";

const weatherOptions = [
    { value: "", label: "Select weather" },
    { value: "Sunny", label: "☀️ Sunny" },
    { value: "Cloudy", label: "☁️ Cloudy" },
    { value: "Rainy", label: "🌧️ Rainy" },
];

export default function DPRForm() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        project: projectId || "",
        date: new Date().toISOString().split("T")[0],
        weather: "",
        description: "",
        workerCount: "",
    });
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId) {
            setFormData((prev) => ({ ...prev, project: projectId }));
        }
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateDPR({ ...formData, images });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Daily Progress Report submitted successfully!", {
            icon: "📋",
            duration: 4000,
        });

        // Reset form
        setFormData({
            project: "",
            date: new Date().toISOString().split("T")[0],
            weather: "",
            description: "",
            workerCount: "",
        });
        setImages([]);
        setErrors({});
        setLoading(false);
    };

    const selectedProject = projects.find(
        (p) => p.id === Number(formData.project)
    );

    const inputClasses = (field) =>
        `w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400
    ${errors[field]
            ? "border-red-300 bg-red-50/50"
            : "border-surface-300 bg-white hover:border-surface-400"
        }`;

    return (
        <div className="min-h-screen bg-surface-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        id="back-to-projects"
                        onClick={() => navigate("/projects")}
                        className="p-2 text-surface-400 hover:text-surface-700 hover:bg-white rounded-xl border border-transparent hover:border-surface-200 transition-all duration-200"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                            <ClipboardList size={18} className="text-primary-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
                                Daily Progress Report
                            </h1>
                            <p className="text-sm text-surface-500">
                                {selectedProject
                                    ? `Reporting for ${selectedProject.name}`
                                    : "Submit your daily field report"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-surface-900/5 border border-surface-200/60 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" id="dpr-form">
                        {/* Project */}
                        <div>
                            <label htmlFor="project" className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
                                <ClipboardList size={15} className="text-surface-400" />
                                Project
                            </label>
                            <select
                                id="project"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                className={inputClasses("project")}
                            >
                                <option value="">Select a project</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            {errors.project && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.project}</p>
                            )}
                        </div>

                        {/* Date & Weather Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
                                    <Calendar size={15} className="text-surface-400" />
                                    Date
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={inputClasses("date")}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-xs mt-1.5">{errors.date}</p>
                                )}
                            </div>

                            {/* Weather */}
                            <div>
                                <label htmlFor="weather" className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
                                    <Cloud size={15} className="text-surface-400" />
                                    Weather
                                </label>
                                <select
                                    id="weather"
                                    name="weather"
                                    value={formData.weather}
                                    onChange={handleChange}
                                    className={inputClasses("weather")}
                                >
                                    {weatherOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.weather && (
                                    <p className="text-red-500 text-xs mt-1.5">{errors.weather}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
                                <FileText size={15} className="text-surface-400" />
                                Work Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the work completed today, progress made, and any notable activities..."
                                className={`${inputClasses("description")} resize-none placeholder:text-surface-400`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>
                            )}
                        </div>

                        {/* Worker Count */}
                        <div>
                            <label htmlFor="workerCount" className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
                                <Users size={15} className="text-surface-400" />
                                Worker Count
                            </label>
                            <input
                                id="workerCount"
                                type="number"
                                name="workerCount"
                                value={formData.workerCount}
                                onChange={handleChange}
                                min="1"
                                placeholder="Number of workers on site"
                                className={`${inputClasses("workerCount")} max-w-xs`}
                            />
                            {errors.workerCount && (
                                <p className="text-red-500 text-xs mt-1.5">
                                    {errors.workerCount}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <ImageUploader
                            images={images}
                            setImages={setImages}
                            error={errors.images}
                        />

                        {/* Divider */}
                        <div className="border-t border-surface-100 pt-6">
                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/projects")}
                                    className="px-5 py-2.5 rounded-xl border border-surface-300 text-sm font-medium text-surface-600
                    hover:bg-surface-50 hover:border-surface-400 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    id="submit-dpr"
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
                    text-white font-medium py-2.5 px-6 rounded-xl shadow-lg shadow-primary-600/25
                    transition-all duration-200 hover:shadow-xl hover:shadow-primary-600/30
                    disabled:opacity-70 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2 text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Submit Report
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
