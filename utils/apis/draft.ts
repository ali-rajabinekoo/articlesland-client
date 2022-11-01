import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {refreshTokenHandler, SaveDraftValues} from "../types";
import {responseHandler} from "../helpers";

export class Draft {
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

    async getArticleDrafts(id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        const result = await this.request.sendRequest({
            method: 'GET', url
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async saveDraft(data: SaveDraftValues, id?: number | undefined): Promise<AxiosResponse | undefined> {
        let url = `/draft`
        if (!!id) url = `/draft/${id}`
        const result = await this.request.sendRequest({
            method: 'POST', url, data
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeDraft(id: string): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/draft/remove/${id}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
