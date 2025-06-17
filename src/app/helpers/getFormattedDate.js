module.exports = function getFormattedDate(lang) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const fullYear = String(date.getFullYear());
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (lang?.toLowerCase().includes("pt")) {
        const dateOptions = {
            day: "numeric", // '2-digit'
            month: "long", // '2-digit'
            year: "numeric", // numeric
        };

        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };

        return `${date.toLocaleDateString(lang, dateOptions)}, às ${date.toLocaleTimeString(
            lang,
            timeOptions
        )}`;
    }

    return `${day}/${month}/${fullYear}, às ${hour}:${minutes}`;
};
