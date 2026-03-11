import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project }) {
    const navigate = useNavigate();

    return (
        <div
            id={`project-card-${project.id}`}
            onClick={() => navigate(`/dpr/${project.id}`)}
            className="group bg-white rounded-xl border border-surface-200 p-6 cursor-pointer
        shadow-sm hover:shadow-md hover:border-surface-300
        transition-all duration-200 ease-out"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {project.name}
                </h3>
                <ChevronRight
                    size={16}
                    className="text-surface-400 group-hover:text-surface-900 transition-colors
            flex-shrink-0 mt-0.5"
                />
            </div>

            {/* Status */}
            <div className="mb-3">
                <StatusBadge status={project.status} />
            </div>

            {/* Description */}
            <p className="text-sm text-surface-600 mb-5 line-clamp-2 leading-relaxed">
                {project.description}
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-surface-100">
                <div className="flex items-center gap-2 text-xs text-surface-500">
                    <Calendar size={13} className="text-surface-400" />
                    <span>{new Date(project.startDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-500">
                    <MapPin size={13} className="text-surface-400" />
                    <span className="line-clamp-1">{project.location}</span>
                </div>
            </div>
        </div>
    );
}
