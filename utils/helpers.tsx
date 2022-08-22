import {AxiosError} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "./messages";

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
                })
            }
        } else {
            showNotification({
                message: message,
                title: 'خطا',
                autoClose: 1500,
                color: 'red',
            })
        }
    } else {
        showNotification({
            message: appMessages.somethingWentWrong,
            title: 'خطا',
            autoClose: 3000,
            color: 'red',
        })
    }
}

export const normalizePhoneNumber = (mobile: string): string => {
    let newMobile: string = mobile.replace(/^\+98/g, '');
    newMobile = newMobile.replace(/^98/g, '');
    newMobile = newMobile.replace(/^09/g, '9');
    return newMobile;
}

export class Timer {
    minutes: number = 0
    seconds: number = 0
    timeInterval: any

    constructor() {
        this.seconds = 0
        this.minutes = 2
        this.timeInterval = setInterval(() => {
            if (this.seconds === 0) {
                if (this.minutes - 1 !== -1) {
                    this.minutes = this.minutes - 1
                    this.seconds = 59
                } else {
                    clearInterval(this.timeInterval)
                }
            } else {
                this.seconds = this.seconds - 1
            }
            if (this.minutes === 0 && this.seconds === 0) {
                clearInterval(this.timeInterval)
            }
        }, 1000)
    }
}
