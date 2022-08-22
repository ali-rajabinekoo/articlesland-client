import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {SignupFormValues, VerificationBody} from "../types";

export class Authentication {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token: string) {
        this.accessToken = token
    }

    async register(body: SignupFormValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: 'auth/register', data: body
        }, this.accessToken as string)
    }

    async registerVerification(body: VerificationBody): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: 'auth/register/verify', data: body
        }, this.accessToken as string)
    }
}