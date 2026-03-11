import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import { Search, Filter, FolderKanban } from "lucide-react";

const statusOptions = ["All", "Active", "Pending", "Completed"];

export default function Projects() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project) => {
        const matchesStatus =
            statusFilter === "All" || project.status === statusFilter;
        const matchesSearch =
            !searchQuery ||
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        All: projects.length,
        Active: projects.filter((p) => p.status === "Active").length,
        Pending: projects.filter((p) => p.status === "Pending").length,
        Completed: projects.filter((p) => p.status === "Completed").length,
    };

    return (
        <div className="min-h-screen bg-surface-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                            <FolderKanban size={18} className="text-primary-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-surface-800 tracking-tight">
                                Projects
                            </h1>
                            <p className="text-sm text-surface-500">
                                {projects.length} total projects across all sites
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input
                            id="project-search"
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-300 bg-white text-sm
                placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400
                transition-all duration-200 hover:border-surface-400"
                        />
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-1 bg-white border border-surface-200 rounded-xl p-1">
                        {statusOptions.map((status) => (
                            <button
                                key={status}
                                id={`filter-${status.toLowerCase()}`}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${statusFilter === status
                                        ? "bg-primary-50 text-primary-700 shadow-sm"
                                        : "text-surface-500 hover:text-surface-700 hover:bg-surface-50"
                                    }`}
                            >
                                {status}
                                <span className="ml-1 text-[10px] opacity-60">
                                    {statusCounts[status]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-14 h-14 bg-surface-100 rounded-2xl flex items-center justify-center mb-4">
                            <Filter size={24} className="text-surface-400" />
                        </div>
                        <h3 className="text-base font-semibold text-surface-700 mb-1">
                            No projects found
                        </h3>
                        <p className="text-sm text-surface-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
