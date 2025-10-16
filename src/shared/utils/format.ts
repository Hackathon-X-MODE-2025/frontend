import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ru";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ru");

export const formatSize = (bytes: number): string => {
    if (!bytes || isNaN(bytes)) return "0 МБ";
    return (bytes / (1024 * 1024)).toFixed(2) + " МБ";
};

export function formatCreatedDate(dateString: string) {
    if (!dateString) return "-";
    return dayjs(dateString)
        .add(3, "hour")
        .format("DD.MM.YYYY HH:mm");
}

export const formatDate = (timestamp: string | number): string => {
    if (!timestamp) return "-";
    return dayjs(Number(timestamp))
        .add(3, "hour")
        .format("DD.MM.YYYY HH:mm");
};
