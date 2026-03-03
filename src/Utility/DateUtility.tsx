const formatDate=(dateString: string | Date)=>{
    if(!dateString) return "-";
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB",{
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export {formatDate};