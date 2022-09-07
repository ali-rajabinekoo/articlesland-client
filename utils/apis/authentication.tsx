import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {LoginFormValues, SendLoginCodeValues, SignupFormValues, VerificationBody} from "../types";

export class Authentication {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token?: string | undefined) {
        if (!!token) this.accessToken = token
    }

    async register(body: SignupFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/register', data: body
        }, this.accessToken as string)
    }

    async registerVerification(body: VerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/register/verify', data: body
        }, this.accessToken as string)
    }

    async loginByCredentials(body: LoginFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login', data: body
        }, this.accessToken as string)
    }

    async sendLoginCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/send', data: body
        }, this.accessToken as string)
    }

    async verifyLoginCode(body: VerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/check', data: body
        }, this.accessToken as string)
    }
}
