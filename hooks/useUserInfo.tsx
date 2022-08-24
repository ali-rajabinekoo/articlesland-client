import React from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";

const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
const accessTokenKey: string | undefined = process.env.SESSION_STORAGE_ACCESS_TOKEN

export default function useUserInfo(): UseUserInfoResult {
    const getUser = (): UserDto | null => {
        let fetchedUserInfo: string | null = null
        if (!!userKey) {
            fetchedUserInfo = window.localStorage.getItem(userKey);
        }
        if (!!fetchedUserInfo) {
            return JSON.parse(fetchedUserInfo) as UserDto
        }
        return null
    }

    const getAccessToken = (): string | null => {
        let fetchedAccessToken: string | null = null
        if (!!accessTokenKey) {
            fetchedAccessToken = window.sessionStorage.getItem(accessTokenKey);
        }
        if (!!fetchedAccessToken) {
            return fetchedAccessToken
        }
        return null
    }

    const setNewUser = (newUser: UserDto | null): void => {
        if (!!newUser && !!userKey) {
            window.localStorage.setItem(userKey, JSON.stringify(newUser));
        }
    }

    const setNewAccessToken = (newAccessToken: string | null): void => {
        if (!!newAccessToken && !!accessTokenKey) {
            window.sessionStorage.setItem(accessTokenKey, newAccessToken);
        }
    }

    return {
        getUser,
        setNewUser,
        getAccessToken,
        setNewAccessToken
    }
}