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
    const regex = /(\d{2})(\d{2})(\d{4})|(\d{1,2}) de (\w+) de (\d{4})|(\d{1,2})(\d{1,2})(\d{4})/;
    const match = dateString.match(regex);

    if (match) {
        if (match[1]) {
            // Formato "ddmmyyyy"
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1; // Mês baseado em zero
            const year = parseInt(match[3], 10);

            return new Date(year, month, day);
        } else if (match[4]) {
            // Formato "dd de mês de yyyy"
            const day = parseInt(match[4], 10);
            const month = getNUmberOfMonth(match[5]);
            const year = parseInt(match[6], 10);

            return new Date(year, month, day);
        } else if (match[7]) {
            // Formato "ddmmyyyy"
            const day = parseInt(match[7], 10);
            const month = parseInt(match[8], 10) - 1; // Mês baseado em zero
            const year = parseInt(match[9], 10);

            return new Date(year, month, day);
        }
    }

    return undefined;
}

function getNUmberOfMonth(nameMonth: string) {
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const monthIndex = months.findIndex(month => month.toLowerCase() === nameMonth.toLowerCase());
    return monthIndex !== -1 ? monthIndex : 0;
}