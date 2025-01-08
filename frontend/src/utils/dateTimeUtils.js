"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoubi = exports.padFrontZero = exports.formatShortTime = exports.formatTime = void 0;
const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toTimeString().split(" ")[0]; // "HH:MM:SS"形式で取得
};
exports.formatTime = formatTime;
const formatShortTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const shorttime = date.toTimeString().split(" ")[0].substring(0, 5);
    // console.log("shorttime:", shorttime);
    return shorttime; // "HH:MM"形式で取得
};
exports.formatShortTime = formatShortTime;
const padFrontZero = (num, size) => String(num).padStart(size, '0');
exports.padFrontZero = padFrontZero;
const youbiList = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
const getYoubi = (date) => {
    const youbi = new Date(date).getDay();
    return youbiList[youbi];
};
exports.getYoubi = getYoubi;
