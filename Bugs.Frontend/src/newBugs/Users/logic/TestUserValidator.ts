import {UserDTO} from "../../../models/users/UserDTO";

export class TestUserValidator {
    static validate(user: UserDTO, isNew: boolean = false) {
        if (user.firstName == "") {
            return {firstName: "Введите имя"};
        }

        if (user.lastName == "") {
            return {lastName: "Введите фамилию"};
        }

        if (isNew && user.login == "") {
            return {login: "Введите логин"};
        }

        if (isNew && user.password == "") {
            return {password: "Введите пароль"};
        }
        // else if (user.password !== user.confirmPassword) {
        //     alert("Пароли должны совпадать");
        // }
    }
}