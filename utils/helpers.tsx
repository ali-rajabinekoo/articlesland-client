import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "./messages";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";
import {
    LinkedItemDto,
    refreshTokenHandler,
    RefreshTokenResponse,
    UserAndTokenResponse
} from "./types";
import moment from "moment-jalaali";

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

export type notificationValidTypes = 'like' | 'comment' | 'follow'

const notificationMessages = {
    'like': (name: string) => `${name} پست شما را لایک کرد:`,
    'comment': (name: string) => `${name} برای شما کامنت گذاشت:`,
    'follow': (name: string) => `${name} شما را دنبال کرد`,
}

export const convertNotificationTypeToMessage = (type: notificationValidTypes, name: string) => {
    return notificationMessages[type](name)
}

export const defaultProfileCategoryItem: LinkedItemDto[] = [
    {
        label: 'پست ها',
        href: '/dashboard',
        value: 'posts'
    } as LinkedItemDto,
    {
        label: 'لایک شده ها',
        href: '/dashboard?tab=likes',
        value: 'likes'
    } as LinkedItemDto,
    {
        label: 'ذخیره شده ها',
        href: '/dashboard?tab=bookmarks',
        value: 'bookmarks'
    } as LinkedItemDto,
    {
        label: 'پیش نویس ها',
        href: '/dashboard?tab=unpublished',
        value: 'unpublished'
    } as LinkedItemDto,
]

export const defaultProfileCategoryValues = ['posts', 'likes', 'bookmarks', 'unpublished']

export const responseHandler = (
    result: AxiosResponse | RefreshTokenResponse | undefined,
    onRefreshToken: refreshTokenHandler
): AxiosResponse | undefined => {
    if (!!(result as RefreshTokenResponse)?.refreshTokenResponse) {
        onRefreshToken((result as RefreshTokenResponse).refreshTokenResponse as UserAndTokenResponse)
        return (result as RefreshTokenResponse).response as AxiosResponse | undefined
    } else {
        return result as AxiosResponse | undefined
    }
}

export const formatFullDate = (date: string): string => {
    const time: string = new Intl.DateTimeFormat('fa-IR', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23'
    }).format(new Date(date))
    const newDate: string = new Intl.DateTimeFormat('fa-IR').format(new Date(date))
    return `${time} - ${newDate}`;
}

export const formatDateFromNow = (date: string): string => {
    return moment((new Date(date)).toISOString()).fromNow()
}

export const validFeaturesFilter = ['mostPopular'];
