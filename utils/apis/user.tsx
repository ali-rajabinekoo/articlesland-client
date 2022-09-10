import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {ProfileInfoFormValues} from "../types";

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

    async updateAvatar(body: FormData): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/avatar`, data: body,
        }, this.accessToken as string)
    }

    async updateInfo(body: ProfileInfoFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PUT', url: `/user`, data: body,
        }, this.accessToken as string)
    }
}
