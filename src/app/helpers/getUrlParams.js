module.exports = function (param) {
    return new URLSearchParams(window.location.search).get(param);
};
