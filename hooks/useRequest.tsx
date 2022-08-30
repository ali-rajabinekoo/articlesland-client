import React from 'react';
import {Authentication} from "../utils/apis/authentication";
import useUserInfo from "./useUserInfo";
import {APIS, UseRequestResult, UseUserInfoResult} from "../utils/types";

export default function useRequest(): UseRequestResult {
    const {accessToken}: UseUserInfoResult = useUserInfo()

    const getApis = (): APIS | undefined => {
        return {
            auth: new Authentication(accessToken as string)
        }
    }

    return {getApis}
}
