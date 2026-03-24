const formatDate=(dateString: string | Date)=>{
    if(!dateString) return undefined;
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB",{
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const formateDateWithTime = (dateString: any)=>{
    if(!dateString) return undefined;
     const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return date.toLocaleString('en-US', options);
}

export {formatDate, formateDateWithTime};