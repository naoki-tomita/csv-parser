"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
function toValue(text) {
    if (/^".*"$/.test(text)) {
        return text.replace(/^"(.*)"$/, "$1");
    }
    if (text === "null") {
        return null;
    }
    if (/^\d+(?:\.\d+)?$/.test(text)) {
        return parseFloat(text);
    }
    return text;
}
function removeQuote(head) {
    if (/^".*"$/.test(head)) {
        return head.replace(/^"(.*)"$/, "$1");
    }
    return head;
}
function parse(text) {
    var keys = text.trim()
        .split("\n")[0]
        .match(/"[^"]*"|[^,]+/g)
        .map(function (it) { return it.trim(); })
        .map(removeQuote);
    return text.trim()
        .split("\n").slice(1)
        .map(function (it) { return it.trim(); })
        .map(function (it) { return it.match(/"[^"]*"|[^,]+/g); })
        .map(function (it) { return it.map(function (cell) { return cell.trim(); }); })
        .map(function (it) { return it.reduce(function (prev, next, i) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[keys[i]] = toValue(next), _a)));
    }, {}); });
}
exports.parse = parse;
//# sourceMappingURL=index.js.map
