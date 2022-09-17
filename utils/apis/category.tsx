import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {SetSelectedCategories} from "../types";

export class Category {
    request: Request = new Request()

    async getCategories(): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: '/category'
        })
    }

    async setCategoriesForUser(body: SetSelectedCategories): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/category', data: body
        })
    }
}
