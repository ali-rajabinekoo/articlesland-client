import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import {Article} from "../utils/apis/article";
import useUserInfo from "./useUserInfo";
import {APIS, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(): UseRequestResult {
    const {accessToken}: UseUserInfoResult = useUserInfo()

    const getApis = (): APIS | undefined => {
        return {
            auth: new Authentication(accessToken as string),
            article: new Article(accessToken as string),
        }
    }

    return {getApis}
}
