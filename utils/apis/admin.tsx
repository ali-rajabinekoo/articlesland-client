import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {refreshTokenHandler} from "../types";
import {responseHandler} from "../helpers";

export class Admin {
    request: Request = new Request()
    onRefreshToken: refreshTokenHandler = () => null;
    private readonly accessToken: string | undefined

    constructor(
        token?: string | undefined,
        handleOnRefreshToken?: Function | undefined,
        requiredToken?: boolean | undefined,
    ) {
        if (!!token) this.accessToken = token
        if (!!handleOnRefreshToken) {
            this.onRefreshToken = handleOnRefreshToken as refreshTokenHandler
        }
        if (requiredToken !== undefined) {
            this.request = new Request(requiredToken)
        }
    }

    async getAllUsers(page: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/admin/users?page=${page || 1}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }
}
