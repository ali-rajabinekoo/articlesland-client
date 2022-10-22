import {Request} from "../axios";
import {AxiosResponse} from "axios";

export class Link {
    request: Request = new Request()

    async getShortLink(shortLink: string): Promise<AxiosResponse | undefined> {
        return (await this.request.sendRequest({
            method: 'GET', url: `/link/${shortLink}`
        })) as AxiosResponse
    }

    async setShortLink(articleId: number): Promise<AxiosResponse | undefined> {
        return (await this.request.sendRequest({
            method: 'POST', url: `/link/${articleId}`
        })) as AxiosResponse
    }
}
