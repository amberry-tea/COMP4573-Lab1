exports.checkLettersOnly = function (word) {
    const A = 65;
    const Z = 90;
    const SPACE = 32;
    for (const c of word) {
        if (c.charCodeAt() != SPACE && (c.charCodeAt() < A || c.charCodeAt() > Z)) {
            return false;
        }
    }
    return true;
};