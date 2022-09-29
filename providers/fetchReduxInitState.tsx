import React, {useEffect, useState} from 'react';
import {CategoryDto, UserDto} from "../utils/types";
import {fetchCategories, fetchUserInfo} from "../utils/initStore";
import {AppDispatch, RootState} from "../utils/app.store";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setCategories} from "../reducers/categories";
import {setUserInfo} from "../reducers/userInfo";
import useUserInfo from "../hooks/useUserInfo";
import useSWR from 'swr'
import useRequest from "../hooks/useRequest";
import {fetcher} from "../utils/axios";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

class useFetchReduxInitStatesProps {
    children?: JSX.Element | React.ReactNode | undefined
}

export default function FetchReduxInitStates({children}: useFetchReduxInitStatesProps) {
    const {getApis} = useRequest(false)
    const {mainUserInfo} = useUserInfo()
    const categories = useAppSelector((state: RootState) => state.categories.list)
    const userInfo: UserDto | null = useAppSelector((state: RootState) => state.userInfo.data)
    const { data, error } = useSWR('/category', fetcher)
    const dispatch: AppDispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [userLoaded, setUserLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (loading || loaded) return undefined
        if (categories.length !== 0) return undefined
        setLoading(true)
        if (!!data) {
            dispatch(setCategories(data))
            setLoaded(true)
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (!error) return undefined;
        if (loading || loaded) return undefined
        if (categories.length !== 0) return undefined
        setLoading(true)
        fetchCategories().then((values: CategoryDto[]) => {
            dispatch(setCategories(values))
            setLoaded(true)
        }).catch((e) => {
            console.log(e)
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    useEffect(() => {
        if (userLoaded || !!userInfo) return undefined
        if (!!mainUserInfo) {
            fetchUserInfo(getApis()).then((values: UserDto | null) => {
                if (!values) return null
                dispatch(setUserInfo({...values}))
                setUserLoaded(true)
            }).catch((e) => {
                console.log(e)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainUserInfo])

    return <>{children}</>
}
