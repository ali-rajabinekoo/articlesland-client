import React from 'react';
import {showNotification} from "@mantine/notifications";
import {IconCheck} from "@tabler/icons";
import {appMessages} from "./messages";
import {UserDto, userStorageInterface} from "./types";
import {isJson} from "./helpers";

export const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
export const accessTokenKey: string | undefined = process.env.LOCAL_STORAGE_ACCESS_TOKEN
export const refreshTokenKey: string | undefined = process.env.LOCAL_STORAGE_REFRESH_TOKEN

class UserStorage implements userStorageInterface {
    getUserInfo(): UserDto {
        const user: string = window.localStorage.getItem(userKey as string) as string
        return isJson(user) ? JSON.parse(user) : user
    }

    getAccessToken(): string {
        const access_token: string = window.localStorage.getItem(accessTokenKey as string) as string
        return isJson(access_token) ? JSON.parse(access_token) : access_token
    }

    getRefreshToken(): string {
        const refresh_token: string = window.localStorage.getItem(refreshTokenKey as string) as string
        return isJson(refresh_token) ? JSON.parse(refresh_token) : refresh_token
    }

    setNewUser(newUser: UserDto): void {
        if (!!newUser && !!userKey) {
            window.localStorage.setItem(userKey as string, JSON.stringify(newUser) as string)
        }
    }

    setAccessToken(access_token: string): void {
        if (!!access_token && !!accessTokenKey) {
            window.localStorage.setItem(accessTokenKey as string, access_token as string)
        }
    }

    setRefreshToken(refresh_token: string): void {
        if (!!refresh_token && !!refreshTokenKey) {
            window.localStorage.setItem(refreshTokenKey as string, refresh_token as string)
        }
    }

    logout(messageOff: boolean = false): void {
        window.localStorage.removeItem(accessTokenKey as string)
        window.localStorage.removeItem(userKey as string)
        setTimeout(() => {
            window.location.href = "/login";
        }, 2100)
        if (!messageOff) showNotification({
            message: appMessages.loggedOut,
            autoClose: 2000,
            color: 'green',
            icon: <IconCheck size={20}/>
        })
    }
}

export default new UserStorage()
