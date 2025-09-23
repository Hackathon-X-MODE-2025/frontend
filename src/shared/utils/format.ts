export const formatSize = (bytes: number): string => {
    if (!bytes || isNaN(bytes)) return "0 МБ";
    return (bytes / (1024 * 1024)).toFixed(2) + " МБ";
};

export const formatDate = (timestamp: string | number): string => {
    if (!timestamp) return "-";
    const date = new Date(Number(timestamp));
    return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
