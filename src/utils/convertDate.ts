export function convertTimestampToDate(timestamp: any): Date {    
    return new Date(timestamp.nativeEvent.timestamp);
}

export function convertDateToString(inputDate: Date){
    const date = new Date(inputDate);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês começa com 0 em Date (janeiro = 0, fevereiro = 1, ...)
    const year = String(date.getUTCFullYear());
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}