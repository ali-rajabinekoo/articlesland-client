import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {ProfileInfoFormValues, PureVerificationBody, SendEmailCodeValues, SendLoginCodeValues} from "../types";

export class User {
    request: Request = new Request()

    async userInfo(): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: `/user`
        })
    }

    async updateAvatar(body: FormData): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/avatar`, data: body,
        })
    }

    async updateInfo(body: ProfileInfoFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PUT', url: `/user`, data: body,
        })
    }

    async sendMobileUpdateCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/send`, data: body,
        })
    }

    async verifyMobileUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/mobile/verify`, data: body,
        })
    }

    async sendEmailUpdateCode(body: SendEmailCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/email/send`, data: body,
        })
    }

    async verifyEmailUpdateCode(body: PureVerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/user/email/verify`, data: body,
        })
    }
}
