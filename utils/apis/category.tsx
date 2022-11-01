import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {refreshTokenHandler, SetSelectedCategories} from "../types";
import {responseHandler} from "../helpers";

export class Category {
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

    async getCategories(): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: '/category'
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async setCategoriesForUser(body: SetSelectedCategories): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/category', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
