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
var utils_1 = require("./utils");
var getType = function (key, template, dataMap) {
    var _a;
    return ((_a = dataMap[key]) === null || _a === void 0 ? void 0 : _a.type) || 'readonly_text';
};
var assignValuesToTextBlock = function (textBlocks, template, stepDataMap, stepMapperData, stepDataGenerators) {
    var _a;
    var dataMap = (stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap.testData) || ((_a = template === null || template === void 0 ? void 0 : template.data) === null || _a === void 0 ? void 0 : _a.testData) || (template === null || template === void 0 ? void 0 : template.testData);
    return textBlocks.map(function (block, idx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var match = block.match(/[$@#]\{(.*)\}/);
        if (match) {
            var key = match[1].trim();
            var type = void 0, value = void 0, hasValue = void 0;
            if (block.startsWith('$')) {
                type = getType(key, template, dataMap);
                value = ((_a = dataMap[key]) === null || _a === void 0 ? void 0 : _a.value) === '' ? (_b = dataMap[key]) === null || _b === void 0 ? void 0 : _b.value : ((_c = dataMap[key]) === null || _c === void 0 ? void 0 : _c.value) || dataMap[key];
                hasValue = Boolean(((_e = (_d = stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap.testData) === null || _d === void 0 ? void 0 : _d[key]) === null || _e === void 0 ? void 0 : _e.value) || (stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]));
            }
            else if (block.startsWith('#')) {
                type = 'ui_identifier';
                value = (stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]) || 'element';
                hasValue = Boolean(stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]);
            }
            else if (block.startsWith('@')) {
                type = 'attribute';
                value = (stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]) === '' ? type : (stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]) || 'attribute';
                hasValue = Boolean(stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap[key]);
            }
            var testDataKeyValue = ((_f = dataMap === null || dataMap === void 0 ? void 0 : dataMap[key]) === null || _f === void 0 ? void 0 : _f.value) || (dataMap === null || dataMap === void 0 ? void 0 : dataMap[key]);
            var parameter = testDataKeyValue === 'parameter' || key === 'parameter';
            var profile = testDataKeyValue === 'test data profile' || key === 'testDataProfile';
            var appName = testDataKeyValue === 'app-name' || key === 'appName';
            var appVersion = testDataKeyValue === 'app-version' || key === 'appVersion';
            var sessionValue = testDataKeyValue === 'session-name' || key === 'sessionValue';
            var moreDetails = __assign(__assign({ templateId: template === null || template === void 0 ? void 0 : template.id, allowedTypes: (_g = template === null || template === void 0 ? void 0 : template.allowedTypes) === null || _g === void 0 ? void 0 : _g[key], allowedValues: (_h = template === null || template === void 0 ? void 0 : template.allowedValues) === null || _h === void 0 ? void 0 : _h[key], mapper: stepMapperData, profile: profile, parameter: parameter, appName: appName, appVersion: appVersion, sessionValue: sessionValue, testDataInfo: (stepDataGenerators === null || stepDataGenerators === void 0 ? void 0 : stepDataGenerators[key]) || null }, (profile && ((_j = stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap.testData) === null || _j === void 0 ? void 0 : _j.testDataProfileId)
                ? { profileId: (_l = (_k = stepDataMap === null || stepDataMap === void 0 ? void 0 : stepDataMap.testData) === null || _k === void 0 ? void 0 : _k.testDataProfileId) === null || _l === void 0 ? void 0 : _l.value }
                : {})), { data: (_m = template === null || template === void 0 ? void 0 : template.dataAttributes) === null || _m === void 0 ? void 0 : _m.data });
            var isEncrypted = (_o = dataMap[key]) === null || _o === void 0 ? void 0 : _o.isEncrypted;
            return (0, utils_1.generateBlock)(type, value, key, hasValue, moreDetails, isEncrypted);
        }
        else {
            return (0, utils_1.generateBlock)(utils_1.NLP_BLOCK_TYPE.readonly_text, block, idx.toString());
        }
    });
};
// Example data
var template = {
    "id": 60455,
    "applicationType": "Salesforce",
    "keyword": "storeColumnNumber",
    "grammar": "Store the column number in the table #{uiIdentifier} which contains the text ${testData1} in ANY row into the variable ${testData2}",
    "data": {
        "uiIdentifier": "element",
        "testData": {
            "testData1": "test data1",
            "testData2": "test data2"
        }
    },
    "allowedTypes": {
        "testData2": ["raw", "parameter", "runtime", "global", "random", "function", "phone_number", "mail_box"],
        "testData1": ["raw", "parameter", "runtime", "global", "random", "function", "phone_number", "mail_box"]
    },
    "dataAttributes": {
        "data": [
            {
                "canEncrypt": "true",
                "displayName": "testData1"
            },
            {
                "canEncrypt": "false",
                "displayName": "testData2"
            }
        ]
    }
};
var stepDataMap = {
    "uiIdentifier": "Account_Id",
    "testData": {
        "testData2": {
            "type": "parameter",
            "value": "Parameter 1",
            "isEncrypted": false
        },
        "testData1": {
            "type": "parameter",
            "value": "Parameter 1",
            "isEncrypted": false
        }
    }
};
var stepMapperData = undefined;
var stepDataGenerators = {};
var textBlocks = (0, utils_1.splitTextByTemplate)(template.grammar);
var blocks = assignValuesToTextBlock(textBlocks, template, stepDataMap, stepMapperData, stepDataGenerators);
console.log(blocks);
