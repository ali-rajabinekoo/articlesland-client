import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {SetSelectedCategories} from "../types";

export class Category {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token?: string | undefined, requiredToken?: boolean | undefined) {
        if (!!token) this.accessToken = token
        if (requiredToken !== undefined) {
            this.request = new Request(requiredToken)
        }
    }

    async getCategories(): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: '/category'
        }, this.accessToken as string)
    }

    async setCategoriesForUser(body: SetSelectedCategories): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/category', data: body
        }, this.accessToken as string)
    }
}
