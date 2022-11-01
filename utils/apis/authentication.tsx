import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {LoginFormValues, refreshTokenHandler, SendLoginCodeValues, SignupFormValues, VerificationBody} from "../types";
import {responseHandler} from "../helpers";

export class Authentication {
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

    async register(body: SignupFormValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/auth/register', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async registerVerification(body: VerificationBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/auth/register/verify', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async loginByCredentials(body: LoginFormValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/auth/login', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async sendLoginCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/send', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async verifyLoginCode(body: VerificationBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/check', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
