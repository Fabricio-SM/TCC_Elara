export function convertTimestampToDate(timestamp: any): Date {
    const newDate = new Date(timestamp);

    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth();
    const year = newDate.getUTCFullYear();

    return new Date(year, month, day);
}

export function convertDateToString(inputDate: Date) {
    const date = new Date(inputDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear());

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function convertStringToDate(dateString: string) {
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10) - 1;
    const year = parseInt(dateString.substring(4, 8), 10);

    return new Date(year, month, day);
}