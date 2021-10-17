exports.checkLettersOnly = function (word) {
    const A = 65;
    const Z = 90;
    let valid = true;
    for (const c of word) {
        if (c.charCodeAt() < A || c.charCodeAt() > Z) {
            valid = false;
            break;
        }
    }
    return valid;
};