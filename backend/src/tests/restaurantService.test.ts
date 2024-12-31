import { Request } from "express";
import RestaurantModel, { RestaurantType } from "../models/restaurantModel";
import restaurantService from "../services/restaurantService";
import { generateFinalQuery } from "../utils/restaurantController/generateFinalQuery";
import { extractKeywords } from "../utils/restaurantController/extractKeywords";
import { extractFilters } from "../utils/restaurantController/extractFilters";
import { extractSort } from "../utils/restaurantController/extractSort";

const emptyRequest = {
  query: {},
  body: {},
} as unknown as Request;

const queryRequest = {
  query: {
    sort: "sort-1",
    filters: "filters-1",
    keyword: "keyword",
  },
  body: {},
} as unknown as Request;

const bodyRequest = {
  query: {},
  body: {
    name: "Restaurant 1",
    youtubeLink: "https://youtu.be/asdf", //NOTE: required for update restaurant test
  },
  params: {
    id: "1",
  },
} as unknown as Request;

describe("list restaurants", () => {
  it("gets restaurant", () => {
    //Arange
    const mockModel = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
    };
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);

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
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);

    //Act
    service.listRestaurants(queryRequest);
    const keyword = extractKeywords(queryRequest);
    const { categories, ratings } = extractFilters(queryRequest);
    const sort = extractSort(queryRequest);
    const finalQuery = generateFinalQuery(keyword, ratings, categories);

    //Arrange
    expect(mockModel.sort).toHaveBeenCalledWith(sort);
    expect(mockModel.find).toHaveBeenCalledWith(finalQuery);
  });
});

describe("create restaurants", () => {
  const save = jest.fn();
  let restaurant;

  const mockModel = function (data: RestaurantType) {
    restaurant = data;
    return {
      ...data,
      save,
    };
  };

  afterAll(() => {
    save.mockReset();
    restaurant = undefined;
  });

  it("creates restaurant", async () => {
    //Arrange
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);

    //Act
    await service.createRestaurant(bodyRequest);

    //Assert
    expect(save).toHaveBeenCalled();
    expect(restaurant!.name).toBe(bodyRequest.body.name);
  });

  it("throws error if invalid rating is provided", async () => {
    //Arrange
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);
    const data = {
      body: {
        ...bodyRequest.body,
        rating: "invalid",
      },
    } as unknown as Request;

    //Act & Assert
    try {
      await service.createRestaurant(data);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof Error) {
        expect(error.message).toBe("Zakres oceny jest nieprawidłowy!");
      }
    }
  });
});

describe("delete restaurant", () => {
  it("deletes restaurant", async () => {
    //Arrange
    const restaurant = {
      _id: "1",
      name: "Restaurant 1",
      deleteOne: jest.fn(() => {}),
    };

    const MockModel = {
      findById: jest.fn(() => restaurant),
    };

    const service = restaurantService(MockModel as unknown as typeof RestaurantModel);

    //Act
    await service.deleteRestuarant(bodyRequest);

    //Assert
    expect(MockModel.findById).toHaveBeenCalledWith(bodyRequest.params.id);
    expect(restaurant.deleteOne).toHaveBeenCalled();
  });
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

  it("updates restaurant", async () => {
    //Arrange
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);

    //Act
    const result = await service.updateRestaurant(bodyRequest);

    //Assert
    expect(mockModel.findById).toHaveBeenCalledWith(bodyRequest.params.id);
    expect(mockModel.findById.mock.results[0].value.name).toBe("Restaurant 1");
    expect(result).toStrictEqual({ id: "1", name: "New Restaurant" });
  });

  it("throws error when invalid rating provieded", async () => {
    //Arrange
    const service = restaurantService(mockModel as unknown as typeof RestaurantModel);
    const data = {
      body: {
        ...bodyRequest.body,
        rating: "invalid",
      },
      params: {
        id: "1",
      },
    } as unknown as Request;

    //Act & Assert
    try {
      await service.updateRestaurant(data);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof Error) {
        expect(error.message).toBe("Zakres oceny jest nieprawidłowy!");
      }
    }
  });
});
