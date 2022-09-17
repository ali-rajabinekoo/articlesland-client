import {RequestParams} from "./types";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import React from "react";
import userStorage from "../utils/userStorage";

export class Request {
    controller: AbortController | undefined
    accessToken: string

    constructor() {
        this.accessToken = userStorage.getAccessToken()
    }

    async requestClient({
        method,
        url,
        data,
        externalUrl = false
    }: RequestParams): Promise<AxiosResponse | undefined> {
        const domain: string | undefined = process.env.SERVER_DOMAIN
        const configs: AxiosRequestConfig = {
            method: method.toUpperCase(),
            url: externalUrl ? url : domain + url,
            headers: !externalUrl && !!this.accessToken
                ? {
                    authorization: `bearer ${this.accessToken}`,
                }
                : {},
        };
        if (!["GET", "DELETE"].includes(method.toUpperCase())) {
            configs.data = data;
        } else {
            configs.params = data;
        }
        return axios(configs);
    }

    async sendRequest(props: RequestParams): Promise<AxiosResponse | undefined> {
        console.log(props)
        try {
            this.controller = new AbortController();
            return await this.requestClient(props);
        } catch (e: AxiosError | any) {
            if (e instanceof AxiosError && e?.response?.status === 401) {
                const refreshToken: string = userStorage.getRefreshToken()
                console.log(refreshToken)
                // showNotification({
                //     message: appMessages.unauthorized,
                //     title: 'خطا',
                //     autoClose: 2000,
                //     color: 'red',
                //     icon: <IconAlertCircle size={20}/>
                // })
                // logout()
                // setTimeout(() => {
                //     window.location.href = "/login";
                // }, 2000)
            } else {
                throw e;
            }
        }
    }
}
