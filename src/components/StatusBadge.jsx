const statusStyles = {
    Active:
        "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending:
        "bg-amber-50 text-amber-700 border border-amber-200",
    Completed:
        "bg-slate-100 text-slate-600 border border-slate-200",
};

const dotStyles = {
    Active: "bg-emerald-500",
    Pending: "bg-amber-500",
    Completed: "bg-slate-400",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.Pending}`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || dotStyles.Pending}`}
            />
            {status}
        </span>
    );
}
