import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import {Article} from "../utils/apis/article";
import {Category} from "../utils/apis/category";
import {User} from "../utils/apis/user";
import {Draft} from "../utils/apis/draft";
import useUserInfo from "./useUserInfo";
import {APIS, PublicAPIS, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(requiredToken?: boolean | undefined): UseRequestResult {
    const {getAccessToken}: UseUserInfoResult = useUserInfo()

    const getApis = (): APIS => {
        return {
            auth: new Authentication(getAccessToken() as string, requiredToken),
            category: new Category(getAccessToken() as string, requiredToken),
            article: new Article(getAccessToken() as string, requiredToken),
            draft: new Draft(getAccessToken() as string, requiredToken),
            user: new User(getAccessToken() as string, requiredToken),
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
