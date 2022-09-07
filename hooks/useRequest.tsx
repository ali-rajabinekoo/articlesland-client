import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import {Article} from "../utils/apis/article";
import {Category} from "../utils/apis/category";
import useUserInfo from "./useUserInfo";
import {APIS, PublicAPIS, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(): UseRequestResult {
    const {accessToken}: UseUserInfoResult = useUserInfo()

    const getApis = (): APIS => {
        return {
            auth: new Authentication(accessToken as string),
            article: new Article(accessToken as string),
            category: new Category(accessToken as string),
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
