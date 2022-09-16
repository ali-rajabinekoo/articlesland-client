import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {CreateArticleValues} from "../types";

export class Article {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token: string | undefined, requiredToken?: boolean | undefined) {
        this.accessToken = token
        if (requiredToken !== undefined) {
            this.request = new Request(requiredToken)
        }
    }

    async getArticle(id: string): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: `/article/${id}`
        }, this.accessToken as string)
    }

    async createArticle(body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/article', data: body
        }, this.accessToken as string)
    }

    async updateArticle(id: number, body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PUT', url: `/article/${id}`, data: body
        }, this.accessToken as string)
    }

    async saveAndPublishArticle(id: number, body: FormData): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/article/${id}`, data: body
        }, this.accessToken as string)
    }

    async removeArticle(id: number): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'DELETE', url: `/article/${id}`
        }, this.accessToken as string)
    }
}
