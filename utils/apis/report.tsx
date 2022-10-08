import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {NewReportBody, refreshTokenHandler} from "../types";
import {responseHandler} from "../helpers";

export class Report {
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

    async addNewReport(data: NewReportBody): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/report`, data
        }, this.accessToken as string)
        return responseHandler(result, this.onRefreshToken)
    }
}
