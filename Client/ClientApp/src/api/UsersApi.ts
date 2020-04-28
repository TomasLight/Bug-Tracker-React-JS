import { User } from "@app/Users/models/User";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";
import { UserDto } from "./models/users/responses/UserDto";

export class UsersApi extends ApiBase {
    public static async getUsers(): Promise<ApiResponse<User[]>> {
        const response = await this.get<UserDto[]>("/api/users");
        if (response.data) {
            response.data = response.data.map((dto: UserDto) => Mapper.map<User>(
                nameof<UserDto>(),
                nameof<User>(),
                dto
            ));
        }
        return response as ApiResponse<User[]>;
    }

    public static async getUserById(userId: number): Promise<ApiResponse<User>> {
        const response = await this.get<UserDto>(`/api/users/${userId}`);
        if (response.data) {
            response.data = Mapper.map<User>(
                nameof<UserDto>(),
                nameof<User>(),
                response.data
            );
        }
        return response as ApiResponse<User>;
    }

    public static async getCurrentUser(): Promise<ApiResponse<User>> {
        const response = await this.get<UserDto>("/api/users/current");
        if (response.data) {
            response.data = Mapper.map<User>(
                nameof<UserDto>(),
                nameof<User>(),
                response.data
            );
        }
        return response as ApiResponse<User>;
    }
}
