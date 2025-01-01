import { ObjectId } from "mongodb";
import AdminUser from "../models/adminUserModel";

const one = new AdminUser({
  email: "test1@test.com",
  password: "12345678",
  username: "test1",
});

const two = new AdminUser({
  email: "test2@test.com",
  password: "12345678",
  username: "test2",
});

it("gets user by id", async () => {
  //Arrange
  const user_one = await one.save();

  //Act
  const result = await AdminUser.findById(user_one._id);

  //Assert
  expect(result).toBeDefined();
  expect(result?.email).toBe(user_one.email);
});

it("update password", async () => {
  //Arrange
  const user_one = await one.save();

  //Act
  user_one.password = "87654321";
  const newUser = await user_one.save();

  //Assert
  expect(newUser.passwordChangeAt).toBeDefined();
});

it("update user", async () => {
  //Arrange
  const user_one = await one.save();

  //Act
  user_one.email = "new@new.com";
  user_one.username = "newUsername";

  //Assert
  expect(user_one.email).toBe("new@new.com");
  expect(user_one.username).toBe("newUsername");
});
