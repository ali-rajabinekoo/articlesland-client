import React from "react";
import {RefreshTokenResponse, RequestParams, UserAndTokenResponse, UserDto} from "./types";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {getRefreshToken, logout, setAccessToken, setUserInfo} from "../hooks/useUserInfo";

export const fetcher = (url: string) => {
    const domain: string | undefined = process.env.SERVER_DOMAIN
    return axios.get(domain + url).then(res => res.data)
}

export class Request {
    controller: AbortController | undefined
    requiredToken: boolean = true

    constructor(requiredToken: boolean = true) {
        this.requiredToken = requiredToken
    }

    async reLoginWithRefreshToken(refreshToken: string): Promise<UserAndTokenResponse | null> {
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
                const data: UserAndTokenResponse = response.data
                setAccessToken(data.token as string)
                setUserInfo(data.user as UserDto)
                return response.data as UserAndTokenResponse
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
    }: RequestParams, accessToken?: string | undefined): Promise<AxiosResponse | undefined> {
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

    async sendRequest(
        props: RequestParams,
        accessToken?: string | undefined
    ): Promise<AxiosResponse | RefreshTokenResponse | undefined> {
        if (process.env.NODE_ENV === 'development') console.log(props)
        try {
            this.controller = new AbortController();
            return await this.requestClient(props, accessToken);
        } catch (e: AxiosError | any) {
            if (e instanceof AxiosError && e?.response?.status === 401) {
                const refreshToken: string = getRefreshToken()
                if (!!refreshToken) {
                    const refreshTokenResponse: UserAndTokenResponse | null =
                        await this.reLoginWithRefreshToken(refreshToken)
                    if (!!refreshTokenResponse) {
                        try {
                            const response = await this.requestClient(props, refreshTokenResponse.token);
                            return {
                                response,
                                refreshTokenResponse,
                            } as RefreshTokenResponse
                        } catch (error) {
                            throw error;
                        }
                    }
                }
                logout(
                    this.requiredToken ?
                        {disableMessage: false, disableRedirect: false} :
                        {disableMessage: true, disableRedirect: true}
                )
            } else {
                throw e;
            }
        }
    }
}
