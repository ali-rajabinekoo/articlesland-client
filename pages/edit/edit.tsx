import {APIS, GetArticleResponseDto, UseRequestResult, UseUserInfoResult} from "../../utils/types";
import {DashboardHeader} from "../../container/layout/dashboard";
import EditContainer from "../../container/edit/editContainer";
import Posting from "../../container/edit/posting";
import {NextRouter, useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import useRequest from "../../hooks/useRequest";
import {errorHandler} from "../../utils/helpers";
import {NextPage} from "next";
import useUserInfo from "../../hooks/useUserInfo";
import {AxiosError, AxiosResponse} from "axios";
import {showNotification} from "@mantine/notifications";
import {IconAlertCircle} from "@tabler/icons";

const EditPage: NextPage = (): JSX.Element => {
    const {query}: NextRouter = useRouter()
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const [article, setArticle] = useState<GetArticleResponseDto>()
    const {getApis}: UseRequestResult = useRequest()

    const onUpdateArticle = (updatedArticle: GetArticleResponseDto) => {
        setArticle(updatedArticle)
    }

    const fetchArticle = async () => {
        const apis: APIS = getApis()
        const id = query.id as string
        try {
            const response: AxiosResponse | undefined = await apis.article.getArticle(id as string)
            if (!response) {
                showNotification({
                    message: 'عنوان پست الزامیست',
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
                return null
            } else {
                return setArticle(response.data as GetArticleResponseDto)
            }
        } catch (e: AxiosError | any) {
            if (e instanceof AxiosError && e?.response?.status === 404) {
                window.location.href = '/404'
                return null
            }
            errorHandler(e)
            return null
        }
    }

    useEffect(() => {
        if (!query?.id || !userInfo) return undefined
        fetchArticle().catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, userInfo])

    return (
        <div>
            <DashboardHeader/>
            <div>
                {
                    query?.posting === "true" ? <Posting article={article as GetArticleResponseDto}/> :
                        <EditContainer article={article} onUpdateArticle={!!article ? onUpdateArticle : undefined}/>
                }
            </div>
        </div>
    )
}

export default EditPage
