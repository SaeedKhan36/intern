import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project }) {
    const navigate = useNavigate();

    return (
        <div
            id={`project-card-${project.id}`}
            onClick={() => navigate(`/dpr/${project.id}`)}
            className="group bg-white rounded-xl border border-surface-200 p-5 cursor-pointer
        shadow-sm hover:shadow-lg hover:border-primary-300
        transition-all duration-300 ease-out hover:-translate-y-0.5"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-surface-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {project.name}
                </h3>
                <ChevronRight
                    size={18}
                    className="text-surface-400 group-hover:text-primary-500 transition-all
            group-hover:translate-x-0.5 flex-shrink-0 mt-0.5"
                />
            </div>

            {/* Status */}
            <div className="mb-3">
                <StatusBadge status={project.status} />
            </div>

            {/* Description */}
            <p className="text-sm text-surface-500 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-2 pt-3 border-t border-surface-100">
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
