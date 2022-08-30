import React from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";
import {useLocalStorage} from "@mantine/hooks";

const userKey: string | undefined = process.env.LOCAL_STORAGE_USER
const accessTokenKey: string | undefined = process.env.LOCAL_STORAGE_ACCESS_TOKEN

export default function useUserInfo(): UseUserInfoResult {
    const [userInfo, setUserInfo] = useLocalStorage<UserDto | null>({
        key: process.env.LOCAL_STORAGE_USER as string, serialize: JSON.stringify,
        deserialize: (str) => (str === undefined ? null : JSON.parse(str)),
    });
    const [accessToken, setAccessToken] = useLocalStorage<string>({
        key: process.env.LOCAL_STORAGE_ACCESS_TOKEN as string,
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

    return {
        userInfo,
        accessToken,
        setNewUser,
        setNewAccessToken
    }
}