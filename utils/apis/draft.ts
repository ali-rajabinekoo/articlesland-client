import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {SaveDraftValues} from "../types";

export class Draft {
    request: Request = new Request()

    async getArticleDrafts(id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        return this.request.sendRequest({
            method: 'GET', url
        })
    }

    async saveDraft(data: SaveDraftValues, id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        return this.request.sendRequest({
            method: 'POST', url, data
        })
    }

    async removeDraft(id: string): Promise<AxiosResponse | undefined> {
        return this.request.sendRequest({
            method: 'DELETE', url: `/draft/remove/${id}`
        })
    }
}
