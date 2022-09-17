import React from "react";
import {RequestParams} from "./types";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {getRefreshToken, setAccessToken, setUserInfo} from "../hooks/useUserInfo";

export class Request {
    controller: AbortController | undefined
    requiredToken: boolean = true

    constructor(requiredToken: boolean = true) {
        this.requiredToken = requiredToken
    }

    async reLoginWithRefreshToken(refreshToken: string): Promise<string | null> {
        try {
            const domain: string | undefined = process.env.SERVER_DOMAIN
            const configs: AxiosRequestConfig = {
                method: 'POST',
                url: `${domain}/auth/login/refreshToken`,
                headers: {},
                data: {refreshToken}
            };
            const response: AxiosResponse | undefined = await axios(configs);
            if (!!response?.data?.token && !!response?.data?.user) {
                setAccessToken(response.data.token)
                setUserInfo(response.data.user)
                return response.data.token
            } else {
                return null
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async requestClient({
        method,
        url,
        data,
        externalUrl = false
    }: RequestParams, accessToken: string | undefined): Promise<AxiosResponse | undefined> {
        const domain: string | undefined = process.env.SERVER_DOMAIN
        const configs: AxiosRequestConfig = {
            method: method.toUpperCase(),
            url: externalUrl ? url : domain + url,
            headers: !externalUrl && !!accessToken
                ? {
                    authorization: `bearer ${accessToken}`,
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

    async sendRequest(props: RequestParams, accessToken: string | undefined): Promise<AxiosResponse | undefined> {
        try {
            this.controller = new AbortController();
            return await this.requestClient(props, accessToken);
        } catch (e: AxiosError | any) {
            if (e instanceof AxiosError && e?.response?.status === 401) {
                const refreshToken: string = getRefreshToken()
                if (!!refreshToken) {
                    const newAccessToken: string | null = await this.reLoginWithRefreshToken(refreshToken)
                    if (!!newAccessToken) {
                        try {
                            return await this.requestClient(props, newAccessToken);
                        } catch (error) {
                            throw error;
                        }
                    }
                }
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
