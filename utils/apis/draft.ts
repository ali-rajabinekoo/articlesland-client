import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {SaveDraftValues} from "../types";

export class Draft {
    request: Request = new Request()
    private readonly accessToken: string | undefined

    constructor(token: string) {
        this.accessToken = token
    }

    async getArticleDrafts(id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        return this.request.sendRequest({
            method: 'GET', url
        }, this.accessToken as string)
    }

    async saveDraft(data: SaveDraftValues, id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        return this.request.sendRequest({
            method: 'POST', url, data
        }, this.accessToken as string)
    }

    async removeDraft(id: string): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'DELETE', url: `/draft/remove/${id}`
        }, this.accessToken as string)
    }
}
