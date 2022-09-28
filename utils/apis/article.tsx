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

    async getMyArticle(): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/article/mine`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async getArticle(id: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/article/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async getPublicArticle(id: string, username: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/article/public/${username}/${id}`
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

    async dropArticle(id: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/article/drop/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeArticle(id: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/article/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
    
    async addBookmark(articleId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/article/bookmark/${articleId}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeBookmark(articleId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/article/bookmark/${articleId}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async addLike(articleId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/article/like/${articleId}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeLike(articleId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/article/like/${articleId}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
