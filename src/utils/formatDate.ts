// Utility function to convert ISO time to IST
export const convertToIST = (isoDateString: string) => {
    const date = new Date(isoDateString);
  
    // IST is UTC + 5:30
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  };