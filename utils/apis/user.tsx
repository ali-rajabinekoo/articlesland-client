import {Request} from "../axios";
import {AxiosResponse} from "axios";

export class User {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token: string) {
        this.accessToken = token
    }

    async userInfo(): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: `/user`
        }, this.accessToken as string)
    }
}
