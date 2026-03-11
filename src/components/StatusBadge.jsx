const statusStyles = {
    Active:
        "bg-surface-50 text-surface-900 border border-surface-200",
    Pending:
        "bg-surface-50 text-surface-700 border border-surface-200",
    Completed:
        "bg-surface-50 text-surface-500 border border-surface-200",
};

const dotStyles = {
    Active: "bg-surface-900",
    Pending: "bg-amber-500",
    Completed: "bg-surface-300",
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
