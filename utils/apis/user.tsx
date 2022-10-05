import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {
    FollowBody,
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

    async getUserInfo(username: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/user/${username}`
        })
        return responseHandler(result, this.onRefreshToken)
    }

    async usersList(): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/user/list`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
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

    async follow(body: FollowBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/user/follow`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async unfollow(body: FollowBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/user/unfollow`, data: body,
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}

export class PublicUserApi {
    request: Request = new Request()

    constructor(
        token?: string | undefined,
        handleOnRefreshToken?: Function | undefined,
        requiredToken?: boolean | undefined,
    ) {
        this.request = new Request(requiredToken)
    }

    async getUserInfo(username: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/user/${username}`
        })
        return result as AxiosResponse | undefined
    }

    async usersList(
        keyword?: string | undefined, 
        page?: number | undefined
    ): Promise<AxiosResponse | undefined> {
        let url = '/user/list';
        if (!!keyword?.trim()) {
            url += `?keyword=${keyword?.trim()}&`
        }
        if (!!page) {
            url += `?page=${page}`
        }
        const result = await this.request.sendRequest({
            method: 'GET', url,
        })
        return result as AxiosResponse | undefined
    }
}
