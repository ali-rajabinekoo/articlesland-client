import React from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";
import {useLocalStorage} from "@mantine/hooks";

const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
const accessTokenKey: string | undefined = process.env.LOCAL_STORAGE_ACCESS_TOKEN

export default function useUserInfo(): UseUserInfoResult {
    const [userInfo, setUserInfo] = useLocalStorage<UserDto | null>({
        key: userKey as string, serialize: JSON.stringify,
        deserialize: (str) => (str === undefined ? null : JSON.parse(str)),
    });
    const [accessToken, setAccessToken] = useLocalStorage<string>({
        key:accessTokenKey as string,
    });

    const setNewUser = (newUser: UserDto | null): void => {
        if (!!newUser && !!userKey) {
            setUserInfo(newUser)
        }
    }

    const setNewAccessToken = (newAccessToken: string | null): void => {
        if (!!newAccessToken && !!accessTokenKey) {
            setAccessToken(newAccessToken);
        }
    }

    const getAccessToken = () => {
        return window.localStorage.getItem(accessTokenKey as string)
    }
    
    return {
        userInfo,
        accessToken,
        setNewUser,
        setNewAccessToken,
        getAccessToken,
    }
}