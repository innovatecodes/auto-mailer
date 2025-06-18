module.exports = function getFormattedDate(lang) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const fullYear = String(date.getFullYear());
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    lang = String(lang ?? "").toLowerCase();

    if (lang.includes("pt-br")) {
        const dateOptions = {
            day: "numeric", // '2-digit'
            month: "long", // '2-digit'
            year: "numeric", // numeric
        };

        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Sao_Paulo",
        };

        // eslint-disable-next-line no-unused-vars
        const dateTimeOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Sao_Paulo",
        };

        return `${date.toLocaleDateString(lang, dateOptions)}, às ${date.toLocaleTimeString(
            lang,
            timeOptions
        )}`;
    } else return `${day}/${month}/${fullYear}, às ${hour}:${minutes}`;
};
