import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {CreateArticleValues} from "../types";

export class Article {
    request: Request = new Request()

    async getArticle(id: string): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'GET', url: `/article/${id}`
        })
    }

    async createArticle(body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'POST', url: '/article', data: body
        })
    }

    async updateArticle(id: number, body: CreateArticleValues): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PUT', url: `/article/${id}`, data: body
        })
    }

    async saveAndPublishArticle(id: number, body: FormData): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'PATCH', url: `/article/${id}`, data: body
        })
    }

    async removeArticle(id: number): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'DELETE', url: `/article/${id}`
        })
    }
}
