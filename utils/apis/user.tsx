import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {ProfileInfoFormValues, PureVerificationBody, SendEmailCodeValues, SendLoginCodeValues} from "../types";

export class User {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token: string, requiredToken?: boolean | undefined) {
        this.accessToken = token
        if (requiredToken !== undefined) {
            this.request = new Request(requiredToken)
        }
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

    async sendMobileUpdateCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/send`, data: body,
        }, this.accessToken as string)
    }

    async verifyMobileUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/verify`, data: body,
        }, this.accessToken as string)
    }

    async sendEmailUpdateCode(body: SendEmailCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/email/send`, data: body,
        }, this.accessToken as string)
    }

    async verifyEmailUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/email/verify`, data: body,
        }, this.accessToken as string)
    }
}
