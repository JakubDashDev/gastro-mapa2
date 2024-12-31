"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSort = void 0;
function extractSort(req) {
    const sort = req.query.sort ? req.query.sort : "Od: najnowszych";
    let sortToReturn = {};
    switch (sort) {
        case "Alfabetycznie (A-Z)":
            sortToReturn = { name: 1 };
            break;
        case "Alfabetycznie (Z-A)":
            sortToReturn = { name: -1 };
            break;
        case "Ocena: malejąco":
            sortToReturn = { rating: -1 };
            break;
        case "Ocena: rosnąco":
            sortToReturn = { rating: 1 };
            break;
        case "Od: najnowszych":
            sortToReturn = { createdAt: -1 };
            break;
        case "Od: najstarszych":
            sortToReturn = { createdAt: 1 };
            break;
        default:
            sortToReturn = { createdAt: -1 };
            break;
    }
    return sortToReturn;
}
exports.extractSort = extractSort;