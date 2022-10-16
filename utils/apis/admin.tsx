import {Request} from "../axios";
import {AxiosResponse} from "axios";
import {refreshTokenHandler, ReportTypes} from "../types";
import {responseHandler} from "../helpers";

export class Admin {
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

    async getAllUsers(page: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'GET', url: `/admin/users?page=${page || 1}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }

    async blockUserByAdmin(userId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/admin/block/${userId}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }

    async unblockUserByAdmin(userId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'POST', url: `/admin/unblock/${userId}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }

    async removeUserByAdmin(userId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/admin/${userId}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }

    //  reports

    async getAllReports(
        page?: number,
        keyword?: string,
        reportType?: ReportTypes | null | undefined,
        reportContentType?: 'comment' | 'post' | null | undefined,
    ): Promise<AxiosResponse | undefined> {
        let url = `/report?`;
        if (!!page) url += `page=${page || 1}&`;
        if (!!keyword) url += `keyword=${keyword?.trim()}&`;
        if (!!reportType) url += `reportType=${reportType}&`;
        if (!!reportContentType) url += `reportContentType=${reportContentType}&`;
        const result = await this.request.sendRequest({
            method: 'GET', url,
        }, this.accessToken);
        return responseHandler(result, this.onRefreshToken);
    }

    async removeReportById(reportId: number): Promise<AxiosResponse | undefined> {
        const result = await this.request.sendRequest({
            method: 'DELETE', url: `/report/${reportId}`
        }, this.accessToken)
        return responseHandler(result, this.onRefreshToken)
    }
}
