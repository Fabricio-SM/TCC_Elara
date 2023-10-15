export function convertTimestampToDate(timestamp: any): Date { 
    const newDate = new Date(timestamp);

    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth();
    const year = newDate.getUTCFullYear();

    return new Date(year, month, day);
}

export function convertDateToString(inputDate: Date){
    const date = new Date(inputDate);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth()).padStart(2, '0'); // Mês começa com 0 em Date (janeiro = 0, fevereiro = 1, ...)
    const year = String(date.getUTCFullYear());
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}