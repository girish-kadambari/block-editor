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
exports.splitTextByTemplate = exports.generateBlock = exports.NLP_BLOCK_TYPE = void 0;
exports.NLP_BLOCK_TYPE = {
    raw: 'raw',
    parameter: 'parameter',
    runtime: 'runtime',
    global: 'global',
    random: 'random',
    function: 'function',
    phone_number: 'phone_number',
    mail_box: 'mail_box',
    ui_identifier: 'ui_identifier',
    attribute: 'attribute',
    readonly_text: 'readonly_text',
};
var generateBlock = function (type, value, uuid, hasValue, more_details, isEncrypted) {
    if (hasValue === void 0) { hasValue = undefined; }
    if (more_details === void 0) { more_details = undefined; }
    return __assign(__assign({ type: type, value: typeof value === 'string' ? value.replace(/\n/g, '\\n') : value, isEncrypted: isEncrypted, uuid: uuid }, (hasValue === undefined ? {} : { has_value: hasValue })), (more_details === undefined ? {} : { more_details: more_details }));
};
exports.generateBlock = generateBlock;
var splitTextByTemplate = function (value) {
    var _a;
    if (typeof value !== 'string')
        return [];
    if (!value.length)
        return [];
    return ((_a = value.match(/(\$|\@|\#){[^{}]+}|[^$@#{}]+/g)) === null || _a === void 0 ? void 0 : _a.filter(function (i) { return i.length; })) || [];
};
exports.splitTextByTemplate = splitTextByTemplate;
