import React, {useEffect, useState} from 'react';
import {UserDto, UseUserInfoResult} from "../utils/types";
import userStorage from "../utils/userStorage";

export default function useUserInfo(): UseUserInfoResult {
    const [userInfo, setUserInfo] = useState<UserDto | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');

    useEffect(() => {
        if (!userInfo) setUserInfo(userStorage.getUserInfo())
        if (!accessToken) setAccessToken(userStorage.getAccessToken())
        if (!refreshToken) setRefreshToken(userStorage.getRefreshToken())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        userInfo,
        accessToken,
        refreshToken,
    }
}
