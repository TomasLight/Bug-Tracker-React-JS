import {TestUserValidator} from "./TestUserValidator";
import {UserDTO} from "../../../models/users/UserDTO";

test("validate of user model", () => {
    const user = new UserDTO();
    // expect(TestUserValidator.validate(user)).toBe("Введите имя");
    expect(TestUserValidator.validate(user)).toEqual({firstName: "Введите имя"});

    user.firstName = "some1";
    expect(TestUserValidator.validate(user)).toEqual({lastName: "Введите фамилию"});

    user.lastName = "some2";
    expect(TestUserValidator.validate(user, true)).toEqual({login: "Введите логин"});

    user.login = "some3";
    expect(TestUserValidator.validate(user, true)).toEqual({password: "Введите пароль"});
});