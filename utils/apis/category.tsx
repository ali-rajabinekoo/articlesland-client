import {Request} from "../axios";
import {AxiosResponse} from "axios";

export class Category {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token?: string | undefined) {
        if (!!token) this.accessToken = token
    }

    async getCategories(): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: '/category'
        }, this.accessToken as string)
    }
}
