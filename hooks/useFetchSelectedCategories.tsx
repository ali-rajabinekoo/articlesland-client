import React, {useEffect, useState} from 'react';
import {
    APIS,
    CategoryDto,
    UseFetchSelectedCategoriesResult,
    UserDto,
    UseRequestResult,
} from "../utils/types";
import {useAppDispatch, useAppSelector} from "./redux";
import {AppDispatch, RootState} from "../utils/app.store";
import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle} from "@tabler/icons";
import {setUserCategories} from "../reducers/userCategories";
import {errorHandler} from "../utils/helpers";
import useRequest from "./useRequest";
import {logout} from "./useUserInfo";

export default function useFetchSelectedCategories(requiredToken?: undefined | boolean): UseFetchSelectedCategoriesResult {
    const userCategories: CategoryDto[] = useAppSelector((state: RootState) => state.userCategories.list)
    const dispatch: AppDispatch = useAppDispatch()
    const {getApis}: UseRequestResult = useRequest(requiredToken)
    const [categories, setCategories] = useState<CategoryDto[]>([])
    const [error, setError] = useState<AxiosError | null | true>(null)

    const fetchSelectedCategories = async () => {
        const apis: APIS = getApis()
        try {
            const response: AxiosResponse | undefined = await apis.user.userInfo()
            if (!response) {
                setError(true)
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            } else {
                const user: UserDto = response.data as UserDto
                dispatch(setUserCategories(user.selectedCategories as CategoryDto[]))
            }
        } catch (e: AxiosError | any) {
            setError(e as AxiosError)
            if (e instanceof AxiosError && e?.response?.status === 401 && !requiredToken) {
                logout()
            }
            errorHandler(e)
        }
    }

    useEffect(() => {
        if (userCategories.length !== 0) {
            setCategories([...userCategories] as CategoryDto[])
        } else {
            fetchSelectedCategories().catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCategories])

    return {selectedCategories: categories, error}
}
