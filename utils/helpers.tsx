import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "./messages";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";
import {APIS, GetArticleResponseDto} from "./types";

export const errorHandler = (e: AxiosError | any) => {
    if (e instanceof AxiosError) {
        const message: string | string[] = e.response?.data?.message;
        if (message instanceof Array) {
            for (const msg of message) {
                showNotification({
                    message: msg,
                    title: 'خطا',
                    autoClose: 1500,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
        } else {
            showNotification({
                message: message,
                title: 'خطا',
                autoClose: 1500,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
    } else {
        console.log(e)
        showNotification({
            message: appMessages.somethingWentWrong,
            title: 'خطا',
            autoClose: 3000,
            color: 'red',
            icon: <IconAlertCircle size={20}/>
        })
    }
}

export const normalizePhoneNumber = (mobile: string): string => {
    let newMobile: string = mobile.replace(/^\+98/g, '');
    newMobile = newMobile.replace(/^98/g, '');
    newMobile = newMobile.replace(/^09/g, '9');
    return newMobile;
}

export const changeUrlToServerRequest = (url: string): string => {
    const domain: string | undefined = process.env.SERVER_DOMAIN
    return `${domain as string}${url}`
}

export function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const fetchArticle = async (apis: APIS, id: string): Promise<GetArticleResponseDto | null> => {
    try {
        const response: AxiosResponse | undefined = await apis.article.getArticle(id as string)
        if (!response) {
            showNotification({
                message: 'عنوان پست الزامیست',
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            return null
        } else {
            return response.data as GetArticleResponseDto
        }
    } catch (e: AxiosError | any) {
        errorHandler(e)
        return null
    }
}
