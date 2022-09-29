import React, {useEffect, useState} from 'react';
import {
    CategoryDto,
    UseFetchSelectedCategoriesResult,
    UserDto,
} from "../utils/types";
import {useAppDispatch, useAppSelector} from "./redux";
import {AppDispatch, RootState} from "../utils/app.store";
import {AxiosError} from "axios";
import {setUserCategories} from "../reducers/userCategories";
import {errorHandler} from "../utils/helpers";
import useUserInfo, {logout} from "./useUserInfo";
import {setUserInfo} from "../reducers/userInfo";

export default function useFetchSelectedCategories(requiredToken?: undefined | boolean): UseFetchSelectedCategoriesResult {
    const userCategories: CategoryDto[] = useAppSelector((state: RootState) => state.userCategories.list)
    const {userInfo} = useUserInfo()
    const dispatch: AppDispatch = useAppDispatch()
    const [categories, setCategories] = useState<CategoryDto[]>([])
    const [error, setError] = useState<AxiosError | null | true>(null)

    const fetchSelectedCategories = async () => {
        try {
            const user: UserDto = userInfo as UserDto
            dispatch(setUserInfo({...user} as UserDto))
            dispatch(setUserCategories(user.selectedCategories as CategoryDto[]))
        } catch (e: AxiosError | any) {
            setError(e as AxiosError)
            if (e instanceof AxiosError && e?.response?.status === 401 && !requiredToken) {
                logout({})
            }
            errorHandler(e)
        }
    }

    useEffect(() => {
        if (!userInfo) return undefined
        if (userCategories.length !== 0) {
            setCategories([...userCategories] as CategoryDto[])
        } else if (!!userInfo?.selectedCategories) {
            setCategories([...userInfo.selectedCategories] as CategoryDto[])
        } else {
            fetchSelectedCategories().catch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return {selectedCategories: categories, error}
}
