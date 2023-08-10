export function convertTimestampToDate(timestamp: any): string {
    const date = new Date(timestamp);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês começa com 0 em Date (janeiro = 0, fevereiro = 1, ...)
    const year = String(date.getUTCFullYear());
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }