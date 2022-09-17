import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {LoginFormValues, SendLoginCodeValues, SignupFormValues, VerificationBody} from "../types";

export class Authentication {
    request: Request = new Request()

    async register(body: SignupFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/register', data: body
        })
    }

    async registerVerification(body: VerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/register/verify', data: body
        })
    }

    async loginByCredentials(body: LoginFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login', data: body
        })
    }

    async sendLoginCode(body: SendLoginCodeValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/send', data: body
        })
    }

    async verifyLoginCode(body: VerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/auth/login/mobile/check', data: body
        })
    }
}
