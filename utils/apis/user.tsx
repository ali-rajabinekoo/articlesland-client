import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {
    ProfileInfoFormValues,
    PureVerificationBody,
    refreshTokenHandler,
    SendEmailCodeValues,
    SendLoginCodeValues
} from "../types";
import {responseHandler} from "../helpers";

export class User {
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

    async userInfo(): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/user`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async updateAvatar(body: FormData): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/user/avatar`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async updateInfo(body: ProfileInfoFormValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PUT', url: `/user`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async sendMobileUpdateCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/send`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async verifyMobileUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/verify`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async sendEmailUpdateCode(body: SendEmailCodeValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/user/email/send`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async verifyEmailUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/user/email/verify`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
