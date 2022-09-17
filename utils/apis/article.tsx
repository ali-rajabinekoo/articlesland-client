import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {CreateArticleValues, refreshTokenHandler} from "../types";
import {responseHandler} from "../helpers";

export class Article {
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

    async getArticle(id: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/article/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async createArticle(body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: '/article', data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async updateArticle(id: number, body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PUT', url: `/article/${id}`, data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async saveAndPublishArticle(id: number, body: FormData): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'PATCH', url: `/article/${id}`, data: body
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeArticle(id: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/article/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
