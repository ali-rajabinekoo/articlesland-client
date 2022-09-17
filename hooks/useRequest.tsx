import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import {Article} from "../utils/apis/article";
import {Category} from "../utils/apis/category";
import {User} from "../utils/apis/user";
import {Draft} from "../utils/apis/draft";
import useUserInfo from "./useUserInfo";
import {APIS, PublicAPIS, UserAndTokenResponse, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(requiredToken?: boolean | undefined): UseRequestResult {
    const {getAccessToken, setNewAccessToken, setNewUser}: UseUserInfoResult = useUserInfo()

    const handleOnRefreshToken = (result: UserAndTokenResponse) => {
        setNewAccessToken(result.token)
        setNewUser(result.user)
    }

    const getApis = (): APIS => {
        return {
            auth: new Authentication(getAccessToken() as string, handleOnRefreshToken, requiredToken),
            category: new Category(getAccessToken() as string, handleOnRefreshToken, requiredToken),
            article: new Article(getAccessToken() as string, handleOnRefreshToken, requiredToken),
            draft: new Draft(getAccessToken() as string, handleOnRefreshToken, requiredToken),
            user: new User(getAccessToken() as string, handleOnRefreshToken, requiredToken),
        }
    }

    return {getApis}
}

export const publicApis = (): PublicAPIS => {
    return {
        auth: new Authentication(),
        category: new Category(),
    }
}
