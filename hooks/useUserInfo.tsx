import React from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";
import {useLocalStorage} from "@mantine/hooks";
import {isJson} from "../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconCheck} from "@tabler/icons";

const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
const accessTokenKey: string | undefined = process.env.LOCAL_STORAGE_ACCESS_TOKEN

export default function useUserInfo(): UseUserInfoResult {
    const [userInfo, setUserInfo] = useLocalStorage<UserDto | null>({
        key: userKey as string, serialize: JSON.stringify,
        deserialize: (str) => (str === undefined ? null : JSON.parse(str)),
    });
    const [accessToken, setAccessToken] = useLocalStorage<string>({
        key: accessTokenKey as string
    });

    const setNewUser = (newUser: UserDto | null): void => {
        if (!!newUser && !!userKey) {
            setUserInfo(newUser)
        }
    }

    const setNewAccessToken = (newAccessToken: string | null): void => {
        if (!!newAccessToken && !!accessTokenKey) {
            setAccessToken(newAccessToken as string);
        }
    }

    const getAccessToken = (): string => {
        const access_token: string = window.localStorage.getItem(accessTokenKey as string) as string
        return isJson(access_token) ? JSON.parse(access_token) : access_token
    }

    const logout = (): void => {
        window.localStorage.removeItem(accessTokenKey as string)
        window.localStorage.removeItem(userKey as string)
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000)
        showNotification({
            message: appMessages.loggedOut,
            autoClose: 2000,
            color: 'green',
            icon: <IconCheck size={20}/>
        })
    }

    return {
        userInfo,
        accessToken,
        setNewUser,
        setNewAccessToken,
        getAccessToken,
        logout,
    }
}
