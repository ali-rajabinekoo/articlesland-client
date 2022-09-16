import {RequestParams} from "./types";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "./messages";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";
import {logout} from "../hooks/useUserInfo";

export class Request {
    controller: AbortController | undefined
    requiredToken: boolean = true

    constructor(requiredToken: boolean = true) {
        this.requiredToken = requiredToken
    }

    async sendRequest({
        method,
        url,
        data,
        externalUrl = false
    }: RequestParams, accessToken: string | undefined): Promise<AxiosResponse | undefined> {
        try {
            this.controller = new AbortController();
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
            return await axios(configs);
        } catch (e: AxiosError | any) {
            if (e instanceof AxiosError && e?.response?.status === 401 && this.requiredToken) {
                showNotification({
                    message: appMessages.unauthorized,
                    title: 'خطا',
                    autoClose: 2000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                logout()
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000)
            } else {
                throw e;
            }
        }
    }
}
