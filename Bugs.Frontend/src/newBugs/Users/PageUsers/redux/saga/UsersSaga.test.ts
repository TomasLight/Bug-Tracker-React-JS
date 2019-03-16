// import test from "jest";

import {UsersSaga} from "./UsersSaga";



test('UsersSaga -> get users test', (assert) => {
    const gen = UsersSaga.getUsers();

    expect(gen.next()).toEqual({done: false});
    expect(gen.next()).toEqual({done: false, data: "Введите имя"});
    expect(gen.next()).toEqual({done: false});
    expect(gen.next()).toEqual({done: true});
});


// test("validate of user model", () => {
    // const user = new UserDTO();
    // expect(TestUserValidator.validate(user)).toBe("Введите имя");
    // expect(TestUserValidator.validate(user)).toEqual({firstName: "Введите имя"});
// });