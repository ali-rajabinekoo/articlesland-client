import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import {Article} from "../utils/apis/article";
import {Category} from "../utils/apis/category";
import {User} from "../utils/apis/user";
import {Draft} from "../utils/apis/draft";
import useUserInfo from "./useUserInfo";
import {APIS, PublicAPIS, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(): UseRequestResult {
    const {getAccessToken}: UseUserInfoResult = useUserInfo()

    const getApis = (): APIS => {
        return {
            auth: new Authentication(getAccessToken() as string),
            category: new Category(getAccessToken() as string),
            article: new Article(getAccessToken() as string),
            draft: new Draft(getAccessToken() as string),
            user: new User(getAccessToken() as string),
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
