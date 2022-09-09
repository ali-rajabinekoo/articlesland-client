import React, {useEffect, useState} from 'react';
import {CategoryDto} from "../utils/types";
import {fetchCategories} from "../utils/initStore";
import {AppDispatch, RootState} from "../utils/app.store";
import {useAppDispatch, useAppSelector} from "./redux";
import {setCategories} from "../reducers/categories";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

class useFetchReduxInitStatesProps {
    children?: JSX.Element | React.ReactNode | undefined
}

export default function FetchReduxInitStates({children}: useFetchReduxInitStatesProps) {
    const categories = useAppSelector((state: RootState) => state.categories.list)
    const dispatch: AppDispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
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
    }, [])

    return <>{children}</>
}
