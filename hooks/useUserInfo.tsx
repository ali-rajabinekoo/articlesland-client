import React from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";
import {useLocalStorage} from "@mantine/hooks";
import {isJson} from "../utils/helpers";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconCheck} from "@tabler/icons";
import {useAppDispatch, useAppSelector} from "./redux";
import {AppDispatch, RootState} from "../utils/app.store";
import {setUserInfo} from "../reducers/userInfo";

const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
const accessTokenKey: string | undefined = process.env.LOCAL_STORAGE_ACCESS_TOKEN
const refreshTokenKey: string | undefined = process.env.LOCAL_STORAGE_REFRESH_TOKEN

class logoutProps {
    disableMessage?: boolean
    disableRedirect?: boolean
}

export const logout = (props: logoutProps | undefined): void => {
    window.localStorage.removeItem(refreshTokenKey as string)
    window.localStorage.removeItem(accessTokenKey as string)
    window.localStorage.removeItem(userKey as string)
    if (props?.disableRedirect !== false) setTimeout(() => {
        window.location.href = "/login";
    }, 2000)
    if (props?.disableMessage !== false) showNotification({
        message: appMessages.loggedOut,
        autoClose: 2000,
        color: 'green',
        icon: <IconCheck size={20}/>
    })
}

export const getRefreshToken = (): string => {
    const refresh_token: string = window.localStorage.getItem(refreshTokenKey as string) as string
    return isJson(refresh_token) ? JSON.parse(refresh_token) : refresh_token
}

export const setAccessToken = (newAccessToken: string | null): void => {
    if (!!newAccessToken && !!accessTokenKey) {
        window.localStorage.setItem(accessTokenKey as string, newAccessToken as string)
    }
}

const formatUserBodyLocalStorage = (newUser: UserDto) => {
    const validFields = [
        'id',
        'username',
        'displayName',
        'phoneNumber',
        'email',
        'avatar',
        'bio',
        'refreshToken',
        'created_at',
        'updated_at',
    ];
    for (const newUserKey in newUser) {
        if (!validFields.includes(newUserKey)) {
            // @ts-ignore
            delete newUser[newUserKey];
        }
    }
    return newUser
}

const setMainUserInfo = (user: UserDto | undefined): void => {
    if (!!UserDto && !!userKey) {
        window.localStorage.setItem(userKey as string, JSON.stringify(user) as string)
    }
}

export {setMainUserInfo as setUserInfo}

export default function useUserInfo(): UseUserInfoResult {
    const userInfo: UserDto | null = useAppSelector((state: RootState) => state.userInfo.data)
    const dispatch: AppDispatch = useAppDispatch()
    const [mainUserInfo, setMainUserInfo] = useLocalStorage<UserDto | null>({
        key: userKey as string, serialize: JSON.stringify,
        deserialize: (str) => (str === undefined ? null : JSON.parse(str)),
    });
    const [accessToken, setAccessToken] = useLocalStorage<string>({
        key: accessTokenKey as string
    });
    const [refreshToken, setRefreshToken] = useLocalStorage<string>({
        key: refreshTokenKey as string
    });

    const setNewUser = (newUser: UserDto | null, authMode?: boolean): void => {
        if (!!newUser && !!userKey) {
            if (!authMode) dispatch(setUserInfo({...newUser} as UserDto))
            setMainUserInfo(formatUserBodyLocalStorage(newUser))
        }
    }

    const setNewAccessToken = (newAccessToken: string | null): void => {
        if (!!newAccessToken && !!accessTokenKey) {
            setAccessToken(newAccessToken as string);
        }
    }

    const setNewRefreshToken = (newRefreshToken: string | null): void => {
        if (!!newRefreshToken && !!refreshTokenKey) {
            setRefreshToken(newRefreshToken as string);
        }
    }

    const getAccessToken = (): string => {
        const access_token: string = window.localStorage.getItem(accessTokenKey as string) as string
        return isJson(access_token) ? JSON.parse(access_token) : access_token
    }

    return {
        userInfo,
        mainUserInfo,
        accessToken,
        refreshToken,
        setNewUser,
        setNewAccessToken,
        setNewRefreshToken,
        getAccessToken,
        logout,
    }
}
