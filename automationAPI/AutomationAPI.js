"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("./utils/init");
var fetch_1 = require("./utils/fetch");
var getter_1 = require("./site/getter");
var axios = require('axios');
var AutomationAPI = /** @class */ (function () {
    function AutomationAPI(id, secret, debug) {
        this.config = {
            method: '',
            url: '',
            headers: {},
            data: '',
            maxBodyLength: Infinity,
        };
        this.init = init_1.init; // function to initiate the process
        this.fetchData = fetch_1.fetchData; // function to fetch the data to the original automation API
        this.getAllSiteCode = getter_1.getAllSiteCode;
        this.getAllSiteID = getter_1.getAllSiteID;
        this.client_id = id;
        this.client_secret = secret;
        if (debug && debug === true) {
            this.debug = true;
            console.log("Debug mode is ON");
        }
    }
    AutomationAPI.prototype.createAAtest = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, data, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        method = 'post';
                        url = "https://api.kameleoon.com/experiments";
                        headers = {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        data = JSON.stringify({
                            name: config.name,
                            siteId: config.siteId,
                            goals: config.goals,
                            baseURL: config.baseURL,
                            targetingConfiguration: config.targetingConfiguration,
                            type: config.type,
                            mainGoalId: config.mainGoalId
                        });
                        if (this.debug) {
                            console.log("Creating new aa test with the following details:");
                            console.log("Headers:", headers);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, data)];
                    case 1:
                        response = _a.sent();
                        if (this.debug)
                            console.log("Response for creating aa test:", response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error while create aa test :", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AutomationAPI.prototype.getGoalId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, url2, headers, response, response2, allSiteID_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        method = 'get';
                        url = "https://api.kameleoon.com/goals?page=1&perPage=200";
                        url2 = "https://api.kameleoon.com/goals?page=2&perPage=200";
                        headers = {
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        if (this.debug) {
                            console.log("Requesting segments Ids with the following details:");
                            console.log("Headers:", headers);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, '')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.fetchData(method, url2, headers, '')];
                    case 2:
                        response2 = _a.sent();
                        allSiteID_1 = [];
                        response.forEach(function (site) {
                            if (site.id) {
                                allSiteID_1.push(site.id);
                            }
                        });
                        response2.forEach(function (site) {
                            if (site.id) {
                                allSiteID_1.push(site.id);
                            }
                        });
                        if (this.debug)
                            console.log("Extracted goals Ids:", allSiteID_1);
                        return [2 /*return*/, allSiteID_1];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error while fetching segment ids:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutomationAPI.prototype.getAllSegments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, response, allSiteID_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.debug)
                            console.log("Fetching all segments Ids...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        method = 'get';
                        url = "https://api.kameleoon.com/segments";
                        headers = {
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        if (this.debug) {
                            console.log("Requesting segments Ids with the following details:");
                            console.log("Headers:", headers);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, '')];
                    case 2:
                        response = _a.sent();
                        if (this.debug)
                            console.log("Response for segment ids:", response);
                        allSiteID_2 = [];
                        response.forEach(function (site) {
                            if (site.id) {
                                allSiteID_2.push(site.id);
                            }
                        });
                        if (this.debug)
                            console.log("Extracted segment Ids:", allSiteID_2);
                        return [2 /*return*/, allSiteID_2];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error while fetching segment ids:", error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutomationAPI.prototype.getOneSegment = function (siteId, segmentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AutomationAPI.prototype.createGoal = function (siteId, goals) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, returnObject, _i, goals_1, goal, data, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.debug)
                            console.log("Creating goals for site ID:", siteId);
                        method = 'post';
                        url = 'https://api.kameleoon.com/goals';
                        headers = {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        returnObject = {};
                        _i = 0, goals_1 = goals;
                        _a.label = 1;
                    case 1:
                        if (!(_i < goals_1.length)) return [3 /*break*/, 6];
                        goal = goals_1[_i];
                        if (this.debug)
                            console.log("Creating goal: ".concat(goal));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = JSON.stringify({
                            name: "".concat(goal),
                            siteId: siteId,
                            type: 'CUSTOM',
                            hasMultipleConversions: true,
                        });
                        if (this.debug) {
                            console.log("Request payload for goal creation:", data);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, data)];
                    case 3:
                        response = _a.sent();
                        if (this.debug)
                            console.log("Response for goal creation:", response);
                        returnObject["".concat(goal)] = response.id;
                        if (this.debug)
                            console.log("Response for goal creation:", response);
                        returnObject["".concat(goal)] = response.id;
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error("Error while creating goal: ".concat(goal), error_4);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (this.debug)
                            console.log("Final created goals object:", returnObject);
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    AutomationAPI.prototype.createNewAcessToPageGoal = function (siteId, goals, matchType) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, returnObject, _i, goals_2, goal, data, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.debug)
                            console.log("Creating goals for site ID:", siteId);
                        method = 'post';
                        url = 'https://api.kameleoon.com/goals';
                        headers = {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        returnObject = {};
                        _i = 0, goals_2 = goals;
                        _a.label = 1;
                    case 1:
                        if (!(_i < goals_2.length)) return [3 /*break*/, 6];
                        goal = goals_2[_i];
                        if (this.debug)
                            console.log("Creating goal: ".concat(goal));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = JSON.stringify({
                            name: "".concat(Object.keys(goal)),
                            siteId: siteId,
                            type: 'URL',
                            hasMultipleConversions: true,
                            params: {
                                matchString: "".concat(Object.values(goal)),
                                matchType: "".concat(matchType)
                            }
                        });
                        if (this.debug) {
                            console.log("Request payload for goal creation:", data);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, data)];
                    case 3:
                        response = _a.sent();
                        if (this.debug)
                            console.log("Response for goal creation:", response);
                        returnObject["".concat(goal)] = response.id;
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        console.error("Error while creating goal: ".concat(goal), error_5);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (this.debug)
                            console.log("Final created goals object:", returnObject);
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    AutomationAPI.prototype.createCD = function (siteId, cds) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, returnObject, _i, cds_1, cd, nameRegex, validTypes, validScopes, data, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.debug)
                            console.log("Creating CD's for site ID:", siteId);
                        method = 'post';
                        url = 'https://api.kameleoon.com/custom-datas';
                        headers = {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        returnObject = {};
                        _i = 0, cds_1 = cds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < cds_1.length)) return [3 /*break*/, 6];
                        cd = cds_1[_i];
                        nameRegex = /^[a-zA-Z0-9_$]+$/;
                        if (!nameRegex.test(cd[0])) {
                            console.error("Erreur: Le nom \"".concat(cd[0], "\" n'est pas valide. Il doit \u00EAtre alphanum\u00E9rique ou contenir des symboles de variable."));
                            return [3 /*break*/, 5];
                        }
                        validTypes = ["STRING", "NUMBER", "BOOLEAN"];
                        if (!validTypes.includes(cd[1])) {
                            console.error("Erreur: Le type \"".concat(cd[1], "\" est invalide. Il doit \u00EAtre \"STRING\", \"NUMBER\" ou \"BOOLEAN\"."));
                            return [3 /*break*/, 5];
                        }
                        validScopes = ["PAGE", "VISIT", "VISITOR"];
                        if (cd[2] && !validScopes.includes(cd[2])) {
                            console.error("Erreur: Le scope \"".concat(cd[2], "\" est invalide. Il doit \u00EAtre \"PAGE\", \"VISIT\" ou \"VISITOR\" (ou absent)."));
                            return [3 /*break*/, 5];
                        }
                        if (this.debug)
                            console.log("Creating CD: ".concat(cd[0]));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = JSON.stringify({
                            "format": "".concat(cd[1]),
                            "method": "CLIENT",
                            "name": "".concat(cd[0]),
                            "siteId": siteId,
                            "type": "UNIQUE",
                            "scope": "".concat(cd[2] ? cd[2] : "VISIT")
                        });
                        if (this.debug) {
                            console.log("Request payload for cd creation:", data);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, data)];
                    case 3:
                        response = _a.sent();
                        if (this.debug)
                            console.log("Response for cd creation:", response);
                        returnObject["".concat(cd[0])] = response.id;
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _a.sent();
                        console.error("Error while creating cd: ".concat(cd[0]), error_6);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (this.debug)
                            console.log("Final created cds object:", returnObject);
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    AutomationAPI.prototype.updateGlobalScript = function (siteId, newGlobalScript) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, headers, siteConfiguration, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.debug)
                            console.log("Updating Global Script for site : ", siteId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        method = 'get';
                        url = "https://api.kameleoon.com/sites/".concat(siteId);
                        headers = {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': "Bearer ".concat(this.access_token),
                        };
                        if (this.debug) {
                            console.log("Requesting Global script modification for following details:");
                            console.log('Method:', method);
                            console.log('Url: ', url);
                            console.log("Headers:", headers);
                        }
                        return [4 /*yield*/, this.fetchData(method, url, headers, '')];
                    case 2:
                        siteConfiguration = _a.sent();
                        console.log(siteConfiguration);
                        if (siteConfiguration.trackingScript) {
                            siteConfiguration.trackingScript = newGlobalScript;
                        }
                        else {
                            siteConfiguration['trackingScript'] = newGlobalScript;
                        }
                        method = 'put';
                        if (this.debug)
                            console.log("Site configuration for site ", siteId, " : ", siteConfiguration);
                        return [4 /*yield*/, this.fetchData(method, url, headers, JSON.stringify(siteConfiguration))];
                    case 3:
                        _a.sent();
                        console.log("Global script update for siteId :", siteId, "have been successfully done");
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _a.sent();
                        console.error("Error during global script update:", error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AutomationAPI;
}());
exports.default = AutomationAPI;
