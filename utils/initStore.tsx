import {APIS, CategoryDto, PublicAPIS, UserDto} from "./types";
import {publicApis} from "../hooks/useRequest";
import {AxiosError, AxiosResponse} from "axios";
import React from "react";

export const fetchCategories = async () => {
    const {category}: PublicAPIS = publicApis()
    const response: AxiosResponse | undefined = await category.getCategories()
    return response?.data as CategoryDto[]
}

export const fetchUserInfo = async (apis: APIS): Promise<UserDto | null> => {
    try {
        const response: AxiosResponse | undefined = await apis.user.userInfo()
        if (!!response?.data) {
            return response.data as UserDto
        }
        return null
    } catch (e: AxiosError | any) {
        return null
    }
}
