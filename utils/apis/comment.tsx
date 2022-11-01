import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {NewCommentBody, refreshTokenHandler} from "../types";
import {responseHandler} from "../helpers";

export class Comment {
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

    async addNewComment(articleId: number, data: NewCommentBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/comment/${articleId}`, data
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeComment(articleId: number, commentId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/comment/${articleId}/${commentId}`
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
