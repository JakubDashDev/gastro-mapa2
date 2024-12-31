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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantService_1 = __importDefault(require("../services/restaurantService"));
const generateFinalQuery_1 = require("../utils/restaurantController/generateFinalQuery");
const extractKeywords_1 = require("../utils/restaurantController/extractKeywords");
const extractFilters_1 = require("../utils/restaurantController/extractFilters");
const extractSort_1 = require("../utils/restaurantController/extractSort");
const emptyRequest = {
    query: {},
    body: {},
};
const queryRequest = {
    query: {
        sort: "sort-1",
        filters: "filters-1",
        keyword: "keyword",
    },
    body: {},
};
const bodyRequest = {
    query: {},
    body: {
        name: "Restaurant 1",
        youtubeLink: "https://youtu.be/asdf", //NOTE: required for update restaurant test
    },
    params: {
        id: "1",
    },
};
describe("list restaurants", () => {
    it("gets restaurant", () => {
        //Arange
        const mockModel = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
        };
        const service = (0, restaurantService_1.default)(mockModel);
        //Act
        service.listRestaurants(emptyRequest);
        //Arrange
        expect(mockModel.find).toHaveBeenCalled();
        expect(mockModel.sort).toHaveBeenCalled();
        expect(mockModel.lean).toHaveBeenCalled();
    });
    it("gets restaurant with filters", () => {
        //Arange
        const mockModel = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
        };
        const service = (0, restaurantService_1.default)(mockModel);
        //Act
        service.listRestaurants(queryRequest);
        const keyword = (0, extractKeywords_1.extractKeywords)(queryRequest);
        const { categories, ratings } = (0, extractFilters_1.extractFilters)(queryRequest);
        const sort = (0, extractSort_1.extractSort)(queryRequest);
        const finalQuery = (0, generateFinalQuery_1.generateFinalQuery)(keyword, ratings, categories);
        //Arrange
        expect(mockModel.sort).toHaveBeenCalledWith(sort);
        expect(mockModel.find).toHaveBeenCalledWith(finalQuery);
    });
});
describe("create restaurants", () => {
    const save = jest.fn();
    let restaurant;
    const mockModel = function (data) {
        restaurant = data;
        return Object.assign(Object.assign({}, data), { save });
    };
    afterAll(() => {
        save.mockReset();
        restaurant = undefined;
    });
    it("creates restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const service = (0, restaurantService_1.default)(mockModel);
        //Act
        yield service.createRestaurant(bodyRequest);
        //Assert
        expect(save).toHaveBeenCalled();
        expect(restaurant.name).toBe(bodyRequest.body.name);
    }));
    it("throws error if invalid rating is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const service = (0, restaurantService_1.default)(mockModel);
        const data = {
            body: Object.assign(Object.assign({}, bodyRequest.body), { rating: "invalid" }),
        };
        //Act & Assert
        try {
            yield service.createRestaurant(data);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Zakres oceny jest nieprawidłowy!");
            }
        }
    }));
});
describe("delete restaurant", () => {
    it("deletes restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const restaurant = {
            _id: "1",
            name: "Restaurant 1",
            deleteOne: jest.fn(() => { }),
        };
        const MockModel = {
            findById: jest.fn(() => restaurant),
        };
        const service = (0, restaurantService_1.default)(MockModel);
        //Act
        yield service.deleteRestuarant(bodyRequest);
        //Assert
        expect(MockModel.findById).toHaveBeenCalledWith(bodyRequest.params.id);
        expect(restaurant.deleteOne).toHaveBeenCalled();
    }));
});
describe("update restaurant", () => {
    const save = jest.fn().mockResolvedValue({ id: "1", name: "New Restaurant" });
    const restaurant = {
        id: "1",
        name: "Old Restaurant",
        save,
    };
    const mockModel = {
        findById: jest.fn(() => restaurant),
    };
    afterAll(() => {
        save.mockReset();
    });
    it("updates restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const service = (0, restaurantService_1.default)(mockModel);
        //Act
        const result = yield service.updateRestaurant(bodyRequest);
        //Assert
        expect(mockModel.findById).toHaveBeenCalledWith(bodyRequest.params.id);
        expect(mockModel.findById.mock.results[0].value.name).toBe("Restaurant 1");
        expect(result).toStrictEqual({ id: "1", name: "New Restaurant" });
    }));
    it("throws error when invalid rating provieded", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const service = (0, restaurantService_1.default)(mockModel);
        const data = {
            body: Object.assign(Object.assign({}, bodyRequest.body), { rating: "invalid" }),
            params: {
                id: "1",
            },
        };
        //Act & Assert
        try {
            yield service.updateRestaurant(data);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Zakres oceny jest nieprawidłowy!");
            }
        }
    }));
});
