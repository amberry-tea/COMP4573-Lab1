exports.checkLettersOnly = function (word) {
    const A = 65;
    const Z = 90;
    for (const c of word) {
        if (c.charCodeAt() < A || c.charCodeAt() > Z) {
            return false;
        }
    }
    return true;
};